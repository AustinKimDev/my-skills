---
name: interactive-landing
description: This skill should be used when the user asks to build, refine or polish the interactions of a product introduction website in the Yumeit landing style, or names interactive-landing — for example "유메잇 스타일 랜딩", "유메잇처럼 인터랙티브한 소개 페이지", "랜딩 인터랙션 다듬어줘" with this skill, or "scroll-led feature chapters with live UI cards". It composes editorial chapters, live HTML demo cards, mobile disclosures and pausable motion while keeping the product's own brand tokens and buttons. Not for app screens, generic marketing pages without this direction, or other named styles.
---

# Interactive Landing

Turn a product story into a readable, tactile introduction website. The reference
is [Yumeit's public landing page](https://yumeit.me/#experience): editorial
composition, large Korean type, live HTML product cards and motion that helps
visitors explore. Reuse its composition and interaction logic. The product's
brand, theme support, subject matter and capability claims come from the product,
not from the reference.

## Establish the brief

Identify the audience, product promise, confirmed capabilities, release state,
primary conversion and existing stack from available context. Reuse supplied
decisions. Ask only about a missing choice that materially changes the result;
do not start a new design interview for a bounded refinement.

Before composing, inventory the product's identity: its design document, theme
and CSS variables, logo, licensed fonts, light/dark/system support and the
component that renders its primary button. These are the palette and control
source. A separate introduction website does not authorize redesigning the app.

Read [design-system.md](references/design-system.md) for page composition and
visual hierarchy. Read [interaction-contract.md](references/interaction-contract.md)
before implementing chapters, demos, disclosures or motion. Use
[source-reference.md](references/source-reference.md) only when close fidelity to
Yumeit itself matters.

## Compose a product story

Use this as a flexible sequence, not a required section count:

1. One strong promise, a supporting sentence, a real destination and a focused
   product/editorial composition in the hero.
2. A brief statement of the customer's situation before showing capabilities.
3. Two to four feature chapters, each pairing a benefit with one readable demo.
4. Deeper explanations linked to matching UI cards; audience and journey sections
   only when the product has distinct audiences or a multi-step path.
5. Specific FAQs and the actual next step: signup, contact, download or an honest
   prelaunch status. Keep long policies on quiet reading pages.

Make each illustration demonstrate its adjacent text. Prefer authored HTML/CSS
post, calendar, checklist, booking, message or transaction cards to tiny phone
screenshots. Text and controls remain live.

Render every call to action with the product's button component or its exact
tokens (color, radius, height, weight, focus ring) and the app's wording for the
same action. One primary style per page; secondary actions use the product's
secondary variant.

Local demo controls change only the preview. Do not imply that choosing a time or
saving a post changes an account. Mark sample people and listings as examples
once per chapter where it matters; avoid repeating disclaimers or instructions.

## Set up each component for its context

There is no component kit or default motion profile. For every hero visual,
chapter, demo card, rail, disclosure and CTA, decide its layout, interaction and
motion from what it has to do:

- **Layout** from its content and length, the reading order around it, the
  available width and how dense the neighbouring sections are.
- **Interaction** from the action it demonstrates and the input environment:
  pointer or touch, keyboard path, how often visitors repeat it, and what must
  still work without JavaScript.
- **Motion** from what changes and why: travel distance, element size, frequency
  and whether the change can be interrupted. Frequent small state changes stay
  short and quiet; occasional reveals may take longer; idle decoration needs a
  reason and a pause. Choose easing or a spring by the feel the product already
  uses, not by a preset.

Keep the product's existing tokens, components and motion language as the
starting point, and note the reason for each new choice in one line. Values in
the references record what Yumeit chose for its own content; use them to
calibrate, never as settings to copy.

## Refine an existing landing

When the request is to polish interactions ("인터랙션 다듬기"), keep the approved
composition, copy, brand and stack. Audit before adding motion:

- Find illustrations that only decorate but could demonstrate their copy, such as
  static chips, dates or tabs. Make two to four of them tangible.
- Use native controls for demo choices: a radio group for one-of-many gives arrow
  keys, form semantics and a readable no-JavaScript default without custom
  keyboard code. Style the label; keep a visible focus ring on it.
- Give scrollable rails a position affordance on narrow screens (dots or
  previous/next) that tracks swipes; hide it where the rail does not scroll.
- Check fixed-height demo frames at 320–390px; let them grow instead of clipping.
- Add motion to the change itself, not to idle decoration, and only on layers no
  other controller animates (see the transform ownership rule). Size each motion
  to that component as described above.

## Implement with progressive enhancement

- Keep the existing framework and animation library. Astro with CSS Modules and
  vanilla TypeScript is the reference, not a migration target. Adding packages
  follows the session's dependency authorization; this skill grants none.
- Map each `--landing-*` role in [landing-tokens.css](assets/landing-tokens.css)
  to an existing product token. Use its Yumeit fallbacks only for Yumeit or a
  product with no brand yet, and say so. Do not add color literals the product
  does not define. Follow the product's theme support.
- Put readable semantic content and working anchors in the initial HTML. Add tab
  roles, hidden panels, pinning and enhanced controls only after initialization.
- Establish layout and interactions before decoration. Prefer one signature scene.
- Performance: keep the hero's largest image eager with explicit dimensions and
  lazy-load the rest; animate `transform`/`opacity` (plus bounded disclosure
  height); avoid broad `will-change`; do not regress LCP or layout shift.
- Accessibility: one `h1` and an ordered outline, `lang`, alt text for informative
  images and empty alt for decoration, 44px targets, and a pause control for any
  motion lasting over five seconds.
- Reuse licensed local fonts/assets. Do not rasterize functional text or controls.

## Preserve the defining behavior

Desktop may use a measured sticky feature scene with manual tabs and a chapter
progress line; mobile uses ordinary tabs/swipes and natural scrolling with no
sticky spacer. Deeper explanations become single-open mobile disclosures that
move the existing card, preserving its values and focus.

Never advance chapters on a timer; scroll-driven selection on desktop is allowed.
Continuous motion needs a visible pause, offscreen/hidden-page suspension and
reduced-motion handling. Rejected reference patterns are listed in
[source-reference.md](references/source-reference.md#superseded-directions).

## Verify the changed outcome

Render 320 and 390px, one pixel either side of each breakpoint the layout
actually uses, a tablet width, and short and normal desktop heights (for example
1280×720 and 1440×900) so measured pinning is exercised. If the session browser cannot
emulate a viewport faithfully (tiled or missing content), capture with a real
headless viewport and say which tool produced each result.

- Exercise changed controls with pointer and keyboard, rapid changes, reduced
  motion, pause/resume and no-JavaScript reading.
- With smooth-scroll libraries, settle on an exact scroll position before
  measuring page jumps; interpolation otherwise reads as a false jump.
- Compare each CTA beside the app's button, search changed CSS for unmapped color
  literals and check text contrast on brand surfaces.
- Copy-only edits need one render per breakpoint; interaction changes need the
  probe table in the interaction contract. Run relevant build/type checks.

A tool receipt or synthetic event does not prove physical-device behavior; report
unavailable checks. For a real conversion form, verify validation, pending state,
actual success, failure/retry and cancellation. Website work does not authorize
publishing legal drafts, deployment, Git push, analytics or auth changes.
