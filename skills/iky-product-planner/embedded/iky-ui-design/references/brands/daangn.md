---
id: daangn
name: 당근
status: text-verified
checked_at: 2026-09-05
---

# 당근

- Official source: [Reference page](https://about.daangn.com/).
- Optional pattern hints: service.search, service.listing, service.detail, service.community, chat.conversation.
- Status applies to the recorded source/observation, not to the entire service.

## Earlier evidence

The earlier company-site check established a public source, not the consumer listing/detail/conversation interface.

## Observed screen: consumer web home

- Source: [Daangn web home](https://www.daangn.com/kr/); inspected 2026-09-05.
- Surface: public desktop website, initial viewport at 1440 × 900 CSS pixels. [Capture](captures/daangn-home-20260905.png).
- Observed: an orange brand mark sits above a search-focused central region. A wide search field groups the service category and query with a submit control. Popular search links sit directly beneath it. A campaign banner and eight illustrated service shortcuts precede local stories.
- Useful for: a multi-service discovery screen where users arrive with different levels of intent.
- Borrow: pair a direct search path with visible category entry points; place query suggestions near the input.
- Do not borrow automatically: the category dropdown in the user's no-select review workspace, the promotional banner, or the exact imagery.
- Limits: search submission, geolocation, listing/detail interactions, and mobile behavior were not tested. The search tool could not retrieve this domain; the browser successfully displayed the public page.

Follow the [shared observation format](index.md#screen-observation-record) when adding evidence. Preserve dates and limitations. Do not fabricate measurements or reuse brand assets without the required rights.

## Research update: Loading pattern comparison, official design-system documentation

- Inspected: 2026-09-05 via Aside Browser MCP.
- Source: [Official page](https://seed-design.io/patterns/loading).
- Evidence: [Capture](captures/daangn-loading-20260905.png).
- Environment: Browser viewport capture, 2510 × 1812 image px; CSS viewport not measured.
- Observed: The page places Progress Circle, Progress Bar, and Skeleton in adjacent columns and uses shared rows for form, behavior, benefit, and timing. Text and supporting illustrations explain different scopes of loading. The guide distinguishes predictable content structure from bounded processes and unknown-duration work.
- Adaptation hypothesis: Use a shared-criteria table for alternatives; keep each column comparable. In products, use a skeleton when structure is predictable and local progress near the affected item when only that item is pending.
- Tradeoffs and exclusions: The documented timing bands are this system’s guidance, not universal thresholds. Do not fake determinate percentages or replace the whole page for a small pending operation. A documentation table is not proof of a consumer app’s exact layout.
- Limits: Clicked the Components anchor and inspected the comparison region. Did not run loading examples, simulate slow networking, or measure perceived wait time.
