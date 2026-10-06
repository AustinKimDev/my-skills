#!/usr/bin/env python3
"""Render researched partner data as a portable, offline HTML report."""
import argparse
import base64
import html
import json
from pathlib import Path
from urllib.parse import urlsplit

REQUIRED = ('name', 'profile_url', 'category', 'priority', 'activity', 'evidence',
            'fit', 'contact', 'history', 'pending')
MIMES = {'.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
         '.webp': 'image/webp', '.gif': 'image/gif'}


def esc(value):
    return html.escape(str(value), quote=True)


def web_url(value):
    if not isinstance(value, str):
        raise ValueError('Source URLs must be strings')
    parsed = urlsplit(value)
    if parsed.scheme not in ('http', 'https') or not parsed.netloc or parsed.username or parsed.password:
        raise ValueError('Source URLs must use HTTP(S) without credentials')
    return value


def link(url, label):
    return '<a href="{}" target="_blank" rel="noopener noreferrer">{}</a>'.format(esc(web_url(url)), esc(label))


def image_data(path, root, cache):
    target = (root / path).resolve()
    if target in cache:
        return cache[target]
    if target.suffix.lower() not in MIMES or not target.is_file():
        raise ValueError('Missing or unsupported local image: {}'.format(target.name))
    payload = target.read_bytes()
    valid = (payload.startswith(b'\x89PNG\r\n\x1a\n') or payload.startswith(b'\xff\xd8\xff')
             or payload.startswith((b'GIF87a', b'GIF89a'))
             or (payload.startswith(b'RIFF') and payload[8:12] == b'WEBP'))
    if not valid:
        raise ValueError('File is not a supported raster image: {}'.format(target.name))
    cache[target] = 'data:{};base64,{}'.format(MIMES[target.suffix.lower()], base64.b64encode(payload).decode('ascii'))
    return cache[target]


def content_group(items, label, root, cache, recent_urls):
    if not items:
        return '<section class="content"><h3>{}</h3><p class="muted">확인한 게시물 없음</p></section>'.format(esc(label))
    parts = []
    for item in items:
        for key in ('title', 'summary', 'source_url'):
            if not isinstance(item.get(key), str):
                raise ValueError('Content requires string field: ' + key)
        url = web_url(item['source_url'])
        picture = '<div class="no-photo">사진 미수집</div>'
        if item.get('image_path'):
            picture = '<img src="{}" alt="{}" loading="lazy">'.format(image_data(item['image_path'], root, cache), esc(item['title']))
        overlap = '<span class="muted">최근 목록에도 포함</span>' if url in recent_urls else ''
        provenance = ' · '.join(str(item[k]) for k in ('published_on', 'capture_type') if item.get(k))
        parts.append('<figure>{}<figcaption><strong>{}</strong><p>{}</p><small>{}</small>{}{}</figcaption></figure>'.format(
            '<a href="{}" target="_blank" rel="noopener noreferrer">{}</a>'.format(esc(url), picture),
            esc(item['title']), esc(item['summary']), esc(provenance), overlap, link(url, '원본 보기 ↗')))
    return '<section class="content"><h3>{} <small>{}개</small></h3><div class="photos">{}</div></section>'.format(esc(label), len(items), ''.join(parts))


def render(data, root):
    for field in ('title', 'checked_on', 'brief'):
        if not isinstance(data.get(field), str):
            raise ValueError('Report requires string field: ' + field)
    candidates = data.get('candidates')
    if not isinstance(candidates, list):
        raise ValueError('candidates must be an array')
    cards, cache, seen = [], {}, set()
    categories, priorities, methods = set(), set(), set()
    for number, c in enumerate(candidates, 1):
        for key in REQUIRED:
            if not isinstance(c.get(key), str):
                raise ValueError('Candidate {} requires string field: {}'.format(number, key))
        profile = web_url(c['profile_url'])
        identity = profile.rstrip('/')
        if identity in seen:
            raise ValueError('Duplicate profile URL')
        seen.add(identity)
        categories.add(c['category']); priorities.add(c['priority'])
        contact_methods = c.get('contact_methods', [])
        if not isinstance(contact_methods, list) or not all(isinstance(m, str) for m in contact_methods):
            raise ValueError('contact_methods must be a list of strings')
        methods.update(contact_methods)
        details = ''.join('<dt>{}</dt><dd>{}</dd>'.format(label, esc(c[key])) for label, key in (
            ('확인한 활동', 'activity'), ('조건 확인 근거', 'evidence'), ('모집 제안 포인트 · 판단', 'fit'),
            ('연락 경로', 'contact'), ('기존 연락 이력', 'history'), ('확인할 내용', 'pending')))
        email = c.get('email', '')
        if email:
            if any(char in email for char in '\r\n?&#') or email.count('@') != 1:
                raise ValueError('Invalid public email address')
            details += '<dt>공개 이메일</dt><dd><a href="mailto:{}">{}</a></dd>'.format(esc(email), esc(email))
        recent = c.get('recent_content', [])
        representative = c.get('representative_content', [])
        if not all(isinstance(group, list) for group in (recent, representative, c.get('content', []))):
            raise ValueError('Content groups must be arrays')
        media = content_group(recent, '최근 게시물', root, cache, set()) if 'recent_content' in c else ''
        media += content_group(representative, '대표 게시물', root, cache, {p['source_url'] for p in recent}) if 'representative_content' in c else ''
        media += content_group(c.get('content', []), '콘텐츠 예시', root, cache, set()) if c.get('content') else ''
        sources = ' · '.join(link(s['url'], s['label']) for s in c.get('sources', []))
        search = ' '.join(str(c.get(k, '')) for k in REQUIRED + ('handle', 'platform'))
        attrs = 'data-category="{}" data-priority="{}" data-methods="{}" data-search="{}"'.format(
            esc(c['category']), esc(c['priority']), esc(json.dumps(contact_methods, ensure_ascii=False)), esc(search.casefold()))
        cards.append('<article {}><div class="top"><div><small>후보 {:02d}</small><h2>{}</h2><span class="muted">{}</span></div><strong class="audience">{}</strong></div><div class="tags"><span>{}</span><span>{}</span></div><dl>{}</dl>{}<div class="sources">{}{}</div></article>'.format(
            attrs, number, esc(c['name']), esc(c.get('handle', '')), esc(c.get('audience', '규모 미확인')),
            esc(c['priority']), esc(c['category']), details, media, link(profile, '프로필 보기 ↗'), (' · ' + sources) if sources else ''))
    def options(values):
        return ''.join('<option>{}</option>'.format(esc(v)) for v in sorted(values))
    template = (Path(__file__).resolve().parents[1] / 'assets/report.html').read_text(encoding='utf-8')
    values = {'TITLE': esc(data['title']), 'DATE': esc(data['checked_on']), 'BRIEF': esc(data['brief']),
              'NOTES': esc(data.get('notes', '참여 의향과 미확인 정보는 후보별로 확인해 주세요.')),
              'TOTAL': str(len(candidates)), 'CARDS': ''.join(cards), 'CATEGORIES': options(categories),
              'PRIORITIES': options(priorities), 'METHODS': options(methods)}
    # Replace tokens in one pass so researched content cannot introduce template directives.
    import re
    return re.sub(r'@@([A-Z]+)@@', lambda match: values[match.group(1)], template)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('input', type=Path)
    parser.add_argument('--output', required=True, type=Path)
    args = parser.parse_args()
    try:
        data = json.loads(args.input.read_text(encoding='utf-8'))
        result = render(data, args.input.resolve().parent)
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(result, encoding='utf-8')
    except (ValueError, OSError, TypeError, KeyError) as exc:
        parser.exit(1, 'Report failed: {}\n'.format(exc))
    print('Saved {} candidates to {}'.format(len(data['candidates']), args.output))


if __name__ == '__main__':
    main()
