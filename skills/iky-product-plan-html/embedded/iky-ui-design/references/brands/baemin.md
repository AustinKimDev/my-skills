---
id: baemin
name: 배민
status: text-verified
checked_at: 2026-09-05
---

# 배민

- Official source: [Reference page](https://techblog.woowahan.com/6305/).
- Optional pattern hints: dashboard.records, dashboard.editor, dashboard.overview, service.checkout.
- Status applies to the recorded source/observation, not to the entire service.

## Earlier evidence

The earlier text inspection read an official article about merchant self-service and its design system, including operating-hours and menu management. The article is historical (2021).

## Research hypothesis and limits

Investigate operator workflows, menu/product management, and reusable operational components. Treat the article as historical design rationale, not evidence of today's consumer app. Reuse the historical observations below for composition; inspect current operator screens only when the task requires their current visual details. Keep consumer, merchant, and brand-site references separate.

Follow the [shared observation format](index.md#screen-observation-record) when adding evidence. Preserve dates and limitations. Do not fabricate measurements or reuse brand assets without the required rights.

## Research update: Self-service dashboard and form illustrations, historical article

- Inspected: 2026-09-05 via Aside Browser MCP.
- Source: [Official page](https://techblog.woowahan.com/6305/).
- Evidence: [Capture](captures/baemin-selfservice-20260905.png).
- Environment: 1440 × 900 CSS px; device scale 2; source published 2021-10-20.
- Observed: The article pairs desktop and narrow representations of an operator dashboard and form. A dark navigation rail frames a light main area; task summaries and charts are grouped into repeated containers. The form illustration distinguishes step navigation, fields, help, and a final action; the narrow version stacks this information.
- Adaptation hypothesis: Use as historical evidence for domain-independent operator components and responsive task grouping. Separate view/edit state, shared validation behavior, and local help when composing unfamiliar operational tools.
- Tradeoffs and exclusions: Do not add KPI charts, cards, or sidebars merely to resemble a dashboard. Choose data representations from actual decisions. The small embedded images do not support exact spacing, font, or chart-value measurements.
- Limits: Historical official static images and article text, not the current merchant application. No operator login, edit, submission, responsive resize, or error recovery was tested.
