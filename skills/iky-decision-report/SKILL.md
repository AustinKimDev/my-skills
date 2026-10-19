---
name: iky-decision-report
description: "Create an interactive status and decision report when the user requests a browser report with choices or approvals. Status, mechanisms and options are shown as summary images rather than prose, each decision card carries its own picture, and real screenshots and labeled AI reference images serve as evidence. Use the browser selected by the session policy or the user; ordinary inline questions do not require this workflow."
---

# Decision Report

## Bundled support

Read [the dependency map](references/dependencies.md) when a step calls for another skill. The required guides and resources are included in this folder; load only the relevant support and keep this workflow primary. Resolve a supporting guide's scripts and assets from its own directory. Runtime tools and project packages still come from the active environment.

Read [visuals](references/visuals.md) when the report needs screenshots, device captures, diagrams or AI reference images. `scripts/summary_image.py` draws summary images (status tiles, numbers, steps, before/after columns, chips, warning bands) from a JSON spec; `scripts/report_assets.py` saves and places images; `scripts/preflight.py` checks the finished report.


## Overview

A decision report is a **round-trip artifact**, not a document. The loop must close:
agent presents status + decisions → user **clicks** choices in the browser → user presses **copy** → pastes a machine-readable summary back to the agent → agent proceeds.

A beautiful static page that cannot return the user's selections has failed its purpose.

## When to Use

- User asks for a report **plus** decisions/approvals they need to make
- The user has selected an interactive report to resolve several open decisions
- User says "브라우저로/Aside에 띄워줘", "보고 고를게", "정리해서 보여줘"

NOT for: pure status reports (no decisions), single trivial questions (just ask inline).

## Must-Have Checklist

1. **Status first, decisions second** — one summary image (`.sumfig`) gives the context before asking; KPI tiles and the status table are the fallback when no image fits.
2. **Pictures over prose.** Readers scan pictures faster than paragraphs. Turn status, mechanisms, plans, comparisons and option tradeoffs into summary images (`scripts/summary_image.py`, `.diagram` SVG, image options), not paragraphs or bullet lists. Text stays at labels, one-line `dwhy`, captions and evidence lines; anything longer becomes a picture or goes into a collapsed `.det`. Applies to every report, not only to screen captures.
3. **Decision cards** — numbered, each with: question, a one-line "why this matters", **the picture that decision depends on inside the card** (`.dfig` summary image, or image options `.opts.vis` for visual choices), and clickable options. The user decides while looking at the picture; do not make them scroll between a separate figures section and the cards.
4. **Options are native `<button type="button" class="opt">` controls with JS handlers**, never bare radios or clickable divs. Each carries `data-v="value"`, a label, a one-line tradeoff in `<small>`, and a recommended badge with a reason where applicable. Support multi-select (`data-multi="1"`) for multiple answers, with an exclusive none/defer option. A ranking card uses `data-rank="1"` and a `.ranklist` of draggable `.rankitem`s; JSON `values` is ordered, `type:"rank"`, and always counts as decided. Each card includes `.memo textarea` for other conditions/opinions (JSON `note`), and optional `.evid` source links with `<a class="evlink">` to files, PRs, or lines.
5. **Sticky bottom bar** — "N / M 결정 선택됨" live counter + the primary copy button + secondary **"권장값 적용"·"초기화"** buttons (wired in template). A card counts as decided when an option is selected **or** the memo is non-empty.
6. **Copy handoff includes a human summary and machine-readable JSON**. The copy button puts both the summary and a fenced JSON block on the clipboard. Parse only the JSON, never the prose. Schema:
   ```json
   { "report": "...", "report_id": "...", "generated_at": "...", "copied_at": "...",
     "decisions": [ { "key": "d1", "q": "① …", "values": ["옵션 A"], "note": "" } ] }
   ```
   `values: []` means unselected; `note` contains freeform remarks. `key` is assigned by card order (`d1,d2,…`). The button displays “복사됨 — Claude에 붙여넣으세요” for about two seconds.
   **On clipboard failure**, including missing navigator.clipboard, denied permission, or an insecure context, the template opens a manual-copy overlay. The catch/fallback is already wired. Never leave the loop without feedback.
7. **Collapsible evidence** (`작업 상세 — 펼쳐서 보기`, optional): file/line references, commands and per-file changes go in `<details class="det">` blocks. Mechanisms and flows belong in pictures (item 2), not here as paragraphs.
8. **Readable light design** — keep the report on a white canvas with near-black text, quiet gray borders, and restrained semantic status colors. Reuse project fonts/icons and spacing where useful, but do not inherit a dark or low-contrast project theme. CDN fonts/icons are fine for a local file. No gradients, decorative color, or emoji as UI chrome.
9. **Open the report in the selected browser** — follow the active session policy and the user's explicit browser choice. Read the [bundled browser runtime guide](embedded/browser-runtime/GUIDE.md). In Orca, load the executable's version-matched guide; resolve the session's owning workspace and pin subsequent operations to its page ID. If HTTP is needed, serve only the report directory on loopback using the port policy and record the server PID/session. When Aside is selected, read its runtime-provided guide, use a persistent interactive `aside repl` PTY and `openTab('http://127.0.0.1:<port>/')`, and keep the REPL and server alive until the decision summary returns; one-shot execution closes its tab. Stop only task-owned processes afterward. If the selected browser is unavailable, provide the artifact and specific limitation without silently switching browsers.
10. **Tell the user the protocol** after opening: click choices → press copy → paste the summary back here, and I proceed accordingly.
11. **Visual evidence is required; real captures come first.** When a decision depends on how a screen, page or device looks, show real captures in `.shots` (portrait phones in `.shots.phones`, before/after with `.tag`). Otherwise use the grammar that answers the question: `.diagram` SVG for structure, flows and lifecycles, `.viz-bars` for numbers, `.viz-timeline`, `.viz-compare`. Save images into the report's `assets/` with `scripts/report_assets.py add` and reference them relatively, or inline them for a single-file handoff; never use `file:///` (blocked when served over HTTP). If a capture is impossible, write the reason in a `.note` instead of silently omitting it. Every image has alt text and a caption naming what it proves and its source; images open in the built-in zoom view. Follow [visuals](references/visuals.md).
12. **AI reference images only for visual-direction decisions** with no real capture or existing asset. Generate through the [image-generation guide](embedded/image-generation/GUIDE.md) with the environment's image tool, one per option, and inspect each result. Show them in `figure.shot.ref` with the visible label `AI 생성 참고 이미지 · 실제 화면 아님` and the actual prompt, or as image options (`.opts.vis` + `.vopt`) marked "AI 참고 이미지". Never use one in place of a screen capture or as product state. If no image tool is available, say so and use a diagram.
13. **Preflight before delivery**: run `python3 scripts/preflight.py <report.html>` and fix every ERROR. It checks leftover TODOs, the title/report-id/generated-at, options per card and rank items, image files (missing, empty, outside the folder, `file://`), alt text, AI reference labels and visual evidence, and warns about decision cards without a picture, paragraphs long enough to read as prose, oversized or remote images and reports with no real capture. After opening, confirm images load and one zoom view opens and closes with Esc.

## Implementation

Copy `template.html` from this directory and replace TODO markers: title, report-id/generated-at metadata, badge, KPIs, status rows, captures and visuals, collapsible details/prose, decision cards with memo and optional evidence/ranking/image options, and known issues. Delete unused visual examples, including placeholder `assets/…` images. JavaScript already handles single/multiple/exclusive selection, drag ranking, counts, defaults/reset, human+JSON handoff, and clipboard fallback. Preserve `data-q`, `data-v`, `data-multi`, `data-rank`, `.opt`, `.dcard`, `.memo textarea`, and `.rankitem` contracts. Decision keys follow card order. Keep the status table inside its `.tbl` wrapper (column widths depend on it). Native `.det`/`.shots`/`.viz`/`.diagram` need no chart dependency; the zoom view attaches itself to `.shot`, `.vopt`, `.sumfig` and `.dfig` images. Build summary images with `python3 scripts/summary_image.py spec.json out.svg`, add them with `report_assets.py add`, and look at each rendered image before use.

## Processing pasted decisions (return contract)

1. Read the **JSON fence only**; confirm `report_id` matches the report you sent (avoids acting on a stale paste when several are open).
2. A decision with `values: []` is unanswered. Re-ask or confirm a recommended-default assumption; do not silently fill it.
3. Honor freeform conditions/opinions in `note`; clarify ambiguity. For `type:"rank"`, `values` is priority order (index 0 highest), not a set.
4. **Execution authorization:** a returned decision authorizes an action only when the report identifies its exact action, target, and scope and the user explicitly approves them. Validate the report ID and honor freeform conditions. A default selection, preference ranking, unanswered card, or unrelated approval is not execution authorization. Carry clear prior approval forward, including for permission-sensitive actions; ask only about unresolved, changed, or unapproved scope. Preserve project and environment approval boundaries.

## Common Mistakes (from baseline testing)

| Mistake | Fix |
|---|---|
| Radios or clickable divs with no handoff | Use native `.opt` buttons plus the template's copy-handoff; the clipboard summary IS the deliverable |
| Missing recommendation makes the user ask which is better again | Mark a recommendation with a one-line reason, except for pure preference. |
| Forcing one choice where several are allowed | Use `data-multi="1"` and an exclusive none option. |
| Inheriting a dark/low-contrast project theme | Keep the white/near-black report base; reuse fonts/icons and restrained accent only |
| Browser choice or tab ownership differs from the session policy | Follow the selected browser workflow and pin the owning workspace/page; use Aside-specific lifecycle rules only when Aside is selected |
| Text-only report with no evidence | Add one useful capture/image or the chart grammar that best answers the decision question |
| Explaining status, plans or options in paragraphs | Draw them with `summary_image.py`; keep text to labels and one-line captions |
| Figures in their own section, far from the cards | Put each decision's picture inside its card (`.dfig` or `.opts.vis`) |
| Ending the turn without explaining the paste-back step | The protocol sentence is part of the skill |
| Cramming technical detail into the status table (or omitting it) | Move depth into collapsed `.det` blocks (or `.prose`/`.shot`) — scannable body, detail one click away |
| Clipboard write with no `.catch` → silent dead-end on failure | Template auto-opens the manual-copy overlay; the loop never dead-ends |
| Re-parsing the Korean prose summary | Parse the JSON fence only — comma-bearing values & multi-select stay unambiguous |
| Opening with `<!-- TODO -->` or empty `<img src="">` left in | Run `scripts/preflight.py` before opening the report |
| `file:///` image sources in a report served over HTTP | `report_assets.py add` into `assets/`, relative `src` |
| Phone capture at full width (2000 px tall) | `.shots.phones` or `.shot.phone` |
| Diagrams only, for a report about changed screens | Capture the screens, or state in a `.note` why that is impossible |
| Trusting a full-page capture | Inspect it; some runtimes repeat the first viewport. Capture the element after scrolling it into view |
| AI image shown as if it were the product | `.shot.ref` label plus prompt; only for visual-direction choices |
