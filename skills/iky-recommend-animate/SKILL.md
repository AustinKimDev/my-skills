---
name: iky-recommend-animate
description: Use when choosing, comparing, or combining web animation tools for landing pages, SaaS or AI product sites, React or Next.js UI motion, scroll storytelling, text effects, page transitions, vector animation, canvas, WebGL, 3D, physics, or programmatic video, especially when performance, accessibility, licensing, SSR, RSC, or maintenance tradeoffs matter.
---

# Recommend Animate

## Overview

Recommend the smallest animation stack that produces the requested experience. Prefer native CSS and browser APIs, then one primary engine, then at most one specialist whose role cannot be covered cleanly by the primary engine.

## Workflow

1. Inspect the project before recommending a dependency: framework, existing packages, rendering model, target browsers, interaction goal, asset pipeline, performance budget, accessibility needs, team skill, and license constraints.
2. Reuse native CSS, the Web Animations API, View Transitions, or an installed dependency when they cover the effect.
3. Classify the need, then read [references/catalog.md](references/catalog.md) for candidates. Read [references/patterns.md](references/patterns.md) when combining tools or planning implementation.
4. Choose one primary engine. Add one specialist only for a distinct responsibility such as smooth scrolling, Rive assets, WebGL, or physics.
5. Check the exact version's official documentation, repository activity, and license before a production dependency decision. Treat the catalog's 2026-08 snapshot as guidance, not immutable truth.
6. If implementation is requested, ask for approval before adding a dependency. Keep browser-only code in a client boundary and preserve useful static content for SSR/RSC.

## Fast Selection

| Need | Default | Escalate when |
|---|---|---|
| Hover, fade, reveal, simple loop | CSS | Runtime orchestration or interruption is required |
| React state, layout, enter/exit, gestures | Motion | A long imperative timeline or deep scroll choreography dominates |
| Scroll storytelling, SVG, text, precise timelines | GSAP + needed plugin | The effect is simple enough for CSS scroll timelines |
| Framework-neutral DOM/SVG/object tweening | Anime.js | React layout semantics matter more than timeline control |
| Spring-first interactive UI | React Spring | Motion already exists in the project |
| List insert/remove/reorder | AutoAnimate | Bespoke choreography is required |
| Smooth scroll synced with DOM/WebGL | Lenis as a specialist | Native scrolling already feels correct |
| Interactive vector state machine | Rive | Linear authored playback is enough; use Lottie/dotLottie |
| Designer-owned 3D scene | Spline or Unicorn Studio | Code-level scene control is required; use R3F/Three.js |
| Code-owned React 3D | React Three Fiber + Three.js | A tiny shader-only surface is enough; consider OGL |
| Dense interactive 2D canvas | PixiJS | It is an exploratory sketch; use p5.js |
| DOM-like objects with collisions | Matter.js | The effect is decorative and can be faked more cheaply |
| Page transition | View Transitions API | Server-rendered lifecycle control is required; use Swup, then Barba for custom control |
| Programmatic video render | Remotion | The animation must run as normal page UI |

## Decision Rules

- Default to **CSS/native**, **Motion**, **GSAP**, or **Anime.js** as the primary layer; justify anything else by a narrower capability.
- Do not recommend Motion and GSAP together by default. Combine them only when Motion owns component state/layout and GSAP owns an isolated timeline or scroll sequence.
- Treat Lenis as optional infrastructure, not visual polish by itself. Do not add it to forms, dashboards, or content-heavy apps without a tested reason.
- Treat R3F, Three.js, OGL, PixiJS, Spline, and Unicorn Studio as a performance budget decision. Require a static fallback, lazy loading, resize cleanup, and pause offscreen work.
- Prefer Rive for interactive stateful vector assets and Lottie/dotLottie for authored linear playback.
- Prefer View Transitions over Barba/Swup when browser support and the routing model permit it.
- Mark Popmotion, Motion One, React Move, and other legacy lineages as migration or maintenance choices, not greenfield defaults.
- Never encode essential meaning only in motion, canvas, or hover. Honor `prefers-reduced-motion`, preserve focus and reading order, and provide keyboard/touch equivalents.
- Animate `transform` and `opacity` first. Treat layout, filters, masks, large blur, full-screen canvas, and continuous RAF loops as measurable costs.

## Recommendation Contract

Return these sections in order:

1. **Verdict** — one sentence naming the minimum stack.
2. **Roles** — each selected tool and its single responsibility.
3. **Why / why not** — fit plus the strongest rejected alternative.
4. **Delivery notes** — framework and SSR/RSC boundary, performance budget, reduced-motion behavior, accessibility, license, and current maintenance caveat.
5. **First implementation slice** — the smallest proof that validates the effect before expanding it.

State assumptions inline. Ask a question only when the missing answer changes the recommendation materially.

## Example

Request: “Next.js SaaS landing. Hero text reveal, pricing-card hover, one pinned product walkthrough, mobile matters.”

Answer:

> **Verdict:** Use GSAP + ScrollTrigger only; keep card hover in CSS.
>
> **Roles:** GSAP owns the hero and pinned walkthrough. CSS owns hover/focus transitions.
>
> **Why / why not:** ScrollTrigger's timeline and pinning justify GSAP. Motion would duplicate the engine without solving a separate need; Lenis and 3D add cost without a stated outcome.
>
> **Delivery notes:** Load the animated section as a client component, keep all text in server-rendered HTML, revert GSAP contexts on unmount, disable pin/scrub under reduced motion, and test a mid-tier mobile device.
>
> **First slice:** Build only the pinned walkthrough with production copy and measure responsiveness before animating the rest.

## Common Mistakes

- Recommending a trendy stack before identifying the effect and ownership boundaries.
- Listing bundle sizes without a version, import path, and measurement method.
- Calling a runtime “SSR compatible” because import succeeds while rendering still needs DOM, canvas, WebGL, or WASM.
- Ignoring authoring-tool pricing or special licenses for GSAP, TypeIt/Typed.js, Remotion, Spline, Unicorn Studio, Rive, or Lottie assets.
- Mixing multiple RAF loops without a single integration and teardown path.
