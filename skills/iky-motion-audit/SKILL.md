---
name: iky-motion-audit
description: Check that an implemented frontend has appropriate animation — screen transitions, overlays, feedback, list and state changes — that is consistent, performant, interruptible, and respects reduced motion, using the iky-screen-flow catalog as the list of interactions to cover. Produces a findings table with locations and recommended values. Use for "애니메이션 제대로 들어갔는지 확인", "모션 점검", or before launch. Reports by default; fixes only when asked.
---

# IKY Motion Audit

## Bundled support

Read [the dependency map](references/dependencies.md) when a step calls for another skill. The required guides and resources are included in this folder; load only the relevant support and keep this workflow primary. Resolve a supporting guide's scripts and assets from its own directory. Runtime tools and project packages still come from the active environment.

Check that motion explains what changed, without slowing people down. Missing motion and excessive motion are both findings.

## Inputs

- Frontend source and the running app.
- `output/screen-flow/flow.json`: transitions and overlays define which interactions need motion.
- The project's design rules (`DESIGN.md`, IKY guides, motion tokens). The project's existing motion values win over generic advice.

## Inventory

1. Find the animation code: the libraries in use, shared transition helpers, motion tokens, and one-off animations.
2. List the interactions to cover from the catalog and the UI: navigation (push, pop, tab switch), modals, sheets, drawers, popovers, toasts, press and hover feedback, toggles and selection, list insert/remove/reorder, loading → content, success and error feedback.
3. Map each interaction to its implementation, or mark it as having none.

## Check each interaction

- **Presence:** state changes that would otherwise jump (overlays, inserted content, navigation) have motion; trivial changes do not get decorative motion.
- **Consistency:** durations and easing come from shared tokens or helpers; similar interactions behave the same; enter and exit pair up.
- **Responsiveness:** press feedback is immediate; motion never blocks input; animations can be interrupted (a sheet dragged mid-animation, a quick back press).
- **Performance:** animate transform and opacity rather than layout properties; no layout shift or jank on a mid-range device; native-driver or equivalent where the platform supports it.
- **Accessibility:** reduced-motion preference is honored with a non-motion alternative; nothing flashes; focus moves correctly with overlays.

Observe the behavior in the running app following the [bundled browser runtime guide](embedded/browser-runtime/GUIDE.md) (or a simulator or device for native apps) — reading code alone does not show timing or jank. Say which platforms were not observed.

## Recommend

Recommend values from the project's tokens first. When the project lacks a suitable tool or pattern, use the [bundled iky-recommend-animate](embedded/iky-recommend-animate/GUIDE.md) guidance; adding an animation dependency needs the user's approval.

## Output

Write `docs/qa/motion-audit.md` with a findings table — interaction, screen ID, location (`file:line`), issue (missing / excessive / inconsistent / janky / no reduced-motion), severity, and recommendation — plus the coverage list. When fixes were requested, apply them within scope and re-observe the changed interactions.

Next: `iky-website-launch-readiness`.
