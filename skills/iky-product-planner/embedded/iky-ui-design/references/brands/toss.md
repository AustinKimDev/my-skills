---
id: toss
name: 토스
status: text-verified
checked_at: 2026-09-05
---

# 토스

- Official source: [Reference page](https://business.toss.im/).
- Optional pattern hints: landing.product, service.form, service.checkout.
- Status applies to the recorded source/observation, not to the entire service.

## Earlier evidence

The earlier text inspection found distinct advertising, payment, and commerce propositions with entry actions. This does not establish the consumer banking application flow.

## Observed screen: Toss Business landing

- Source: [Toss Business](https://business.toss.im/); inspected 2026-09-05.
- Surface: public desktop website, initial viewport at 1440 × 900 CSS pixels. [Capture](captures/toss-business-20260905.png).
- Observed: a horizontal white navigation bar separates service links from account actions. A wide photographic hero centers a large two-line Korean proposition, supporting copy, and a blue login action. The following section begins with a centered heading and generous whitespace.
- Useful for: a service introduction with one clear starting action and a short proposition.
- Borrow: clear separation of navigation and primary entry action; a readable headline/support/action hierarchy.
- Do not borrow automatically: a tall photo hero for data-heavy operations, its exact copy, logo, brand color, or business statistics.
- Limits: initial desktop view only; mobile layout, authentication, conversion performance, and animation behavior were not tested.

## Additional component evidence

[TDS Mobile documentation](https://tossmini-docs.toss.im/tds-mobile/) was read on 2026-09-05. It documents foundations and components including Typography, Button, BottomCTA, ListRow, and TextField. Reuse the saved ListRow observation and capture below. Other component names are discovery hints, not verified visual examples; consult additional examples only when their missing details are material to the task. Documentation access does not authorize dependency installation.

Follow the [shared observation format](index.md#screen-observation-record) when adding evidence. Preserve dates and limitations. Do not fabricate measurements or reuse brand assets without the required rights.

## Research update: ListRow composition, official native-component illustration

- Inspected: 2026-09-05 via Aside Browser MCP.
- Source: [Official page](https://tossmini-docs.toss.im/tds-react-native/components/list-row/).
- Evidence: [Capture](captures/toss-listrow-20260905.png).
- Environment: 1440 × 900 CSS px; device scale 2.
- Observed: The official illustration groups card information and management options into repeated rows. Leading icons identify content; the center holds the label and secondary text; the trailing region changes between a value, button, switch, or navigation arrow. Section headings and blank bands separate tasks without making every row a standalone card. The documentation explicitly describes multiline content and independent left/right alignment.
- Adaptation hypothesis: Use for settings, transaction rows, account summaries, or mixed text/action lists. Compose leading/content/trailing regions according to their roles instead of copying one fixed row. Compare top-aligned long content against centered short rows.
- Tradeoffs and exclusions: A whole-row navigation affordance must not obscure an embedded toggle or second action. Long values compete with labels at narrow widths. Do not copy financial content, native dimensions, typography tokens, or motion without checking the target platform.
- Limits: Visual evidence is an official static illustration; code examples were read, not executed on a native device. Keyboard, touch, screen reader behavior, and blink/shine effects are untested.
