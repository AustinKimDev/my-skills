# Interaction and motion contract

## Separate responsibilities

| Concern | Reference implementation | Adaptation |
|---|---|---|
| Content and structure | Astro HTML | Preserve the existing framework |
| Layout and simple hover | CSS Modules | Preserve project styling conventions |
| Springs, entry, ambient loops | Motion vanilla APIs | Reuse installed tooling; additions require applicable approval |
| Wheel/anchor interpolation | Lenis | Optional, never required for native touch or content |
| Chapters and responsive state | TypeScript controllers | One owner per state/property |

Avoid multiple controllers writing the same transform. Separate outer entry,
inner ambient and card tilt layers, or assign distinct properties. When a card
already has scroll parallax, animate a content switch on an inner wrapper;
reverting the switch must not reset the parallax. Do not
continuously mutate inherited custom properties on a large subtree for one
moving element.

## Feature selection

Start with anchors to readable sections. After initialization, enhance to a
tablist, connect tabs/panels with IDs and use roving `tabindex`.

- Left/Right wrap; Home/End select edges. Keyboard selection is immediate.
- Size pointer transitions to the panel's travel and how often visitors switch
  (Yumeit's tabs: about 180–280ms). Cancel prior panel animations;
  hidden panels must not retain running animation or focusable descendants.
- Keep focus on an explicitly selected tab. Scroll-driven selection must not
  steal focus or hide a focused control. Defer the change when needed or retain
  a visible focus destination.
- Measure the selected tab's rectangle after responsive changes. Use an
  interruptible spring, preserving velocity where supported. Reduced motion
  writes final geometry directly.
- Chapter progress updates immediately for manual selection. Reading progress
  is separate and may have its own damped spring.
- Do not auto-advance chapters on a timer.

For swipe, use `touch-action: pan-y pinch-zoom`. Recognize horizontal intent only
after sufficient movement; cancel for vertical intent, a second touch, pointer
cancellation or lost capture. Do not start from a form control. Clear temporary
drag offsets on every completion/cancellation path. Preserve vertical scrolling
and pinch zoom.

## Demo choices

A demo with one-of-many choices (content type, date, plan) is a native radio
group: visually hidden inputs inside styled labels, a hidden legend and the
default choice checked in the initial HTML. Arrow keys, focus order and no-JS
reading then work without custom code. Show focus on the label with
`:has(:focus-visible)`. A choice updates the sample card and a polite live region;
replace any running switch animation so the last choice wins.

Horizontal example rails on narrow screens get position controls that follow
the nearest-to-center item during swipes and scroll to an item on activation
(instant under reduced motion). Hide them where every item is already visible.

## Desktop pinning is conditional

Measure the entire scene after fonts/media settle and when layout changes. If
it cannot fit, use ordinary tabs without a spacer. Width alone does not prove fit.

The reference uses this starting rule for its three chapters:

```text
enabled = width > 700 and not reducedMotion
          and 16 <= (viewportHeight - measuredSceneHeight - 20)
          <= min(200, viewportHeight * 0.20)
travel  = clamp(viewportHeight * 1.65, 960, 1800)
chapter = progress < 0.38 ? 0 : progress < 0.74 ? 1 : 2
```

Recompute dwell/travel for another chapter count and measured content. The upper
spare-space bound prevents a conspicuous empty spacer in tall viewports; an
oversized scene also disables pinning.

Below the width where the measured scene stops fitting (Yumeit: 700px), use
normal flow and manual tabs/swipes. Differing mobile card
heights must not toggle a spacer or jump the page. Reduced motion also removes
pinning. Avoid resize/scroll feedback loops; batch reads/writes in one frame.

Do not intercept wheel events to force chapter steps. If manual selection moves
a pinned scene, coordinate it with scroll selection so stale progress cannot
overwrite the choice. Outside the pinned scene, a tab must not relocate the page.

## Responsive explanation disclosures

Map stable explanation/card keys and leave placeholders at desktop card positions.
On mobile, move each existing card beneath its description; restore it to its
placeholder on desktop. Do not clone interactive DOM.

Preserve the active element and values before a move. If focus is inside a card,
open that mobile row. Restore focus with `preventScroll` after the destination
is visible. Before hiding a focused subtree, focus its disclosure button.

Buttons expose `aria-expanded` and correct `aria-controls`. Only the open mobile
description/example is interactive. All original content remains readable before
enhancement. Desktop explanations remain readable together.

For animated disclosure: capture rendered height, cancel prior motion, compute
the target layout, then animate from the captured value. Bound the duration to
the content height and the product's existing motion feel (Yumeit: 280ms ease-out
for an occasional action). Keep closing content
rendered but inert until completion; then hide it and clear temporary styles.
Use an operation identity so stale completion cannot override a newer choice.
Reduced motion, hidden documents and breakpoint changes settle to the latest state.

Highlights use a lift, border or shadow scaled to the card and its neighbours
(Yumeit: about 4px over 260ms). Keep z-order fixed;
a small badge must not jump above a time selector. Do not change text padding.

## Ambient motion and pause

Add ambient loops only when the composition gains from them; Yumeit floats
decorative wrappers, rotates orbit motifs and repeats a word strip. Keep loops subordinate to reading. Register loops with one controller
and an IntersectionObserver.

```text
reduced motion -> cancel spatial motion; restore readable static state
document hidden or user paused or offscreen -> pause
otherwise -> resume
```

Provide a visible labelled pause control with honest pressed state. Pausing
decoration keeps functional controls usable; reduced motion additionally removes
tilt, spatial entrances, pinning and smooth interpolation. Listen for live
preference changes. Clean up controllers/listeners on unmount or page exit;
revisiting must not create duplicate loops.

For a seamless strip, repeat two equal-width groups, each at least a viewport
wide, and translate by exactly one group's measured width. Hide the duplicate
from assistive technology and keep copies noninteractive. Clip the strip rather
than hiding document overflow to disguise layout errors.

## Smooth scrolling and navigation

Lenis is optional. Yumeit's settings, for calibration only, are `lerp: .12`, `smoothWheel: true`,
`syncTouch: false`, `autoRaf: true`, `stopInertiaOnNavigate: true`. Confirm support
against the installed version before adopting them elsewhere.

Only handle unmodified primary clicks on same-origin, same-path anchors. Preserve
downloads, external targets, query changes, modifier clicks and history. Update
the fragment and focus its destination without a second scroll. Skip links stay
immediate. Disable competing CSS smoothing while a library owns interpolation.
Destroy it for reduced motion/hidden pages; restore it appropriately. Verify
back/forward and deep links.

Mobile menus close on destination selection, Escape, outside pointer and focus
leaving. Restore visible focus, including when a breakpoint hides the trigger
before its listener runs. Original navigation remains available without JS.

## Acceptance probes

| Situation | Evidence |
|---|---|
| 320/390px cards of different heights | No document overflow; chapter choice does not jump `scrollY` |
| Short, ordinary and tall desktop | Pinning only when measured fit is valid; no empty dead region |
| Rapid tab/disclosure changes | Last choice wins; no hidden running transition or stale completion |
| Focus inside moved booking/checklist card | Values and visible focus survive both breakpoint directions |
| Keyboard chapters/menu/disclosures | Correct order, selection, dismissal and immediate response |
| Reduced motion enabled mid-animation | Spatial motion stops; latest state stays readable |
| Pause, offscreen and hidden page | Ambient position pauses/resumes; content does not auto-advance |
| JavaScript unavailable | Navigation, core explanations and default demo states remain readable |
| Demo choice with smooth scrolling | After the scroll settles, pointer and arrow-key choices leave `scrollY` unchanged |
| Narrow rail | Position controls track swipes and select items; hidden on wide layouts |
| Conversion failure/retry | Actual outcome; no simulated success or duplicate submission |

These are reusable probes, not claims that a particular output passed.
