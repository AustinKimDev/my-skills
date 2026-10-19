#!/usr/bin/env python3
"""Draw a summary image (SVG) from a JSON spec. Python 3.9+ standard library only.

  summary_image.py SPEC.json OUT.svg        (SPEC "-" reads stdin)

Use it to turn status, mechanisms and options into one picture instead of prose.
The spec is a title plus blocks stacked top to bottom:

  {"title": "STAGE 저장소 — 지금 vs 바꾼 뒤", "width": 1200,
   "blocks": [
     {"type": "tiles", "columns": 4, "items": [
        {"label": "완료", "title": "사용권", "sub": "판매기간·한도", "state": "done"}]},
     {"type": "stats", "items": [{"value": "23/23", "label": "테스트 통과", "state": "done"}]},
     {"type": "steps", "heading": "실행 순서", "items": [{"title": "버킷 생성", "sub": "서울·비공개"}],
      "highlight": 4},
     {"type": "columns", "items": [{"title": "지금", "state": "part", "lines": ["MinIO", "197MB"]}]},
     {"type": "chips", "heading": "공통", "items": ["순서·기간 지정", "상품 연결"], "state": "need"},
     {"type": "band", "state": "no", "label": "건드리지 않음", "text": "운영 버킷 · 운영 키"},
     {"type": "text", "text": "한 줄 설명", "state": "dim"}]}

States: done (green), part (amber), need (blue), no (red), wait (gray), plain.
Text is never wrapped mid-word by the renderer, so this script wraps by estimated
width; keep labels short. Check the result in the browser before using it.
"""

from __future__ import annotations

import html
import json
import sys
from pathlib import Path

FONT = "'Apple SD Gothic Neo','Pretendard','Noto Sans KR','Malgun Gothic',sans-serif"
INK, DIM, FAINT, HAIR, ELEV, CARD = '#16181d', '#5f6670', '#9aa1ab', '#dfe2e7', '#f3f4f6', '#ffffff'
STATES = {  # state -> (foreground, soft background, border)
    'done': ('#15803d', '#e7f5ec', '#15803d'),
    'part': ('#b45309', '#fdf2e2', '#b45309'),
    'need': ('#1d4ed8', '#e8effd', '#1d4ed8'),
    'no': ('#b91c1c', '#fdecec', '#b91c1c'),
    'wait': (DIM, ELEV, HAIR),
    'plain': (INK, CARD, HAIR),
    'dim': (DIM, CARD, HAIR),
}
PAD = 40


def text_width(s: str, size: float) -> float:
    return sum(size * (0.93 if ord(ch) > 0x2E80 else 0.58 if ch != ' ' else 0.3) for ch in s)


def wrap(s: str, size: float, width: float) -> list[str]:
    words, lines, cur = s.split(' '), [], ''
    for w in words:
        trial = f'{cur} {w}'.strip()
        if cur and text_width(trial, size) > width:
            lines.append(cur)
            cur = w
        else:
            cur = trial
    if cur:
        lines.append(cur)
    return lines or ['']


def state(name: str | None) -> tuple[str, str, str]:
    return STATES.get(name or 'plain', STATES['plain'])


class Canvas:
    def __init__(self, width: int):
        self.w = width
        self.y = PAD
        self.parts: list[str] = []

    def rect(self, x, y, w, h, fill, stroke, r=14, sw=1.5, dash=False):
        d = ' stroke-dasharray="6 5"' if dash else ''
        self.parts.append(f'<rect x="{x:.0f}" y="{y:.0f}" width="{w:.0f}" height="{h:.0f}" rx="{r}" '
                          f'fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{d}/>')

    def text(self, x, y, s, size=16, color=INK, weight=400, anchor='start'):
        self.parts.append(f'<text x="{x:.0f}" y="{y:.0f}" font-size="{size}" fill="{color}" '
                          f'font-weight="{weight}" text-anchor="{anchor}">{html.escape(s)}</text>')

    def para(self, x, y, s, size, width, color=DIM, weight=400, gap=1.5) -> float:
        lines = wrap(s, size, width)
        for i, line in enumerate(lines):
            self.text(x, y + i * size * gap, line, size, color, weight)
        return len(lines) * size * gap

    def pill(self, x, y, s, st, size=14) -> float:
        fg, bg, _ = state(st)
        w = text_width(s, size) + 28
        self.rect(x, y, w, size + 16, bg, bg, r=(size + 16) / 2, sw=0)
        self.text(x + w / 2, y + size + 4, s, size, fg, 700, 'middle')
        return w

    def arrow(self, x1, y, x2):
        self.parts.append(f'<line x1="{x1:.0f}" y1="{y:.0f}" x2="{x2:.0f}" y2="{y:.0f}" stroke="{FAINT}" '
                          f'stroke-width="2.5" marker-end="url(#ah)"/>')

    def heading(self, s: str | None):
        if s:
            self.text(PAD, self.y + 20, s, 20, INK, 800)
            self.y += 40


def block_tiles(c: Canvas, b: dict):
    items, cols = b['items'], b.get('columns') or min(4, len(b['items']))
    gap, inner = 20, c.w - 2 * PAD
    tw = (inner - gap * (cols - 1)) / cols
    c.heading(b.get('heading'))
    rows = [items[i:i + cols] for i in range(0, len(items), cols)]
    for row in rows:
        heights = []
        for it in row:
            h = 66 + 30 * len(wrap(it.get('title', ''), 22, tw - 40)) + 24 * len(wrap(it.get('sub', ''), 15, tw - 40))
            heights.append(h)
        th = max(heights) + 16
        for i, it in enumerate(row):
            x = PAD + i * (tw + gap)
            fg, bg, border = state(it.get('state'))
            c.rect(x, c.y, tw, th, CARD, border, sw=2)
            ty = c.y + 20
            if it.get('label'):
                c.pill(x + 20, ty, it['label'], it.get('state'))
            ty += 64
            ty += c.para(x + 20, ty, it.get('title', ''), 22, tw - 40, INK, 800, 1.35)
            c.para(x + 20, ty + 4, it.get('sub', ''), 15, tw - 40)
        c.y += th + gap
    c.y += 4


def block_stats(c: Canvas, b: dict):
    items, gap = b['items'], 20
    c.heading(b.get('heading'))
    tw = (c.w - 2 * PAD - gap * (len(items) - 1)) / len(items)
    for i, it in enumerate(items):
        x = PAD + i * (tw + gap)
        fg, bg, _ = state(it.get('state'))
        c.rect(x, c.y, tw, 110, bg if it.get('state') else ELEV, bg if it.get('state') else ELEV, sw=0)
        c.text(x + 22, c.y + 58, str(it['value']), 34, fg if it.get('state') else INK, 800)
        c.text(x + 22, c.y + 90, it.get('label', ''), 15, DIM)
    c.y += 134


def block_steps(c: Canvas, b: dict):
    items, gap = b['items'], 34
    hi = b.get('highlight')
    c.heading(b.get('heading'))
    tw = (c.w - 2 * PAD - gap * (len(items) - 1)) / len(items)
    th = 70 + max(24 * len(wrap(it.get('sub', ''), 15, tw - 36)) for it in items)
    for i, it in enumerate(items):
        x = PAD + i * (tw + gap)
        fg, bg, border = state(it.get('state'))
        strong = i == hi
        c.rect(x, c.y, tw, th, bg if it.get('state') else CARD, INK if strong else border, sw=2.5 if strong else 2)
        c.parts.append(f'<circle cx="{x + 32:.0f}" cy="{c.y + 32:.0f}" r="14" fill="{fg if it.get("state") else INK}"/>')
        c.text(x + 32, c.y + 38, str(i + 1), 15, '#ffffff', 700, 'middle')
        c.text(x + 56, c.y + 39, it.get('title', ''), 18, INK, 800)
        c.para(x + 18, c.y + 80, it.get('sub', ''), 15, tw - 36)
        if i < len(items) - 1:
            c.arrow(x + tw + 4, c.y + th / 2, x + tw + gap - 4)
    c.y += th + 28


def block_columns(c: Canvas, b: dict):
    items, gap = b['items'], 24
    c.heading(b.get('heading'))
    tw = (c.w - 2 * PAD - gap * (len(items) - 1)) / len(items)
    th = 70 + max(sum(24 * len(wrap(ln, 16, tw - 44)) for ln in it.get('lines', [])) for it in items)
    for i, it in enumerate(items):
        x = PAD + i * (tw + gap)
        fg, bg, border = state(it.get('state'))
        c.rect(x, c.y, tw, th, bg, border, sw=2, dash=bool(it.get('dashed')))
        c.text(x + 22, c.y + 40, it.get('title', ''), 19, fg if it.get('state') else INK, 800)
        ty = c.y + 74
        for ln in it.get('lines', []):
            ty += c.para(x + 22, ty, ln, 16, tw - 44, DIM, 400, 1.5)
        if b.get('arrows') and i < len(items) - 1:
            c.arrow(x + tw + 2, c.y + th / 2, x + tw + gap - 2)
    c.y += th + 28


def block_chips(c: Canvas, b: dict):
    x, size = PAD, 15
    if b.get('heading'):
        c.text(PAD, c.y + 25, b['heading'], 17, INK, 800)
        x = PAD + text_width(b['heading'], 17) + 20
    start = x
    for s in b['items']:
        w = text_width(s, size) + 36
        if x + w > c.w - PAD and x > start:
            x, c.y = start, c.y + 50
        fg, bg, _ = state(b.get('state') or 'wait')
        c.rect(x, c.y, w, 38, bg, bg, r=19, sw=0)
        c.text(x + w / 2, c.y + 25, s, size, fg if b.get('state') else INK, 600, 'middle')
        x += w + 12
    c.y += 62


def block_band(c: Canvas, b: dict):
    fg, bg, _ = state(b.get('state') or 'no')
    lines = wrap(b.get('text', ''), 19, c.w - 2 * PAD - 48)
    h = 66 + 30 * len(lines)
    c.rect(PAD, c.y, c.w - 2 * PAD, h, bg, bg, r=16, sw=0)
    if b.get('label'):
        c.pill(PAD + 24, c.y + 18, b['label'], b.get('state') or 'no')
    for i, ln in enumerate(lines):
        c.text(PAD + 24, c.y + 78 + i * 30, ln, 19, fg, 700)
    c.y += h + 24


def block_text(c: Canvas, b: dict):
    fg = state(b.get('state') or 'dim')[0]
    c.y += c.para(PAD, c.y + 16, b['text'], b.get('size', 16), c.w - 2 * PAD, fg, b.get('weight', 400)) + 12


BLOCKS = {'tiles': block_tiles, 'stats': block_stats, 'steps': block_steps, 'columns': block_columns,
          'chips': block_chips, 'band': block_band, 'text': block_text}


def render(spec: dict) -> str:
    c = Canvas(int(spec.get('width', 1200)))
    if spec.get('title'):
        c.text(PAD, c.y + 22, spec['title'], 28, INK, 800)
        c.y += 62
    for b in spec.get('blocks', []):
        if b.get('type') not in BLOCKS:
            raise SystemExit(f'unknown block type: {b.get("type")} (use {", ".join(BLOCKS)})')
        BLOCKS[b['type']](c, b)
    h = int(c.y + PAD - 20)
    title = html.escape(spec.get('title') or 'summary')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {c.w} {h}" width="{c.w}" height="{h}" '
            f'role="img" style="font-family:{FONT}">\n<title>{title}</title>\n'
            f'<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" '
            f'orient="auto"><path d="M0 0L10 5L0 10z" fill="{FAINT}"/></marker></defs>\n'
            f'<rect width="{c.w}" height="{h}" fill="#ffffff"/>\n' + '\n'.join(c.parts) + '\n</svg>\n')


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__.strip(), file=sys.stderr)
        return 2
    raw = sys.stdin.read() if sys.argv[1] == '-' else Path(sys.argv[1]).read_text(encoding='utf-8')
    out = Path(sys.argv[2])
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(render(json.loads(raw)), encoding='utf-8')
    print(f'{out}  {out.stat().st_size // 1024}KB  -> report_assets.py add, then <figure class="dfig"> or "sumfig"')
    return 0


if __name__ == '__main__':
    sys.exit(main())
