# Before/after proposal — from a score to a target score

Use after a scored report when the user asks how to reach a target score (for example "9점대로 올리려면", "전후 비교 제안", "시안 여러 개로"). The deliverable is a decision report: real captures as "before", several HTML mockup variants per problem area as "after", re-scored by lenses, with clickable choices that come back to the agent.

Never present a projected score as a measurement. Keep three kinds of numbers apart and label them every time: **실기기 점수** (lenses on real captures), **목업 렌즈 점수** (lenses on mockups), **추정** (arithmetic from fixed findings).

## 1. Split the findings

- **Phase 0 — single-answer fixes.** Broken or wrong things with one correct fix (clipped buttons, a status bar that loses its icons, a sheet that survives navigation, a 404 route, a crash to confirm). No variants; they become one multi-select card.
- **Tracks — design choices.** 5–8 areas where several good answers exist (home top, empty states, image fallbacks, filters, color budget, curation order). Each track gets one before capture, the problem in one sentence, and 4 variants.
- Copy that only needs explanation (product names, jargon) becomes its own card. Names the owner chose stay; add a one-line explanation instead of renaming.
- Collect the owner decisions that must not change (brand hue, tab set, named features, curation principle) from the project docs before briefing anyone.

## 2. Mockup kit (once per project)

Make a small static kit so every variant is comparable and cheap:
- `kit.css`: the project's real tokens as CSS variables (colors, spacing, radii, type scale, motion durations and easing), one 390×844 `.phone` frame, header, chips, buttons (one filled brand style), cards, badges, tab bar, FAB, sheet, and a yellow numbered `.pin` for "what changed". Set `word-break: keep-all` for Korean.
- `kit.js`: fills an empty status bar, fills an empty tab bar from the app's real tabs (`data-active`), renders the icon set, and sets `document.documentElement.dataset.ready = "1"` after fonts and images load so a renderer knows when to capture.
- Copy the app's real avatars, illustrations and empty-state art into `img/`. Use the same user, posts and events the before capture shows; a fair comparison changes only the design variable.

## 3. Build variants in parallel

One builder agent per track, mid tier (for example sonnet, medium), each owning only `mock/<track>/`. Give every builder the same shared brief:
- Copy the head and frame of one finished flagship variant; reuse kit classes and tokens only.
- Each file starts with a comment block: name (≤12 Korean characters), problem, hypothesis, changed, fixed, motion (press, enter/exit or list change with ms and easing from the tokens; UI ships with motion).
- 1–3 numbered pins on what changed; 20 px gutter; 44 pt targets; nothing hidden by the tab bar or FAB; no cards in cards; at most one filled brand button; no decorative gradients; no emoji icons.
- The four variants must differ in a real hypothesis (composition, information order, interaction), not color or padding. A variant that contradicts an owner decision is allowed only as a clearly labeled reference ("참고안 · 소유자 결정과 다름").
- Korean copy follows the project's UI-copy rules (해요체, active voice, no periods on buttons, "닫기/다음에" rather than "취소").
- No rendering, browsing, app edits, installs or sub-agents in the builder.

The main session writes the flagship variant of the first track itself; the others copy its structure.

## 4. Render and check

- Serve the folder on loopback (check the port first) and render each file at 2x in the session browser: viewport 780×1688, `document.documentElement.style.zoom = "2"`, wait for `dataset.ready`, clip 780×1688. Some runtimes only screenshot at CSS scale, so zoom is the reliable way to get 2x.
- Build one contact sheet per track (before + 4 variants side by side) and look at every sheet. Fix pins sitting on text or in the header, clipped labels, mid-word Korean wraps, and anything behind the tab bar. One fix round, then move on.
- Extract every comment block into a JSON spec; the report's detail tables read from it.

## 5. Re-score the recommended set

Pick one recommended variant per track, then launch three lenses in one message on the before/after pairs:
- Benchmark lens (product-designer) with [benchmark.md](benchmark.md).
- Layout and consistency lens (design-reviewer) with the mockup kit's `kit.css` as the token source.
- First-time user lens (user-general).

Brief: product context, owner decisions that are not defects, the baseline area medians, the pair list, "do not penalize mockups for being mockups", and this output: area table `영역 | before | after | 이유`, total before → after, a per-pair verdict `고쳐짐 / 일부 / 안 고쳐짐 | 새 문제`, and up to four items still missing for the target. Collect what two or three lenses agree on as the "remaining to target" list. Expect the mockups to land below the target; the remaining list is how the report stays honest.

## 6. Decision report

Build it with [iky-decision-report](../embedded/iky-decision-report/GUIDE.md) (template, `summary_image.py`, `report_assets.py`, `preflight.py`). Layout:
1. Roadmap summary image: now (실기기) → after Phase 0 (추정) → recommended set (목업 렌즈) → target after fixes and a real-device re-score.
2. Re-score summary image: per-lens before → after, and the shared remaining items with how many lenses named each.
3. Area tiles: now → recommended set, with what is left per area.
4. Card 1: Phase 0 multi-select (`data-multi`, an exclusive "지금은 안 함"), each item with a one-line reason and a severity summary image.
5. One card per track: `.opts.vis.tall`; the first `.vopt` is the before capture without a button (dashed border, caption "지금 · …"), then four variants as buttons with a one-line tradeoff, the areas it improves, and a 권장 badge. Under the options, one line with the lens verdict and the condition attached to the recommendation. A collapsed table lists changed, fixed and motion for each variant. Label mockups as HTML mockups, not screens.
6. Terminology card with a before/after copy image.
7. Rank card for the order of work; default order is score impact.
8. Limits: what mockups cannot prove (accessibility at large text and contrast, motion, real data density, crashes), and that choices are design direction, not permission to change code or deploy.

Use plain digits in the card badges (circled numerals render too small). If `report_assets.py add` finds an existing name it writes `name-2`; replace the old file instead of leaving both. Run the round-trip once (apply recommended → build summary → parse JSON → reset) before handing the page to the user.

## 7. Process the reply

- Treat a memo that names a letter ("D", "A") as that choice. Restate the parsed choices in one line each.
- "둘 다 만들어서 보여줘": build both variants as interactive prototypes with states selectable by `?s=1|2|3` (applied without animation for capture) and tap interactions for the same states; do not merge them unasked.
- "있는 거랑 없는 거 차이를 모르겠어": put both conditions in one list per variant (for example an item with an image next to one without), and label demo media as an example.
- A product fact in a memo (for example "굿즈는 중고거래라 누구나 올릴 수 있어요") corrects the variant's copy and the record; apply it before implementation.
- A selected Phase 0 card approves those local code fixes. Production flags, store builds, OTA updates and deploys still need their own approval.
- After implementation, re-capture and re-score with the same lenses before claiming the target.
