---
name: iky-app-design-score
description: Score an app's current design and usability from real screenshots - capture the screens (iOS device or simulator via devicectl/simctl deep links, or a browser), have several design-skill lenses review the same screenshots in parallel (critique heuristics, component and layout craft, designer review and final QA, the project's design contract, a Toss/Daangn/Apple HIG/anti-AI-look benchmark, a first-time user), then merge their findings into one scored report with severity and confidence. Use for "앱 디자인 점수 매겨줘", "UI/UX 점수로 분류", "실기기 화면 보고 디자인 평가", "토스 당근 애플 기준으로 평가", "AI 티 나는지 봐줘", "screenshot design review", or "score the app's design". Read-only; fixes only when asked.
---

# IKY App Design Score

Turn real screens into one evidence-graded design and usability score. The main session captures, briefs, merges and decides; lens agents only read screenshots.

Flow: **capture → parallel lens review → merge → final verdict**. Report in Korean.

## 1. Capture

- Use the device or browser the user names. Prefer a command path over driving a GUI window:
  - iOS device: `xcrun devicectl device capture screenshot` plus `devicectl device process openURL <scheme>://<route>` for navigation. See [references/capture.md](references/capture.md).
  - iOS simulator: `xcrun simctl io <udid> screenshot` and `simctl openurl`.
  - Web: the session's browser tool, at mobile and desktop widths.
- Build the route list from the app's router (for example the `app/` folder in Expo Router). Cover every tab, the main stack screens, the sign-in screen, and one detail screen per content type.
- Capture both signed-out and signed-in states when the app has both. Never type, post, save, buy or change settings on a production account. Only navigate.
- Check every capture for leftovers before review. A sheet or permission prompt from one screen can stay on top of later screens. Relaunch the app (`process launch --terminate-existing <bundle-id>`) and recapture the covered ones.
- Name files `NN-route.png`. Resize to about 1400 px tall (`sips -Z 1400`) so lens agents can read small text.

## 2. Brief the lenses

Write one shared brief file (template: [references/lens-brief.md](references/lens-brief.md)). It covers product context, screen list, conditions to ignore (mirroring indicators, debug badges), the read-only rule, and the fixed output format. Then launch one agent per lens in a single message:

| Lens | Reads | Agent |
|---|---|---|
| Critique heuristics | `impeccable` `reference/critique.md` (+ `ios.md` / `android.md`) | product-designer |
| Component and layout craft | `better-ui`, `better-layout` | design-reviewer |
| Designer review and final QA | `omd-designer-review`, `omd-final-qa` | design-reviewer |
| Project design contract | `iky-design` + `iky-design-audit`, or the project's DESIGN.md | design-reviewer |
| Benchmark | [references/benchmark.md](references/benchmark.md) (Toss T*, Daangn D*, Korean writing W*, Apple HIG H*, AI-look tells A*) | product-designer |
| First-time user | none; persona only | user-general |

- Skip a lens whose skill is not installed and say so. Do not invent its rules.
- Use a mid tier (for example sonnet, medium effort). Screenshot QA needs judgment, not the top tier.
- Each brief names exactly the lens files to read and forbids sub-agents and edits.

## 3. Merge

- Normalize every finding to `screen | element | problem | rule IDs | severity 1–5 | lenses that agree | confidence`.
- Deduplicate. When two or more lenses report the same element, raise the confidence. A single-lens finding that you cannot see in the screenshot drops to low or is cut.
- Look at the screenshot yourself for every severity 4–5 finding before you keep it. Lens agents misread small text and confuse mirroring artifacts with app defects.
- Lenses adopt the brief's framing. Write observations in the brief, not interpretations ("a sheet was on top of X", not "appeared right after entering X"). Before you accept a permission-prompt, dark-pattern or crash finding, check the trigger logic in code or reproduce it.
- No lens may judge a screen that an overlay covered. Recapture it clean first.
- Separate **what lenses agree on** from **lens-specific taste**. Report taste disagreements as such, not as defects.
- For area scores, take the median across lenses for each area. Report the spread when it is 3 points or more.
- Correct earlier claims when new evidence contradicts them, for example a defect that appears only when signed out.

## 4. Final report (Korean)

1. One-line verdict and overall score /100 (the median of the lens totals), with the per-lens totals in one line.
2. Area score table: 시각 위계, 레이아웃·간격, 일관성, 타이포그래피, 색·다크모드, UX 카피, 사용 흐름, 빈 상태·피드백, 브랜드 개성(AI 티), 접근성.
3. Findings by severity. Severity 5 means fix before release; group 1–2 at the end.
4. What already works (3–5 items), so fixes keep it.
5. Top 5 fixes in order of impact and effort.
6. Not verified: interaction, motion, Dynamic Type, light mode, other devices.

Stop after the report. Suggest `iky-ui-design` or `impeccable polish` for the fixes and do not start them unasked.

## Boundaries

- Read-only by default. Production apps: navigation only, no writes.
- Do not change device settings (appearance, text size) without asking. When they are changed, restore them.
- Do not drive a mirrored device window in the foreground without telling the user first, because it takes over their screen.
- Keep the user informed between steps: who is reviewing what, and each lens result as it arrives.
