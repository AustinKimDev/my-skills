---
name: decision-report
description: "Create an interactive status and decision report when the user requests a browser report with choices or approvals. Use the browser selected by the session policy or the user; ordinary inline questions do not require this workflow."
---

# Decision Report

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

1. **Status first, decisions second** — KPI tiles + status table give context before asking.
2. **Decision cards** — numbered, each with: question, 1–2 line "why this matters", clickable options.
3. **Options are native `<button type="button" class="opt">` controls with JS handlers**, never bare radios or clickable divs. Each carries `data-v="value"`, a label, a one-line tradeoff in `<small>`, and a recommended badge with a reason where applicable. Support multi-select (`data-multi="1"`) for multiple answers, with an exclusive none/defer option. A ranking card uses `data-rank="1"` and a `.ranklist` of draggable `.rankitem`s; JSON `values` is ordered, `type:"rank"`, and always counts as decided. Each card includes `.memo textarea` for other conditions/opinions (JSON `note`), and optional `.evid` source links with `<a class="evlink">` to files, PRs, or lines.
4. **Sticky bottom bar** — "N / M 결정 선택됨" live counter + the primary copy button + secondary **"권장값 적용"·"초기화"** buttons (wired in template). A card counts as decided when an option is selected **or** the memo is non-empty.
5. **Copy handoff includes a human summary and machine-readable JSON**. The copy button puts both the summary and a fenced JSON block on the clipboard. Parse only the JSON, never the prose. Schema:
   ```json
   { "report": "...", "report_id": "...", "generated_at": "...", "copied_at": "...",
     "decisions": [ { "key": "d1", "q": "① …", "values": ["옵션 A"], "note": "" } ] }
   ```
   `values: []` means unselected; `note` contains freeform remarks. `key` is assigned by card order (`d1,d2,…`). The button displays “복사됨 — Claude에 붙여넣으세요” for about two seconds.
   **On clipboard failure**, including missing navigator.clipboard, denied permission, or an insecure context, the template opens a manual-copy overlay. The catch/fallback is already wired. Never leave the loop without feedback.
6. **Collapsible deep-dive section** (`작업 상세 — 펼쳐서 보기`): keep the status table at one line per row. Put internal flows, configuration/control instructions, per-file changes, and mechanism explanations in styled `<details class="det">` blocks between status and decisions. Use `.flow` step chips for pipelines. Keep detail one click away; neither dump it into the table nor omit it.
7. **Readable light design** — keep the report on a white canvas with near-black text, quiet gray borders, and restrained semantic status colors. Reuse project fonts/icons and spacing where useful, but do not inherit a dark or low-contrast project theme. CDN fonts/icons are fine for a local file. No gradients, decorative color, or emoji as UI chrome.
8. **Open the report in the selected browser** — follow the active session policy and the user's explicit browser choice. In Orca, load `orca-cli` and its version-matched guide; resolve the session's owning workspace and pin subsequent operations to its page ID. If HTTP is needed, serve only the report directory on loopback using the port policy and record the server PID/session. When Aside is selected, load `aside-browser` and its installed guide, use a persistent interactive `aside repl` PTY and `openTab('http://127.0.0.1:<port>/')`, and keep the REPL and server alive until the decision summary returns; one-shot execution closes its tab. Stop only task-owned processes afterward. If the selected browser is unavailable, provide the artifact and specific limitation without silently switching browsers.
9. **Tell the user the protocol** after opening: click choices → press copy → paste the summary back here, and I proceed accordingly.
10. **Visual evidence is required**. Include at least one relevant visual that helps decisions: screenshots from the selected browser for browser state, `.viz-bars` for numeric/ranked comparisons, `.viz-timeline` for chronology, `.viz-compare` for alternatives/before-after, and `.flow` or accessible inline `<svg class="viz-chart">` for flows/dependencies/trends. Place real captures in `<figure class="shot"><img …><figcaption>`, preferably using data:image/png;base64 URIs. Supply alt text or SVG title/desc and a one-line caption. No decorative images or fabricated product captures.
11. **Preflight before delivery**: before opening the report, check for leftover TODO comments; replaced title/report-id/generated-at; at least one option per non-ranking card and two rank items per ranking card; recommendation markers where appropriate; at least one nonempty `.shot img` or `.viz`; and no empty image source. Fix and recheck failures; prevent beautiful-but-broken reports.

## Implementation

Copy `template.html` from this directory and replace TODO markers: title, report-id/generated-at metadata, badge, KPIs, status rows, a relevant visual/capture, collapsible details/prose, decision cards with memo and optional evidence/ranking, and known issues. Delete unused visual examples. JavaScript already handles single/multiple/exclusive selection, drag ranking, counts, defaults/reset, human+JSON handoff, and clipboard fallback. Preserve `data-q`, `data-v`, `data-multi`, `data-rank`, `.opt`, `.dcard`, `.memo textarea`, and `.rankitem` contracts. Decision keys follow card order. Native `.det`/`.shot`/`.viz` need no chart dependency or extra JS.

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
| Ending the turn without explaining the paste-back step | The protocol sentence is part of the skill |
| Cramming technical detail into the status table (or omitting it) | Move depth into collapsed `.det` blocks (or `.prose`/`.shot`) — scannable body, detail one click away |
| Clipboard write with no `.catch` → silent dead-end on failure | Template auto-opens the manual-copy overlay; the loop never dead-ends |
| Re-parsing the Korean prose summary | Parse the JSON fence only — comma-bearing values & multi-select stay unambiguous |
| Opening with `<!-- TODO -->` or empty `<img src="">` left in | Run the pre-flight checks before opening the report |
