---
id: yogiyo
name: 요기요
status: text-verified
checked_at: 2026-09-05
---

# 요기요

- Official source: [Reference page](https://www.yogiyo.co.kr/mobile/).
- Optional pattern hints: service.search, service.listing, service.detail, service.checkout.
- Status applies to the recorded source/observation, not to the entire service.

## Earlier evidence

The earlier inspection established public mobile-web text access. Location/session-dependent order screens were not visually or behaviorally verified.

## Research hypothesis and limits

Investigate restaurant/menu discovery, order-condition comparison, and checkout. Record the location/session assumptions when inspecting a screen. Do not change addresses, sign in, or place an order to obtain evidence without applicable authorization. No capture was available in that earlier check; see the update below.

Follow the [shared observation format](index.md#screen-observation-record) when adding evidence. Preserve dates and limitations. Do not fabricate measurements or reuse brand assets without the required rights.

## Research update: Public food discovery before location entry

- Inspected: 2026-09-05 via Aside Browser MCP.
- Source: [Official page](https://www.yogiyo.co.kr/mobile/).
- Evidence: [Capture](captures/yogiyo-discovery-20260905.png).
- Environment: 1440 × 900 CSS px; device scale 2; /mobile/ route rendered at desktop width.
- Observed: A colored masthead separates the account entry from a photographic introduction. The location search groups its prompt, editable field, and submission control. Below it, food categories use consistent text positions and bottom/right image crops in a regular multi-column grid. Location entry has greater initial prominence than restaurant-specific information.
- Adaptation hypothesis: Use for exploration that depends on a user-supplied context such as area or delivery range. Place that context input near the reason it matters, and offer visually recognizable category entry points.
- Tradeoffs and exclusions: Do not require private location before it is necessary or replace text labels with photography alone. The large category tiles use substantial space and are unsuitable for dense expert comparison. Do not infer restaurant ranking or checkout from this homepage.
- Limits: No address entered, geolocation requested, login, search submission, or order performed. Mobile viewport behavior and location-specific listing/detail conditions remain unverified despite the route name.
