# Browser comparison workspace

Use Node 22 or later; no extra packages are required. Create `manifest.json` and preview HTML in a dedicated folder such as `.ui-design/review/`. Existing development-server URLs can reuse that project's HMR. Check the port before starting a server, reuse an existing server for the same root, and never stop an unrelated process.

```sh
node ~/.agents/skills/ui-design/scripts/preview.mjs check .ui-design/review
node ~/.agents/skills/ui-design/scripts/preview.mjs serve .ui-design/review 4317
```

Open the printed local URL. PID, root, URL, and command are recorded in `.review/server.json`. Use the actual recorded process when stopping the server.

## Overview board for connected screens and states

When a review needs simultaneous role/state coverage, supplement the direction/feedback workspace with an authored `overview.html` following [the overview board pattern](overview-board.md). Place it in the review root alongside the screen specimens; the existing server serves it at `/preview/overview.html`. The server does not generate this board automatically. Keep the workbench for formal direction selection and saved feedback, and use the overview to inspect coverage, information architecture and connected flows. Reuse the same screen/variant/fixture data rather than maintaining separate mockups.

## Define a comparison

Each `subjects` entry is one decision. Describe its `purpose` in plain language. Optional `type` can reuse a [catalog example](screens/catalog.json) or any task-specific label; the catalog never gates rendering. Choose a useful `mode` from [modes.md](modes.md), or a custom lowercase/hyphen ID with `modeLabel`. Register only currently useful subjects/modes. The multi-mode example demonstrates capabilities; do not copy all its modes into a normal task.

For each new comparison, generate five alternatives by default, minimum four. A user-requested narrowing or a direct edit can have fewer. The renderer accepts 1–6 variants per subject so a mixed revision can temporarily join the current set. This technical limit is not a proposal-count policy.

Show all actual Korean names and short differences in a radio list. Reveal the active variant's tradeoff/reference inside the option. Never substitute numbers or a select control. Support arrow keys, Home/End, and one selected Tab stop. Preview switching is separate from saving a direction with “이 방향 선택”.

The workspace is desktop-first: 14px base type, a 320px left sidebar for decisions, and the remaining width for previews. Sidebar and canvas scroll independently. Keep modes, advanced settings, feedback, and history in expandable secondary areas. Put single/side-by-side view and viewport controls above the preview. Stack the regions on narrow displays while preserving touch targets. Do not use select elements.

Workspace colors: white `#fff`, black `#000`, and royal-blue 100–900 with 500 at `#4169E1`. Use light-blue selection fills and visible blue borders/indicators. Product previews follow their own confirmed style; workspace styling is not a universal product theme.

```json
{
  "title": "예약 흐름 검토",
  "subjects": [{
    "id": "booking-button",
    "name": "예약 버튼",
    "question": "예약 행동을 어떻게 표현할까요?",
    "type": "service.booking",
    "mode": "component",
    "preview": { "viewport": "mobile", "isolatedHeight": 280 },
    "states": ["default", "loading", "disabled", "error"],
    "sizes": ["sm", "md", "lg"],
    "variants": [{
      "id": "plain",
      "name": "간결한 행동",
      "description": "명확한 행동 하나에 집중합니다.",
      "tradeoff": "가격은 주변 맥락에서 확인해야 합니다.",
      "url": "button.html",
      "contextUrl": "booking.html",
      "reference": "확인한 참고 화면과 관찰 범위"
    }],
    "next": []
  }]
}
```

This is a one-variant schema example, not a complete exploration. Fill the remaining distinct variants for an exploration. Use `description` for the decisive difference and `tradeoff` for its cost. For exploration, populate the browser comparison data below using [discovery.md](discovery.md#comparison-criteria). The workspace renders the supplied assessments and recommendations; an agent remains responsible for the reasoning.

`url` accepts a relative HTML path (query allowed) or a local HTTP URL. Optional fields: `contextUrl`, `reference`, `next`. Every `next` entry must reference another subject in this manifest. Frames receive `state` and `size` query parameters; implement them rather than merely showing controls.

### Target viewport and specimen height

Set each subject's `preview.viewport` from its target environment: `mobile` (390 × 844), `tablet` (768 × 1024), or `desktop` (1280 × 800 CSS px). Omitted metadata retains the desktop default for older manifests. A desktop review workspace does not imply a desktop product screen. Full mobile screens need `{"preview":{"viewport":"mobile"}}` in every mode, including color and component decisions shown in a whole-page context.

Optional `preview.height` overrides the frame height; optional `preview.isolatedHeight` overrides it only in isolated view. Each is an integer from 100 to 4000 CSS px. Set a short isolated height only for an actual bounded specimen, such as a button; review mode alone never crops a screen. Context view uses `height` or the viewport preset. Long content scrolls inside its viewport. Scale width and height together to fit the available column; never stretch a portrait screen across the workspace. Mobile cards retain a compact width in single and side-by-side views; additional variants scroll horizontally instead of becoming unreadable thumbnails.

Viewport choices persist per subject and survive variant switching, refresh, and reopening. On first use of this version, the old workspace-wide viewport choice resets to each subject's declared default; selected variants and feedback remain intact. Verify the rendered frame dimensions, bottom-content scrolling, side-by-side geometry, and explicit viewport switching before handing off a review URL.

## Revision history

Keep the current comparison small while preserving complete earlier rounds. **Before replacing variants or changing shared assets**, archive the current static review:

```sh
node ~/.agents/skills/ui-design/scripts/preview.mjs archive .ui-design/review
```

The command returns a unique sibling archive directory. It copies the manifest and non-hidden local files, captures feedback/acknowledgment records in `archive-record.json`, and excludes live server/worker state. It refuses symlinks and mutable development-server URLs. It never overwrites a previous archive. Keep archives unchanged by convention; they remain editable filesystem copies, not a tamper-proof store.

Record the returned directory, selected IDs, decision rationale, and source revision in `.ui-design/brief.md`. Then update the current manifest and files. Reopen an archive with `serve ARCHIVE_ROOT FREE_PORT` after checking a free port; its relative assets and navigation remain self-contained. This is an archive workflow, not a new history selector inside the current viewer.

A development-server URL cannot be frozen by copying a manifest. Export a static review first where feasible. Otherwise preserve the relevant source revision plus patch/assets, screenshots, manifest, feedback, and local start instructions before editing; explicitly state that replay requires that source environment. Do not describe screenshots or mutable URLs as an interactive archive.

## Feedback and live refresh

The viewer saves selection/feedback in `.review/events.jsonl`. During an active review session, read pending events and acknowledge only after applying and checking the change:

```sh
node ~/.agents/skills/ui-design/scripts/preview.mjs poll .ui-design/review
node ~/.agents/skills/ui-design/scripts/preview.mjs ack .ui-design/review 1 '버튼 문구 반영 및 확인 완료'
```

`poll ROOT AFTER_SEQ SECONDS` accepts waits up to 50 seconds. Read feedback → archive the previous round → revise → inspect in the browser → acknowledge. Do not wait indefinitely after ending the turn or when the user stops review.

File changes refresh previews through SSE. Selected variant/state/viewport are retained, but frame input may reset; implement required input restoration in the prototype. Saving feedback alone does not refresh the frame. Without an active agent heartbeat, show connection waiting honestly: the server still stores feedback but does not generate new designs. Resume from unprocessed events next session.

## Example and validation

`assets/example/` demonstrates multiple modes and a connected reservation journey. Copy it into a new dedicated folder; do not overwrite existing reviews or save user feedback in the skill's source example.

```sh
mkdir -p .ui-design/review
cp ~/.agents/skills/ui-design/assets/example/* .ui-design/review/
node ~/.agents/skills/ui-design/scripts/preview.test.mjs
```

Static HTML uses a sandbox and content policy that block external API writes. A linked development server retains its own behavior, so use local mock state for prototype mutations. Verify native interactions separately on a simulator/device.

## Comparison data

Attach an optional `comparison` object to each subject. Existing manifests without it still open and show a clear empty state in the comparison view. New exploration should populate it; direct edits need no table. Keep criteria relevant, generally 4–8, without forcing artificial coverage. All assessment and recommendation text is agent-authored Korean.

```json
{
  "purpose": "맥락을 유지하면서 근거를 비교하고 다음 행동을 결정하기",
  "comparison": {
    "criteria": [{"id":"context", "label":"맥락 유지", "group":"정보 구조", "why":"목록과 상세를 오갈 때 판단 근거가 유지되는지", "priority":"high"}],
    "assessments": [{"criterion":"context", "variant":"plain", "observation":"상세 옆에 비교 목록을 유지합니다.", "evidence":"현재 데스크톱 시안의 두 영역을 확인했습니다.", "tradeoff":"좁은 화면에서는 상세로 전환하는 동작이 필요합니다.", "status":"observed"}],
    "recommendations": [{"label":"맥락을 자주 비교한다면", "variants":["plain"], "reason":"후보와 근거를 동시에 볼 수 있습니다.", "caution":"모바일 전환은 별도 확인이 필요합니다."}],
    "nextComparison":"선택한 구성의 상세 패널과 타이포그래피 비교"
  }
}
```

This is a schema excerpt, not a researched claim or complete proposal. Replace sample evidence/URLs with sources that actually support the assessment; reference current subject variant IDs. `status` is `observed`, `hypothesis`, or `untested`: visual observation does not prove user performance. Missing cells display untested, never a score or implied pass. `priority` is `high` or `normal`; `group`, `sourceUrl`, `caution`, and `nextComparison` are optional. Source URLs must be public HTTP(S), without embedded credentials. Do not include personal session URLs.

Use the workspace's “미리보기 / 비교표·추천” controls. The table supports group and priority filters, named variant columns, selected-column emphasis, evidence/tradeoff disclosure, and buttons to preview a direction or leave criterion-specific feedback. Recommendations can reference one or several variants for a hybrid without claiming that the hybrid has already been built. Explicit direction selection remains separate from browsing. Feedback optionally records a validated `criterion` ID and its label for later processing and archives.
