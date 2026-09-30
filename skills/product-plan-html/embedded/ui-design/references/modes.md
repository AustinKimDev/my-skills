# Comparison modes

Screen purpose and comparison mode are independent. The same `service.detail` can be compared for overall direction, layout, or typography while retaining its content and primary action. Each manifest subject declares one decision and one question. These modes are useful defaults, not an exhaustive design vocabulary. A custom mode uses a stable lowercase/hyphen `mode` ID and a Korean `modeLabel`; explain what varies, what stays fixed, and how to inspect it. Do not create a custom mode when an existing one expresses the same decision.

| Mode | Decision | Compare | Build scope |
|---|---|---|---|
| `page` | Overall visual direction | Hierarchy, type, color, imagery, actions | The requested page and relevant states |
| `layout` | Spatial organization | Columns, order, navigation, fixed regions, density | Same content and styling, different arrangements |
| `wireframe` | Information and action structure | Required sections, reading order, action locations | Realistic copy, neutral shapes, little decoration |
| `prototype` | Connected behavior | Clicks, back, input retention, branches, completion, recovery | Agreed paths with working local interactions |
| `typography` | Reading experience | Typeface/system, leading, tracking, weight, wrapping | Same text and layout, different type systems |
| `component` | Isolated element or composition | Variants, sizes, states, keyboard, context | Only requested atoms, compositions, or sections |
| `color` | Semantic color/theme | Background, emphasis, status, contrast | Real screen excerpt plus palette |
| `assets` | Icon/image/illustration direction | Shape, stroke, crop, meaning, surrounding context | Isolated specimen and actual placement |
| `motion` | Interaction behavior | Timing, continuity, interruption, feedback | Replayable interactions and reduced-motion alternative |
| `states` | Loading/empty/error/success response | Explanation, next action, retry, recovery | Relevant region in meaningful states |

## Choose and connect modes

The agent chooses modes from the request, answers, and existing screen. The preview tool renders the manifest; it does not classify natural language. Use one mode per decision, and suggest 2–4 relevant detailed comparison types for a page exploration. Sequence them as decisions become clear; hold selected attributes fixed. Do not stop an entire exploration after one overall comparison when details remain unresolved, or show every available mode at once.

- “페이지 글씨만 바꿔줘” → typography; the fact that the target is a page does not also require page mode.
- “버튼 디자인 골라보자” → component, including its relevant states and context.
- “오류 안내와 복구 흐름을 비교하자” → states; this differs from merely toggling a component's error appearance.
- “브랜드 색”, “아이콘”, “열리고 닫히는 느낌” → color, assets, motion respectively.
- A page with unresolved hierarchy and type may proceed page → layout → typography → a key component. This is an example, not a mandatory pipeline.

New comparisons follow the five-alternative default (minimum four). Narrowing previously shown choices can use fewer. Clear small edits need no alternatives. Distinguish changes to the review tool itself from the product UI displayed inside it.

## Component workbench

Reuse an existing Storybook if appropriate; do not install it merely for comparison. Otherwise one preview subject serves as one story.

- Atoms: buttons, icon buttons, inputs, checkboxes, labels, badges.
- Compositions: search and filters, profile rows, amount/status, field/error pairs.
- Sections: cards, headers, navigation, product summary, chat composer, table toolbar.
- Declare only implemented sizes and meaningful states: default, selected, disabled, loading, error, long content, etc.
- Provide isolated viewing and `contextUrl` when surrounding layout affects the decision. Do not duplicate an entire page to compare one button.
- Apply the chosen component to existing project tokens and verify its actual callers/screens. Do not decompose an entire design system without scope.

## Typography specimens

Use identical Korean headings, paragraphs, long list titles, buttons, error copy, prices/dates, and mixed Korean/English samples. Include an excerpt from the actual target page.

Example samples: “오늘 필요한 일을 한곳에서”, “선택한 내용을 확인한 뒤 다음 단계로 이동해 주세요.”, “결제 금액 128,500원”, “2026.09.05 · Open 09:00”, “다시 시도”, “주소를 입력해 주세요.”

Offer five type systems by default, minimum four. Use actually installed/loaded fonts and label fallback fonts. Vary weight, leading, heading hierarchy, or numeric treatment meaningfully; changing font names without changing rendering is not an alternative. Respect confirmed font-size constraints. Check narrow-screen wrapping, enlarged text, and numeric alignment.

## Prototype connections

Use stable subject IDs. A static preview can navigate with `parent.postMessage({type:'ui-design:navigate', subject:'checkout'}, '*')`. Define only agreed destinations. Distinguish in-frame back navigation from the tool's subject selector. Preserve required input through frame session state or explicit parent messaging, using synthetic data.

Layout compares arrangement; wireframe compares the presence and order of information/actions. If both answer the same question, use one rather than producing duplicate comparisons.
