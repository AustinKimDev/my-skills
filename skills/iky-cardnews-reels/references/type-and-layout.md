# Type and layout

## Typefaces

Titles and numbers use a title face; sentences and labels use a text face. The defaults are Gmarket Sans (Medium and Bold) over Pretendard. Follow the project's brand faces when it has them, and the user's choice when they name one.

Load faces with `local()` so nothing is copied into a repository, and verify before every export that the title face really loaded (`document.fonts.check('700 88px D', '가')`); a silent fallback is the most common defect. Record in the project notes that exporting needs those fonts installed.

Gmarket Sans draws about 0.11em below its baseline. Place its lines with that in mind and keep mixed-face lines on one face.

## Scale

Carousel card, 1080x1350, 64px margins:

| Role | Face | Size | Tracking |
| --- | --- | --- | --- |
| Keyword | Title Bold | 204 | -0.04em |
| Gloss | Title Medium, uppercase when Latin | 36 | +0.08em |
| Claim | Title Medium | 58 | -0.03em |
| Detail | Text Medium | 30 | -0.01em |
| Counter, tag | Text / Title Bold | 24-31 | +0.04 to +0.06em |

Reel frame, 1080x1920, 72px margins:

| Role | Face | Size | Tracking |
| --- | --- | --- | --- |
| Hero (version number) | Title Bold | 280 | -0.04em |
| Display (key line) | Title Bold | 156 | -0.04em |
| Lead line | Title Medium | 88 | -0.03em |
| Title (units, closing line) | Title Medium | 60 | -0.03em |
| Body (chips, notes) | Text Medium | 44 | -0.01em |
| Label (pills, counters) | Text Bold | 32 | +0.03em |

Nothing is set outside the scale. If a line does not fit, shorten the copy before shrinking the type; the renderers shrink only as a guard.

## Details that separate a set from a draft

- Tracking tightens as size grows; small uppercase Latin opens up.
- Tracking is added between glyphs only. A trailing gap shifts centred and right-aligned text, so correct for it.
- Large lines are pulled back by their side bearing so their ink, not their box, sits on the margin. Measure the bearing with left alignment set; a leaked alignment from the previous call moves the line.
- Anything that counts (count-ups, item counters) uses tabular cells the width of a zero, with the first digit flush right so a leading 1 still starts on the margin.
- A headline is two tiers: a Medium lead line and a Bold key line in the accent colour. Both lines of every headline share the same two sizes.

## Card anatomy (reference-style layout)

- The scene fills the card edge to edge. The subject sits in the upper two thirds.
- A scrim starts around 56% of the height and reaches near-opaque by the keyword.
- Foot block: keyword with its gloss to the right on nearly the same baseline; claim below with an arrow running to the right margin (omit the arrow on the last card); detail below that.
- A small hanging tag top right (for example NEW and the version); the brand mark and the counter top left.
- Sticker shapes (burst, crescent, coil, four-point sparkle) in one accent colour around the subject. They may overlap the subject's edge but not its focal detail or the tag. Mirror them on alternate cards.

When the user supplies a reference card, rebuild this anatomy from it rather than adapting the previous layout.

## Reel frame

Keep text between y 230 and about 1540 to clear the Reels interface. The headline pair sits at the foot of the frame (lead baseline 1300, key baseline 1470) over the scene's floor; the section pill, counters, chips and gauges sit in the top zone. A solid-to-clear scrim over the top 480px turns a scene's dark ceiling strip into a clean header zone.
