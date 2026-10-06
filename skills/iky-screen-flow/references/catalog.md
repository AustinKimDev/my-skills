# Catalog contract

`flow.json` is the source for both viewer modes. Keep product decisions in the project's authoritative record and link them from catalog notes when needed. This schema is specific to the bundled viewer, not an application API or database model.

## Minimal nonempty example

The example describes proposed screens. Supply actual images before claiming visual completion; the builder sets `status` from file availability.

```json
{
  "meta": {
    "title": "프로젝트 · 화면과 흐름",
    "description": "주요 화면과 이동 경로를 검토합니다.",
    "notice": "이미지와 연결은 검토용 제안이며 실제 앱 동작이 아닙니다.",
    "defaultMode": "all",
    "entryScreenIds": ["browse"]
  },
  "sections": [{"id": "discovery", "title": "탐색"}],
  "screens": [
    {"id": "browse", "title": "탐색 목록", "section": "discovery", "description": "항목을 찾아 상세 화면으로 이동", "kind": "new", "image": "images/browse.png"},
    {"id": "detail", "title": "항목 상세", "section": "discovery", "description": "상세 정보 확인 후 목록으로 복귀", "kind": "new", "image": "images/detail.png"}
  ],
  "flows": [{
    "id": "all", "title": "전체 흐름", "description": "목록과 상세 탐색",
    "nodes": [{"id": "browse", "col": 0, "row": 0}, {"id": "detail", "col": 1, "row": 0}],
    "edges": [
      {"from": "browse", "to": "detail", "label": "항목 선택", "type": "primary"},
      {"from": "detail", "to": "browse", "label": "뒤로", "type": "return"}
    ],
    "groups": [{"id": "discovery", "title": "탐색", "col": 0, "row": 0, "cols": 2, "rows": 1}]
  }]
}
```

## Fields and invariants

| Field | Meaning |
|---|---|
| `meta.title`, `description`, `notice` | Korean review-shell copy by default; always describe mock/proposed behavior honestly. |
| `meta.defaultMode` | `all` or `graph`; defaults to `all`. |
| `meta.entryScreenIds` | Real entry nodes for reachability checks. For older catalogs without this field, validation uses the first node and reports the inference. |
| `sections` | Gallery order and display labels; unique stable IDs. |
| `screens[].id` | Unique lowercase kebab-case ID; reused across data, images, links, and revisions. |
| `screens[].kind` | `new` (new proposal), `existing` (reused mockup), or `edit` (revised mockup). None means approved or implemented. |
| `screens[].image` | Local relative PNG/JPG/JPEG/WebP/AVIF/GIF/SVG path inside the artifact. Omit when still pending. Copy authorized external assets into the artifact first; do not embed private machine paths. |
| `screens[].status` | Builder-derived `ready` or `pending`; ready means file exists, not visually approved. |
| `screens[].route` | Optional factual implemented route, used by search. Do not invent an implemented route for a proposal. |
| `screens[].reviewNotes` | Optional limitations/provenance notes for maintainers; not rendered by this viewer. |
| `flows` | Exactly one flow. Every screen appears once in its `nodes`. |
| `nodes[].col`, `row` | Nonnegative integer coordinates, unique occupied cells. Preserve deliberate spatial order. |
| `edges[].type` | `primary`, `optional`, or `return`; use a meaningful action/condition `label`. |
| `groups` | Optional rectangular spatial labels. Coordinates and dimensions use grid units. These do not create separate flows. |

Screen images retain intrinsic proportions in the gallery and preview. Graph cards are scaled thumbnails; the full-size dialog is the reading surface. For a large map, place related screens in compact rows and leave space between groups; do not lay out 100 screens in one long row. If a state transition would be a self-edge, represent the distinct visible state with its own ID or describe a same-screen action without drawing a fake navigation edge.

## Revision discipline

Update only affected screens and edges. Retain historical image versions outside the active catalog when useful; do not show retired screens merely because files still exist. A policy correction can affect copy, visual controls, graph branches, and entry conditions together. Reconcile those dependencies rather than changing an image while leaving a contradictory edge.

The builder preserves extra metadata, provenance, and notes. It does not copy the source project's special rename tables, tab configuration, or historical screen exclusions.
