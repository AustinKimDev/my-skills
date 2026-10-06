# Visual and content recipe

## Art direction

Aim for an editorial product story with depth, not a wall of uniform feature
boxes. Yumeit expresses this with a near-black canvas, restrained layered
surfaces, hairline borders, large tight headings and one luminous accent. Carry
the hierarchy, not the palette: a light or pink product keeps its own canvas,
brand color and theme modes. Contrast can come from one
light/accent section rather than competing gradients. Orbital lines and a small
recurring brand motif support the product composition without taking over.

The reference's Web3 influence is visual only. It does not imply wallets, tokens,
crypto economics, invented traction or exaggerated availability.

| Role | Yumeit value (replace with the product token) | Use |
|---|---|---|
| Canvas | `#0b0b10` | Page background |
| Surface / card | `#111119` / `#171720` | Subtle depth |
| Primary text | `#f9fafb` | Titles and main copy |
| Secondary text | `#a1a1aa` | Supporting copy on dark surfaces |
| Brand / accent | `#6552e8` / `#b4a8ff` | Primary action / selected controls |
| Border | `#ffffff20` | Quiet division |
| Reading width | `1200px` | Maximum desktop composition |

These are Yumeit's values, not defaults for another product or a claim that all
pairings pass contrast. Map each role to the product's existing token; where the
product uses a deeper shade of its brand color for white-text buttons, keep it. Check actual foreground/background pairs, especially
text on accent surfaces and muted text over photos.

## Type and rhythm

Yumeit's scale below calibrates proportion; derive the destination's sizes from
its own type system, headline length and layout.

The reference serves Pretendard locally in real 400/500/600/700 weights. Keep the
destination's licensed font choice unless a deliberate type change is requested.
The bundled token file does not load a font.

- Hero: 52–92px desktop, about 40–60px mobile; line height near 1.13, tracking
  around -0.04em. Rebalance for the actual language and headline.
- Section title: about 32–56px desktop, 28px mobile; line height 1.3.
- Feature title: about 30–44px desktop, 25px mobile.
- Description: about 15–16px desktop, 14px mobile; line height 1.75–1.9. Do not
  shrink essential card text to fit an oversized composition.
- Gutters: about 32px desktop, 20–24px mobile. Let mobile cards fill the reading
  width instead of retaining desktop stage gutters.

Use `word-break: keep-all` for Korean prose with a fallback for unbroken strings.
Balance headings and pretty-wrap short descriptions where supported. Intentional
desktop line breaks must not cause single-word mobile lines or overflow. Avoid
synthetic font weights.

## Hero

Pair the headline with one legible focal composition: a square editorial image
inside a card, an authored product object or relevant layered UI. Perspective,
border, shadow and one floating tag create depth. Separate wrappers own entry,
float and pointer tilt so effects do not overwrite each other.

On mobile, stack naturally and size the visual deliberately. Avoid a huge empty
stage before visitors understand the product. Keep the primary action and release
status near the promise.

## Feature chapters

Each chapter needs a distinct benefit and a concrete demonstration the visitor
can operate: choosing a chip, date or option changes the sample card. The reference
uses a photo post, a recruitment/team card and a schedule/checklist. Adapt these
to the target product; do not carry over cosplay copy or brand assets by default.

Yumeit pairs desktop copy with a substantial card and uses left-aligned copy,
full-width cards and compact tabs on mobile. Choose each chapter's arrangement
from its demo's size and interaction instead of repeating one layout. Keep 44px minimum targets, visible focus and
selected states beyond color alone. Do not hide essential functions behind hover.
One selection model drives tabs, panel, progress and next-chapter control.

## Explanation plus matching example

Desktop explanations and cards may form an asymmetric composition. Hovering,
focusing or activating a row highlights the matching card and vice versa. Keep
stacking order fixed; scale the lift, border or shadow to the card. Do not alter
padding or move explanation text.

On mobile, put each example directly below its explanation in a disclosure.
The first example starts open; opening another closes it. An already-open item
may close. Move the same DOM card so checkbox/time/button state survives; restore
its original desktop position when the viewport grows.

Audience cards may use a horizontal scroll-snap row with a partial next card.
Intentional region overflow must not cause document overflow. FAQs are independent
native disclosures with visible spacing even when several are open.

## Imagery

Use images for identity, atmosphere or the object discussed; HTML for interface
content. Vary photos across sections. Do not reuse the hero in every post,
profile and activity. Match captions, preserve faces in responsive crops and use
optimized local derivatives.

For generated editorial imagery, request natural material texture and coherent
light. Avoid waxy skin, artificial metal sheen and baked-in text. Mark sample
listings and people as examples. Keep project asset provenance
outside the public interface when the project maintains it.

## Copy and conversion

Lead with what visitors can do and why it matters. Korean copy is concrete,
short and natural. Use destination labels such as the next chapter's name instead
of instructions telling people to scroll, click or inspect the interface.

Only show a download, contact, booking or signup action when its path exists.
Use honest prelaunch wording; do not invent counts, reviews, launch dates or live
availability. Required consent starts unchecked. Preserve authoritative policy
sources and draft status until publication is separately authorized.
