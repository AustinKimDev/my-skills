---
name: iky-cardnews-reels
description: Produce Instagram card-news carousels and Reels motion graphics that announce a product update - audit what actually shipped, write Korean copy, generate one full-bleed scene per card, render deterministic PNG cards and a beat-cut MP4 with a synthesized soundtrack, and verify the files. Use when the user asks for 카드뉴스, a carousel, a Reels/릴스 or motion-graphic video, or a social announcement of an update, patch or release. Not for posting, scheduling or account management.
---

# Card news and Reels for a product update

One pipeline, two deliverables. The carousel and the reel share verified facts, copy voice, typefaces and images; they do not share a layout. Keep the user's language for communication and product copy; keep code, prompts and records in English.

## Bundled support

Read [the dependency map](references/dependencies.md) when a step calls for another skill. The required guides are included in this folder; load only the relevant one and keep this workflow primary. Runtime tools (image generation, a browser, fonts, an encoder) come from the active environment.

## Order of authority

Explicit user direction and supplied reference images, then the project's own guides (asset guide, design notes, earlier promo folders), then the defaults in this skill. When the user shows a reference card, match its structure, not just its mood.

## Workflow

1. **Scope.** Establish what shipped from the code, not from the feature name: compare the release range, read the PR bodies, and check each claim against the shipping ref. Split by area when the release spans distinct surfaces (one carousel and one reel per area). List what cannot be verified (feature flags, store availability). See [scope and copy](references/scope-and-copy.md).
2. **Copy.** Write every card as keyword, gloss, one claim and one supporting fact, plus a caption that adds context. Run the copy through the Korean writing and naturalness checks in [scope and copy](references/scope-and-copy.md) before any rendering.
3. **Type and layout.** Set the type system first and render inside it. See [type and layout](references/type-and-layout.md).
4. **Scenes.** Generate one distinct full-bleed scene per card with the session's image backend, following the brief template and composition rules in [scenes](references/scenes.md). Place real product artwork into scenes by code.
5. **Cards.** Copy `assets/templates/cards/` into the project's design-artifact folder, fill the deck, export with `scripts/export-cards.mjs`, and inspect the contact sheet.
6. **Reel.** Copy `assets/templates/reel/`, map each feature to a choreography slot, render the soundtrack, capture frames, encode and mux. See [reels](references/reels.md).
7. **Verify and hand off.** Follow [verification](references/verification.md): read the encoded files back, state exactly what was inspected, and list the pre-publication checks.

Steps 4 and 6 are slow. Start image generation as soon as the copy is settled and build the renderers while it runs.

## Rules that came from rejected drafts

- **Copy.** Write sentences a person would say, in the product's register. Never invent a word to fill a layout slot. A bracketed gloss is a reading of the keyword, never a second fact. A claim describes the change ("we made X steadier"), not a state the team cannot guarantee ("X is stable").
- **Images.** One distinct image per card. Do not recycle one image set across the carousel and the reel unless the user asks. Generated images carry no text, people, logos or UI; anything that must be exact (product icons, prices, names) is drawn by code.
- **Type.** A title face for titles, a text face for sentences. A fixed scale, tracking that tightens with size, tabular figures for anything that counts, large lines aligned by their ink.
- **Reel.** It is not the carousel on a timeline. Cut to a beat grid, give each feature its own motion, and build the sound in from the start. End on the brand mark alone unless a wordmark asset exists.
- **Honesty.** Synthesized audio is measured, not heard: say so. Distinguish full-size inspection from a contact sheet. Generated scenes are not app screens: say so in the hand-off notes.

## Bundled files

- `scripts/export-server.mjs` serves a template folder and saves posted canvases; `export-cards.mjs` exports every card and a contact sheet.
- `scripts/capture.mjs`, `encode.swift`, `mux.swift`, `verify.swift`, `sheet.mjs` render frames, encode H.264, add the soundtrack and read the result back (macOS, no installs). `audio.mjs` and `bands.mjs` render and measure the soundtrack.
- `assets/templates/cards/` and `assets/templates/reel/` are working renderers with placeholder decks.

Headless Chromium comes from an existing Playwright cache; nothing is installed. Fonts load with `local()` from the machine and are never copied into a repository.

## Boundaries

This skill grants no permission to post, schedule, deploy, install dependencies or push. Publishing a preview page or a repository change follows the user's own authorization rules. Keep unverified release facts out of the artwork and in the pre-publication note.
