#!/usr/bin/env python3
"""Check a decision report before opening it. Python 3.9+ standard library only.

  preflight.py REPORT.html

Exit 1 with a list of errors when the report would open broken; warnings do not fail.
"""

from __future__ import annotations

import base64
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'}
REF_LABEL = 'AI 생성 참고 이미지'
MAX_FILE_KB = 1500
MAX_WIDTH = 2400
LONG_TEXT = 160  # characters in one paragraph or list item before it reads as prose
FIGURES = ('shot', 'vopt', 'dfig', 'sumfig')


def sniff(payload: bytes) -> bool:
    return (payload.startswith(b'\x89PNG\r\n\x1a\n') or payload.startswith(b'\xff\xd8\xff')
            or (payload[:4] == b'RIFF' and payload[8:12] == b'WEBP') or payload[:6] in (b'GIF87a', b'GIF89a')
            or is_svg(payload))


def is_svg(payload: bytes) -> bool:
    head = payload[:512].lstrip()
    return head.startswith(b'<svg') or (head.startswith(b'<?xml') and b'<svg' in head)


def png_width(payload: bytes) -> int | None:
    return int.from_bytes(payload[16:20], 'big') if payload.startswith(b'\x89PNG') else None


class Report(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack: list[tuple[str, set[str]]] = []
        self.cards: list[dict] = []
        self.imgs: list[dict] = []
        self.refs: list[dict] = []
        self.viz = 0
        self.long_text: list[str] = []
        self._text: list[str] | None = None
        self.meta: dict[str, str] = {}
        self.title = ''
        self._in_title = False

    def _inside(self, cls: str) -> bool:
        return any(cls in classes for _, classes in self.stack)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        classes = set((a.get('class') or '').split())
        if tag == 'meta' and a.get('name'):
            self.meta[a['name']] = a.get('content') or ''
        if tag == 'title':
            self._in_title = True
        if 'dcard' in classes:
            self.cards.append({'q': a.get('data-q') or '', 'rank': a.get('data-rank') == '1',
                               'opts': 0, 'rankitems': 0, 'rec': 0, 'empty_v': 0, 'visual': False})
        if self.cards and self._inside('dcard'):
            card = self.cards[-1]
            if 'opt' in classes:
                card['opts'] += 1
                if not (a.get('data-v') or '').strip():
                    card['empty_v'] += 1
            if 'rankitem' in classes:
                card['rankitems'] += 1
            if 'rec' in classes:
                card['rec'] += 1
            if tag in ('img', 'svg') or 'viz' in classes or 'flow' in classes:
                card['visual'] = True
        if 'viz' in classes:
            self.viz += 1
        if 'shot' in classes and 'ref' in classes:
            self.refs.append({'text': ''})
        if tag == 'img' and not self._inside('lightbox'):
            self.imgs.append({'src': (a.get('src') or '').strip(), 'alt': (a.get('alt') or '').strip(),
                              'shot': self._inside('shot'),
                              'figure': any(self._inside(f) for f in FIGURES) or bool(classes & set(FIGURES))})
        if tag in ('p', 'li') and self._text is None and not self._inside('fallback'):
            self._text = []
        if tag not in VOID:
            self.stack.append((tag, classes))

    def handle_endtag(self, tag):
        if tag == 'title':
            self._in_title = False
        if tag in ('p', 'li') and self._text is not None and self.stack and self.stack[-1][0] == tag:
            text = ' '.join(''.join(self._text).split())
            if len(text) > LONG_TEXT:
                self.long_text.append(text)
            self._text = None
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                del self.stack[i:]
                break

    def handle_data(self, data):
        if self._in_title:
            self.title += data
        if self._text is not None:
            self._text.append(data)
        if self.refs and any('ref' in c and 'shot' in c for _, c in self.stack):
            self.refs[-1]['text'] += data


def main() -> int:
    if len(sys.argv) != 2:
        print(__doc__.strip(), file=sys.stderr)
        return 2
    path = Path(sys.argv[1]).resolve()
    root = path.parent
    html = path.read_text(encoding='utf-8')
    errors: list[str] = []
    warnings: list[str] = []

    todos = re.findall(r'<!--[^>]*?TODO', html)
    if todos:
        errors.append(f'{len(todos)} TODO comment(s) left')
    report = Report()
    report.feed(html)

    if not report.title.strip() or '프로젝트명' in report.title:
        errors.append('title not replaced')
    if not report.meta.get('report-id') or 'YYYY' in report.meta.get('report-id', ''):
        errors.append('report-id not replaced')
    if not re.match(r'\d{4}-\d{2}-\d{2}T', report.meta.get('generated-at', '')):
        errors.append('generated-at not replaced')

    if not report.cards:
        errors.append('no decision cards (.dcard)')
    for n, card in enumerate(report.cards, 1):
        name = card['q'] or f'card {n}'
        if card['rank']:
            if card['rankitems'] < 2:
                errors.append(f'{name}: ranking card needs at least 2 .rankitem')
        elif card['opts'] < 1:
            errors.append(f'{name}: no .opt option')
        if card['empty_v']:
            errors.append(f'{name}: option without data-v')
    if report.cards and not any(c['rec'] for c in report.cards):
        warnings.append('no recommendation (.rec) on any card')
    for n, card in enumerate(report.cards, 1):
        if not card['visual']:
            warnings.append(f'{card["q"] or f"card {n}"}: no picture in the card; put the summary image or '
                            'image options the decision depends on inside it (.dfig / .opts.vis)')
    for text in report.long_text:
        warnings.append(f'{len(text)}-character paragraph reads as prose; turn it into a summary image, '
                        f'chips or a short list: "{text[:40]}…"')

    shot_imgs = [i for i in report.imgs if i['shot']]
    figure_imgs = [i for i in report.imgs if i['figure']]
    if not report.viz and not figure_imgs:
        errors.append('no visual evidence (.viz, .sumfig/.dfig summary image, or .shot capture)')
    elif not shot_imgs:
        warnings.append('no real capture (.shot img); if the report concerns screens or devices, '
                        'add captures or state in a .note why none exist')
    for img in report.imgs:
        src, label = img['src'], img['src'][:60] or '(empty)'
        if not src:
            errors.append('img with empty src')
            continue
        if not img['alt']:
            errors.append(f'img without alt: {label}')
        if src.startswith('file:'):
            errors.append(f'file:// src is blocked when the report is served over HTTP: {label}')
            continue
        if src.startswith('data:'):
            try:
                payload = base64.b64decode(src.split(',', 1)[1])
            except (IndexError, ValueError):
                errors.append(f'broken data URI: {label}')
                continue
            if not sniff(payload):
                errors.append(f'data URI is not a raster image: {label}')
            elif len(payload) // 1024 > MAX_FILE_KB:
                warnings.append(f'data URI image is {len(payload) // 1024}KB; downscale with report_assets.py add')
            continue
        if re.match(r'^(https?:)?//', src):
            warnings.append(f'remote image may expire or need login: {label}')
            continue
        target = (root / src).resolve()
        if not target.is_relative_to(root):
            errors.append(f'image outside the report folder: {label}')
        elif not target.is_file() or target.stat().st_size == 0:
            errors.append(f'missing or empty image file: {label}')
        else:
            payload = target.read_bytes()
            if not sniff(payload):
                errors.append(f'not a raster image: {label}')
            else:
                if len(payload) // 1024 > MAX_FILE_KB:
                    warnings.append(f'{src} is {len(payload) // 1024}KB; downscale with report_assets.py add')
                width = png_width(payload)
                if width and width > MAX_WIDTH:
                    warnings.append(f'{src} is {width}px wide; downscale with report_assets.py add')
    for n, ref in enumerate(report.refs, 1):
        if REF_LABEL not in ref['text']:
            errors.append(f'AI reference figure {n} lacks the "{REF_LABEL}" label')

    for w in warnings:
        print(f'warning: {w}')
    for e in errors:
        print(f'ERROR: {e}')
    cards = len(report.cards)
    print(f'{"FAIL" if errors else "OK"}: {cards} card(s), {len(report.imgs)} image(s), '
          f'{len(report.refs)} AI reference(s), {report.viz} viz, {len(errors)} error(s), {len(warnings)} warning(s)')
    return 1 if errors else 0


if __name__ == '__main__':
    sys.exit(main())
