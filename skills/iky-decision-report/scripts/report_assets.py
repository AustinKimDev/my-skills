#!/usr/bin/env python3
"""Prepare images for a decision report. Python 3.9+ standard library only.

  decode RESULT.json OUT.png    Save the base64 image inside a browser/tool JSON result ("-" = stdin).
  add REPORT_DIR IMAGE [--name N] [--max-width 1600]
                                Copy a raster image into REPORT_DIR/assets/, downscale wide images with
                                macOS `sips` when it exists, and print the relative src to use.
  inline REPORT.html [--out F]  Write a single-file copy with local assets/ images as data URIs.
"""

from __future__ import annotations

import argparse
import base64
import json
import re
import shutil
import struct
import subprocess
import sys
from pathlib import Path

MIMES = {'png': 'image/png', 'jpeg': 'image/jpeg', 'webp': 'image/webp', 'gif': 'image/gif', 'svg': 'image/svg+xml'}
EXTS = {'png': '.png', 'jpeg': '.jpg', 'webp': '.webp', 'gif': '.gif', 'svg': '.svg'}
B64_KEYS = ('data', 'base64', 'screenshot', 'image', 'png', 'content')


def sniff(payload: bytes) -> str | None:
    if payload.startswith(b'\x89PNG\r\n\x1a\n'):
        return 'png'
    if payload.startswith(b'\xff\xd8\xff'):
        return 'jpeg'
    if payload[:4] == b'RIFF' and payload[8:12] == b'WEBP':
        return 'webp'
    if payload[:6] in (b'GIF87a', b'GIF89a'):
        return 'gif'
    head = payload[:512].lstrip()
    if head.startswith(b'<svg') or (head.startswith(b'<?xml') and b'<svg' in head):
        return 'svg'  # summary images from summary_image.py
    return None


def dimensions(payload: bytes) -> tuple[int, int] | None:
    kind = sniff(payload)
    if kind == 'png' and len(payload) >= 24:
        return struct.unpack('>II', payload[16:24])
    if kind == 'svg':
        m = re.search(rb'<svg[^>]*?\swidth="(\d+)"[^>]*?\sheight="(\d+)"', payload[:2048])
        return (int(m.group(1)), int(m.group(2))) if m else None
    if kind == 'gif' and len(payload) >= 10:
        return struct.unpack('<HH', payload[6:10])
    if kind == 'jpeg':
        i = 2
        while i + 9 < len(payload):
            if payload[i] != 0xFF:
                i += 1
                continue
            marker = payload[i + 1]
            if marker in (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF):
                h, w = struct.unpack('>HH', payload[i + 5:i + 9])
                return w, h
            if marker in (0xD8, 0x01) or 0xD0 <= marker <= 0xD7:
                i += 2
                continue
            i += 2 + struct.unpack('>H', payload[i + 2:i + 4])[0]
    return None


def find_base64(node):
    """First string in the JSON tree that decodes to a known raster image."""
    if isinstance(node, dict):
        ordered = [node[k] for k in B64_KEYS if k in node] + [v for k, v in node.items() if k not in B64_KEYS]
        for value in ordered:
            found = find_base64(value)
            if found:
                return found
    elif isinstance(node, list):
        for value in node:
            found = find_base64(value)
            if found:
                return found
    elif isinstance(node, str) and len(node) > 64:
        text = node.split(',', 1)[1] if node.startswith('data:') else node
        try:
            payload = base64.b64decode(text, validate=True)
        except ValueError:
            return None
        if sniff(payload):
            return payload
    return None


def cmd_decode(args) -> int:
    raw = sys.stdin.read() if args.result == '-' else Path(args.result).read_text(encoding='utf-8')
    payload = find_base64(json.loads(raw))
    if not payload:
        print('No base64 raster image found in the JSON result.', file=sys.stderr)
        return 1
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_bytes(payload)
    size = dimensions(payload)
    print(f'{out}  {sniff(payload)}  {size[0]}x{size[1]}' if size else str(out))
    return 0


def cmd_add(args) -> int:
    report_dir = Path(args.report_dir).resolve()
    source = Path(args.image).resolve()
    payload = source.read_bytes()
    kind = sniff(payload)
    if not kind:
        print(f'Not a supported image (png/jpeg/webp/gif/svg): {source.name}', file=sys.stderr)
        return 1
    assets = report_dir / 'assets'
    assets.mkdir(parents=True, exist_ok=True)
    stem = re.sub(r'[^A-Za-z0-9._-]+', '-', Path(args.name or source.stem).stem).strip('-') or 'image'
    target = assets / f'{stem}{EXTS[kind]}'
    n = 2
    while target.exists() and target.read_bytes() != payload:
        target = assets / f'{stem}-{n}{EXTS[kind]}'
        n += 1
    if source != target:
        shutil.copyfile(source, target)
    size = dimensions(payload)
    if size and size[0] > args.max_width and kind != 'svg':
        if shutil.which('sips'):
            subprocess.run(['sips', '--resampleWidth', str(args.max_width), str(target)],
                           check=True, stdout=subprocess.DEVNULL)
            size = dimensions(target.read_bytes())
        else:
            print(f'warning: {size[0]}px wide; no sips available, kept original size', file=sys.stderr)
    shape = ''
    if size:
        shape = '  phone/portrait -> use .shots.phones' if size[1] > size[0] * 1.5 else ''
        size = f'{size[0]}x{size[1]}'
    kb = target.stat().st_size // 1024
    print(f'src="assets/{target.name}"  {size or "?"}  {kb}KB{shape}')
    return 0


def cmd_inline(args) -> int:
    html_path = Path(args.report).resolve()
    root = html_path.parent
    html = html_path.read_text(encoding='utf-8')
    cache: dict[Path, str] = {}

    def replace(match: re.Match) -> str:
        quote, src = match.group(1), match.group(2)
        if re.match(r'^(data:|https?:|//)', src):
            return match.group(0)
        target = (root / src).resolve()
        if not target.is_relative_to(root) or not target.is_file():
            raise SystemExit(f'Missing or out-of-folder image: {src}')
        if target not in cache:
            payload = target.read_bytes()
            kind = sniff(payload)
            if not kind:
                raise SystemExit(f'Not a supported image: {src}')
            cache[target] = f'data:{MIMES[kind]};base64,' + base64.b64encode(payload).decode('ascii')
        return f'src={quote}{cache[target]}{quote}'

    result = re.sub(r'src=(["\'])((?!data:)[^"\']+)\1', replace, html)
    out = Path(args.out) if args.out else root / f'{html_path.stem}-single.html'
    out.write_text(result, encoding='utf-8')
    print(f'{out}  {len(cache)} image(s) inlined  {out.stat().st_size // 1024}KB')
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest='command', required=True)
    p = sub.add_parser('decode')
    p.add_argument('result')
    p.add_argument('out')
    p.set_defaults(func=cmd_decode)
    p = sub.add_parser('add')
    p.add_argument('report_dir')
    p.add_argument('image')
    p.add_argument('--name')
    p.add_argument('--max-width', type=int, default=1600)
    p.set_defaults(func=cmd_add)
    p = sub.add_parser('inline')
    p.add_argument('report')
    p.add_argument('--out')
    p.set_defaults(func=cmd_inline)
    args = parser.parse_args()
    return args.func(args)


if __name__ == '__main__':
    sys.exit(main())
