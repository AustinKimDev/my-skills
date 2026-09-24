# Document inputs

## page.json

```json
{
  "brand": "Example",
  "title": "제품 3.0 기획서",
  "subtitle": "처음 읽는 사람도 이해할 수 있는 기능과 정책",
  "version": "3.0",
  "revision": "검토 초안 v0.1",
  "updated": "2026-09-10",
  "status": "범위 확정 · 상세 결정 대기",
  "stats": [{"value": "8", "label": "계획 기능"}],
  "links": [{"label": "이전 버전 기획", "href": "../previous/index.html"}],
  "anchors": {"1. 제품 범위": "overview", "2. 기능 설명": "features", "3. 실행 과제": "backlog"}
}
```

Dates, counts and status are project inputs, not template defaults. Supply one to three meaningful statistics. Use text as text; HTML is escaped. `anchors` preserves URLs such as `#backlog` as headings evolve. Heading IDs must be unique. Links accept relative paths, fragments, HTTP(S), or mailto; script and data URLs are rejected.

## spec.md

One H1 introduces the source document. H2 headings form sidebar sections; H3 headings form searchable feature/decision blocks. H4 headings subdivide those blocks. Selected detailed H4 sections (implementation, confirmed policy, exceptions and completion) become expandable, while purpose, examples and flow remain visible. Every detail is included in print.

Supported Markdown: headings, paragraphs, emphasis, inline code, links, flat bullet/numbered/task lists, blockquotes, pipe tables and fenced code. Tables are focusable horizontal-scroll regions on narrow screens. Code fences are displayed literally, including Mermaid; provide a text flow or a rendered diagram when a visual diagram is needed. Nested lists, raw HTML, Markdown images, footnotes and complex Markdown extensions are not supported; simplify the source or extend the renderer with verification rather than implying they were rendered.

Suggested sections depend on the plan: overview, release boundaries, user journey, current implementation comparison, feature explanations, confirmed policies, architecture alternatives, development order, backlog/completion evidence, open decisions and sources. Do not invent sections merely to match an example.

Use durable IDs (F01, G1, etc.) in feature H3 titles and link the actual tracker issue where one exists. Label unregistered planning requirements as such. Include unresolved decisions as explicit open items rather than silently accepting a recommendation.

## Regeneration and verification

`render.py` validates its inputs and writes a complete HTML file. Repeating it with unchanged inputs must produce the same bytes. It rejects unsafe URL schemes and duplicate custom IDs. Relative links are interpreted from the output directory, so colocate the Markdown and HTML or adjust links deliberately.

Verify outcomes rather than exact prose: all intended feature IDs are present exactly once, release assignment is correct, source links resolve, no unaccepted decision becomes confirmed, and the visible/printed document retains policy exceptions. Check the browser after changes to structure or interaction.
