#!/usr/bin/env python3
"""Render the documented Markdown subset into an offline planning document."""
import argparse
import html
import json
import re
from pathlib import Path
from urllib.parse import urlsplit


def esc(value):
    return html.escape(str(value), quote=True)


def safe_url(value):
    if re.search(r'[\x00-\x20]', value):
        raise ValueError('URL whitespace/control characters must be percent encoded')
    if urlsplit(value).scheme.lower() not in ('', 'http', 'https', 'mailto'):
        raise ValueError('Unsupported URL scheme: ' + value)
    return esc(value)


def inline(text):
    tokens = []

    def keep(markup):
        tokens.append(markup)
        return '\x00' + str(len(tokens) - 1) + '\x00'

    text = re.sub(r'`([^`]+)`', lambda m: keep('<code>' + esc(m[1]) + '</code>'), text)
    text = re.sub(r'\[([^\]]+)\]\((<?[^)]+>?)\)',
                  lambda m: keep('<a href="' + safe_url(m[2].strip('<>')) + '">' + esc(m[1]) + '</a>'), text)
    text = esc(text)
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'<em>\1</em>', text)
    return re.sub(r'\x00(\d+)\x00', lambda m: tokens[int(m[1])], text)


def blocks(lines):
    out, i = [], 0
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1
            continue
        if line.startswith('```'):
            code = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith('```'):
                code.append(lines[i]); i += 1
            if i == len(lines):
                raise ValueError('Unclosed code fence')
            out.append('<pre tabindex="0"><code>' + esc('\n'.join(code)) + '</code></pre>')
        elif line.startswith('|'):
            rows = []
            while i < len(lines) and lines[i].strip().startswith('|'):
                rows.append([c.strip() for c in lines[i].strip().strip('|').split('|')]); i += 1
            if len(rows) < 2 or not all(re.fullmatch(r':?-{3,}:?', c) for c in rows[1]):
                raise ValueError('Table needs a Markdown separator row')
            if any(len(row) != len(rows[0]) for row in rows):
                raise ValueError('Table column count mismatch')
            label = ' · '.join(rows[0])
            table = '<div class="table-wrap" tabindex="0" role="region" aria-label="' + esc(label) + '"><table><thead><tr>'
            table += ''.join('<th scope="col">' + inline(c) + '</th>' for c in rows[0]) + '</tr></thead><tbody>'
            table += ''.join('<tr>' + ''.join('<td>' + inline(c) + '</td>' for c in row) + '</tr>' for row in rows[2:])
            out.append(table + '</tbody></table></div>'); continue
        elif re.match(r'^([-*] |\d+\. )', line):
            numbered = bool(re.match(r'\d+\. ', line))
            tag, pattern = ('ol', r'^\d+\. ') if numbered else ('ul', r'^[-*] ')
            items = []
            while i < len(lines) and re.match(pattern, lines[i].strip()):
                value = re.sub(pattern, '', lines[i].strip())
                value = re.sub(r'^\[ \] ', '□ ', value)
                value = re.sub(r'^\[[xX]\] ', '✓ ', value)
                items.append('<li>' + inline(value) + '</li>'); i += 1
            out.append('<' + tag + '>' + ''.join(items) + '</' + tag + '>'); continue
        elif line.startswith('>'):
            quote = []
            while i < len(lines) and lines[i].strip().startswith('>'):
                quote.append(lines[i].strip()[1:].lstrip()); i += 1
            out.append('<blockquote>' + inline(' '.join(quote)) + '</blockquote>'); continue
        elif re.fullmatch(r'[-*_]{3,}', line):
            out.append('<hr>')
        else:
            para = [line]; i += 1
            while i < len(lines) and lines[i].strip() and not re.match(r'^(#{1,6} |```|\||>|[-*] |\d+\. )', lines[i].strip()):
                para.append(lines[i].strip()); i += 1
            out.append('<p>' + inline(' '.join(para)) + '</p>'); continue
        i += 1
    return '\n'.join(out)


def render(source, config):
    sections, current, fence = [], None, False
    for line in source.splitlines():
        if line.startswith('```'):
            fence = not fence
        if line.startswith('## ') and not fence:
            current = {'title': line[3:], 'lines': []}; sections.append(current)
        elif current is not None:
            current['lines'].append(line)
    if not sections:
        raise ValueError('Source needs H2 sections')
    used, feature_ids = set(), []

    def identifier(title, custom=None):
        value = custom or re.sub(r'[^\w-]+', '-', title.lower(), flags=re.UNICODE).strip('-')
        if not value or re.search(r'[^\w-]', value):
            raise ValueError('Invalid section ID: ' + value)
        if value in used:
            raise ValueError('Duplicate section ID: ' + value)
        used.add(value)
        return value

    toc, content = [], []
    collapsed = ('구현 범위', '확정 정책', '예외·복구', '상세 설계에서 정할 사항', '완료 조건', '선행 기반·일정', '기획 근거')
    for number, section in enumerate(sections, 1):
        title = section['title']
        sid = identifier(title, config.get('anchors', {}).get(title))
        toc.append('<a href="#' + sid + '">' + esc(title) + '</a>')
        markup = ['<section id="' + sid + '"><p class="eyebrow">' + f'{number:02}' + ' / ' + esc(config['version']) + '</p><h2>' + inline(title) + '</h2>']
        buffer, article, detail, fence = [], False, False, False

        def flush():
            markup.append(blocks(buffer)); buffer.clear()

        for line in section['lines']:
            if line.startswith('```'):
                fence = not fence
            if not fence and re.match(r'^#{3,4} ', line):
                flush()
                if detail:
                    markup.append('</div></details>'); detail = False
                if line.startswith('### '):
                    if article:
                        markup.append('</article>')
                    heading = line[4:]
                    match = re.match(r'^([A-Z]\d+)\b', heading)
                    aid = identifier(heading, match[1].lower() if match else None)
                    feature_ids.append(aid)
                    markup.append('<article class="feature" id="' + aid + '" data-search><h3>' + inline(heading) + '</h3>')
                    article = True
                else:
                    heading = line[5:]
                    if heading in collapsed:
                        markup.append('<details><summary>' + inline(heading) + '</summary><div>'); detail = True
                    else:
                        markup.append('<h4>' + inline(heading) + '</h4>')
            else:
                buffer.append(line)
        flush()
        if detail:
            markup.append('</div></details>')
        if article:
            markup.append('</article>')
        markup.append('</section>'); content.append('\n'.join(markup))
    assets = Path(__file__).resolve().parent.parent / 'assets'
    links = ''.join('<a class="button" href="' + safe_url(x['href']) + '">' + esc(x['label']) + '</a>' for x in config.get('links', []))
    stats = ''.join('<div><strong>' + esc(x['value']) + '</strong><span>' + esc(x['label']) + '</span></div>' for x in config.get('stats', []))
    values = {key: esc(config.get(key, '')) for key in ('brand', 'title', 'subtitle', 'version', 'revision', 'updated', 'status')}
    values.update(css=(assets/'style.css').read_text(), script=(assets/'document.js').read_text(), toc=''.join(toc), content='\n'.join(content), links=links, stats=stats)
    template = (assets/'shell.html').read_text()
    result = re.sub(r'\{\{(\w+)\}\}', lambda m: values[m[1]], template)
    return result, {'sections': len(sections), 'searchableBlocks': len(feature_ids), 'ids': sorted(used)}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', required=True, type=Path)
    parser.add_argument('--config', required=True, type=Path)
    parser.add_argument('--output', required=True, type=Path)
    args = parser.parse_args()
    config = json.loads(args.config.read_text())
    for key in ('title', 'version', 'updated'):
        if not config.get(key):
            raise ValueError('Missing metadata: ' + key)
    output, report = render(args.source.read_text(), config)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(output, encoding='utf-8')
    print(json.dumps({'output': str(args.output), **report}, ensure_ascii=False))


if __name__ == '__main__':
    main()
