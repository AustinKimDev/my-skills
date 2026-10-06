---
name: iky-frontend-build
description: Build production frontend screens from iky-screen-flow images and catalog, iky-ui-design working mockups, and iky-component-workbench shared components — routes, navigation, state, data layer, overlays, and loading, empty, error, and permission states — in the project's stack. Use for "목업을 실제 코드로", "프론트 구현해줘", turning approved mockups into the real app, or implementing a flow against the API spec. Not for design exploration or new shared components.
---

# IKY Frontend Build

## Bundled support

Read [the dependency map](references/dependencies.md) when a step calls for another skill. The required guides and resources are included in this folder; load only the relevant support and keep this workflow primary. Resolve a supporting guide's scripts and assets from its own directory. Runtime tools and project packages still come from the active environment.

Turn approved mockups into the real app. The images show the target, the working mockup shows structure and interaction, the shared components are the building blocks, and the API spec defines the data. Production code replaces every mock-only shortcut.

## Inputs

- `output/screen-flow/flow.json` and images: screen IDs, states, overlays, transitions, and dismissal behavior.
- `iky-ui-design` working mockups (`.ui-design/` or the mockup code it produced) and the selected design direction.
- Shared components from `iky-component-workbench` and the project's design rules.
- Product plan policies; `docs/api/openapi.yaml` and `docs/api/spec.md` when they exist.
- The existing app: router, state management, data-fetching, forms, i18n, and test conventions.

## Plan

1. Build the screen table: screen ID → route or presentation (page, modal, sheet), entry conditions, states, outgoing transitions, and the operations it calls. Use the project's routing conventions.
2. Map each screen to shared components. A missing shared component goes through the [bundled iky-component-workbench](embedded/iky-component-workbench/GUIDE.md) path; do not create local near-duplicates.
3. Pick the flows the user asked for and implement them one at a time, end to end.

## Implement a flow

- **Structure:** port layout and interaction from the mockup, replacing hardcoded data, fake handlers, and review controls with production patterns.
- **Data:** use a typed client that matches the API contract. If the backend is not ready, use spec-shaped fixtures behind the project's mocking approach (or a clearly named adapter) and list every place still on fixtures. Never add fields the spec does not define.
- **States:** loading, empty, error (using the error catalog), permission-denied, and offline where relevant, as shown in the screen catalog and policies.
- **Overlays:** triggers, confirm/cancel/back/outside-tap behavior, and what input or selection is preserved, as recorded in the catalog.
- **Navigation:** every transition in the flow, including back and recovery paths.
- **Copy:** Korean product copy from the mockup. Unresolved visual or interaction decisions go to the [bundled iky-ui-design](embedded/iky-ui-design/GUIDE.md) guidance rather than being improvised.
- Apply motion that the mockup or design rules specify; a full motion review belongs to `iky-motion-audit`.

After a screen is implemented, set its factual `route` in `flow.json`.

## Verify

- Run the project's required checks (typecheck, lint, tests).
- Open each implemented screen in the browser following the [bundled browser runtime guide](embedded/browser-runtime/GUIDE.md) and compare it with its image and mockup at a narrow and a wide viewport. Exercise each transition and at least one error or empty state. List visual deviations instead of hiding them.
- Report which screens are on real APIs, which are still on fixtures, and what was not verified.

Next: `iky-integration-check` once the backend operations exist.
