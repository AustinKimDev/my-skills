---
id: apple-music
name: Apple Music
status: visual-verified
checked_at: 2026-09-06
---

# Apple Music

Scope: signed-out Korean web player, inspected with Aside Browser MCP at 1440 × 900 CSS px, device scale 2. These observations do not establish native iPhone UI or playback behavior.

## Discovery: editorial cards followed by compact lists

- Source: [New music](https://music.apple.com/kr/new); [capture](captures/apple-music-discovery-20260906.png), 2026-09-06.
- Observed: left navigation separates search and destinations from account entry. A strong page title precedes a horizontal shelf of large editorial photographs. Category, title, and artist sit above each image; a short description overlays its bottom edge. Compact song rows below repeat thumbnail, title, artist, and overflow action across columns. Section headings expose deeper collections. An idle floating player and a separate trial banner occupy the bottom region.
- Hierarchy: large artwork supports discovery; smaller rows support scanning without giving every item hero weight. Artwork and selected/action accents carry most color against quiet surfaces.
- Borrow for: media libraries, creator discovery, classes, or interest-based services. Compare one curated shelf plus an ordinary list against an all-card feed. Keep price and availability visible when the service needs them, even though a music catalogue does not.
- Tradeoff: horizontal shelves hide remaining content; floating controls consume height. Test ordinary user uploads as well as polished promotional images. Keep opening an item distinguishable from its supplementary actions.
- Tested: opening an editorial album from discovery. Not tested: playback, search, authentication, keyboard traversal, mobile layout, native gestures, or performance.

## Album detail: identity above a repeated action list

- Source: [Album detail](https://music.apple.com/kr/album/milli-vs-the-world/6807337875); [capture](captures/apple-music-album-20260906.png), same date and environment.
- Observed: square cover artwork sits beside title, linked artist, muted metadata, description, and preview action. Rows below align sequence number, title, duration, and overflow menu. Thin separators replace individual card boxes. Navigation and the idle player remain present after entering the album.
- Borrow for: a creator or collection detail with comparable child items, lessons, episodes, or purchasable options. Align recurring numbers and metadata; distinguish parent-level and item-level actions.
- Avoid: track-specific semantics, branded artwork, exact color tokens, or persistent controls without a continuing task. This white web page is not evidence for universal dark gradients or glass cards across Apple Music.
- Limits: visual grouping was observed; playback continuity and focus restoration were not. Catalogue content can change.

## Comparison prompts

1. Should discovery begin with editorial guidance or the complete list?
2. Does the identity block leave room for the first useful item on a portrait screen?
3. Can title, secondary identity, price/duration, and actions remain distinct with long Korean text and ordinary images?

Combine with [Toss](toss.md) for value/action rows or [Naver](naver.md) for scoped discovery modules. Treat combinations as hypotheses, not proven performance gains.
