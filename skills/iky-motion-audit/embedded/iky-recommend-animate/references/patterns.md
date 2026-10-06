# Selection and Combination Patterns

Use this file after the effect has been classified. Keep one owner per animation concern.

## Selection Logic

1. Apply the hard exclusions in `catalog.md`: license, rendering/browser fit, accessibility, ownership, and runtime budget.
2. Choose the highest rung that fully covers the behavior: CSS → native API → installed dependency → new general engine → specialist runtime.
3. If two candidates survive, prefer in order: already installed, smaller responsibility surface, better framework lifecycle fit, lower runtime/asset cost, stronger current maintenance.
4. Add a second tool only when it owns a non-overlapping concern. Name that concern in one phrase.
5. Prototype the riskiest effect first with production content and a target mobile device. Stop expanding if it does not improve comprehension, confidence, or conversion.

## Ownership Matrix

| Pattern | Primary owner | Optional specialist | Do not duplicate |
|---|---|---|---|
| React SaaS UI | Motion | Rive or AutoAnimate for a distinct asset/list case | GSAP for ordinary component enter/exit |
| Scroll-led campaign | GSAP + ScrollTrigger | Lenis only for an explicitly approved scroll feel | Motion scroll values, CSS scroll timelines for the same section |
| Native lightweight landing | CSS + View/Scroll-driven APIs | WAAPI for imperative playback | General JS engine without a missing capability |
| Designer-owned 3D hero | Spline or Unicorn Studio | Motion/GSAP for surrounding DOM only | R3F/Three.js for the same scene |
| Code-owned React 3D | R3F + Three.js | Drei helpers; Theatre.js only for visual timeline authoring | Spline for the same scene graph |
| Interactive vector UI | Rive | Motion for surrounding DOM | Lottie for the same asset state machine |
| Linear motion graphics | Lottie/dotLottie | DOM engine for layout around it | Rive unless runtime state is required |
| 2D interactive canvas | PixiJS | GSAP/Anime.js may drive exposed values | p5.js for the same production renderer |
| Physics play | Matter.js | PixiJS when many sprites need rendering | Hand-built collision/tween system |
| Server-rendered page transitions | View Transitions first; otherwise Swup | GSAP/Anime.js for transition visuals | Barba unless custom lifecycle control is the reason |
| Programmatic video | Remotion | Existing asset runtimes only when render-safe | Browser landing animation stack as the render architecture |

## Useful Combinations

### Motion only

Use for React/Next.js component state, layout, gestures, modal exit, shared layout, and small scroll-linked transforms. Keep animation components as narrow client islands; server-render content and data above them.

### GSAP + ScrollTrigger

Use for pinned product walkthroughs, long timelines, text/SVG sequences, or scrubbed storytelling. Register plugins once, scope selectors, use `gsap.context()`, revert on unmount, and replace pin/scrub with an immediate or short reveal under reduced motion.

### GSAP + Lenis

Use only when both scroll feel and scroll choreography are requirements. Feed Lenis updates into ScrollTrigger, use one RAF ownership model, and destroy both integrations on navigation/unmount. Test keyboard scrolling, anchor links, browser find, back/forward restoration, touch, and reduced motion.

### Motion + GSAP

Use only with a visible boundary:

- Motion owns React component state, layout, gestures, and enter/exit.
- GSAP owns one isolated imperative timeline or ScrollTrigger sequence.
- Never animate the same property on the same element from both engines.

### R3F + Motion

Use R3F for the scene and Motion for surrounding DOM. If Motion drives Three.js object values, keep a single source of truth and avoid React state updates every frame. Lazy load the canvas, cap device pixel ratio, dispose assets, and show an image fallback.

### R3F + Theatre.js

Use when a motion designer must visually choreograph a code-owned 3D scene. Ship `@theatre/core`; keep Studio out of the production bundle. Confirm the current Theatre release and license split before adoption.

### Rive + DOM engine

Rive owns the `.riv` state machine; Motion or GSAP owns surrounding DOM. Pass semantic state changes into Rive instead of mirroring a second timeline. Provide an accessible label/control outside the canvas.

### Lottie/dotLottie + DOM engine

The Lottie player owns authored playback; the DOM engine owns layout. Load only on demand, stop offscreen playback, show the final/static frame for reduced motion, and verify the animation asset license separately from the player.

### Swup + GSAP or Anime.js

Swup owns fetching, history, container replacement, and lifecycle. The animation engine owns only leave/enter visuals. Reinitialize and destroy page-specific observers, canvases, timelines, and analytics on each navigation.

## Next.js and RSC Rules

- Keep semantic copy, links, images, and layout server-rendered when possible.
- Put DOM measurement, RAF, canvas, WebGL, WASM, and animation hooks behind the smallest `'use client'` boundary.
- Use dynamic import for heavy scenes and below-the-fold specialists; do not hide primary LCP content behind client initialization.
- Avoid hydration-dependent initial visibility such as server-rendering content at `opacity: 0`. Prefer visible HTML, then enhance after hydration, or use a no-JS-safe CSS class strategy.
- Tear down timelines, observers, event handlers, players, RAF callbacks, renderers, textures, and smooth-scroll instances on unmount/navigation.
- Do not call a package “RSC compatible” until the chosen import path is server-safe and the interactive runtime is isolated.

## Accessibility and Performance Gate

Before accepting the recommendation, verify:

- `prefers-reduced-motion` produces a complete, understandable experience, not merely slower motion.
- Hover effects also work with focus and touch; canvas/Rive interactions have DOM labels and keyboard alternatives.
- Page transitions restore logical focus, announce navigation where needed, preserve history, and do not trap forms.
- Text splitting retains coherent screen-reader output and reverts cleanly.
- Nothing essential depends on autoplay, animation completion, or a canvas-only label.
- Continuous work pauses when offscreen or hidden; mobile DPR/object/particle counts are capped.
- LCP content is not delayed by scene/player initialization; animation does not introduce CLS or degrade INP.
- Performance is measured on a target mid-tier mobile device, not inferred from a library's marketing size.

## Skill Invocation Examples

- “Use `$iky-recommend-animate` for a Next.js AI landing with a pinned demo, animated headline, and strict mobile budget.”
- “Use `$iky-recommend-animate` to compare Rive, Lottie, Spline, and R3F for an interactive hero.”
- “Use `$iky-recommend-animate` to audit our Motion + GSAP + Lenis stack and remove overlap.”
- “Use `$iky-recommend-animate` to choose a page-transition approach for an Astro MPA.”
