---
name: iky-screen-flow
description: Create or update a browser review artifact with imagegen screen mockups, a sectioned gallery, and one connected screen-flow map. Generate independent screen images in parallel. Use for whole-app screen proposals, image-based UX storyboards, screen inventories with navigation, or requests like "시안 전체 보기", "화면들을 연결해줘", and "앱 화면 흐름 만들어줘". Includes a reusable static viewer and catalog validation. Does not implement the production app or replace product-policy planning.
---

# Screen Flow

## Bundled support

Read [the dependency map](references/dependencies.md) when a step calls for another skill. The required guides and resources are included in this folder; load only the relevant support and keep this workflow primary. Resolve a supporting guide's scripts and assets from its own directory. Runtime tools and project packages still come from the active environment.


Turn individual screen mockups into an explorable product review. The same catalog drives **All screens** (`?mode=all`) and a **Connected map** (`?mode=graph`). A screen opens a full-size preview with incoming and outgoing actions. Search, pan, zoom, fit, keyboard navigation, and deep links are bundled.

## Start from the intended product

Read the current product decisions and any supplied screens or prototype. Distinguish existing implementation, proposed behavior, and user-approved decisions. Use a route inventory when useful, but do not infer that every route is a user-facing screen or that old implementation approves a new design.

For a new design, follow the user's selected design workflow or the project's existing design rules; use [bundled iky-ui-design](embedded/iky-ui-design/GUIDE.md) guidance for unresolved visual decisions. This skill owns the review artifact, not a new product theme. Do not transfer a source project's brand, palette, tab count, domain policies, or fixed number of screens into another product.

For an existing artifact, preserve IDs, image selections, descriptions, and transitions outside the requested correction. Update the authoritative decision record once; mark superseded decisions there instead of duplicating competing rules.

## Build the screen catalog before mass production

Define stable screen IDs, purpose, section, entry conditions, meaningful states, and actions. Include the return or recovery path for the flows in scope, not just the happy path. A materially distinct state can be a separate screen; aliases and repeated entry points normally reuse one screen node.

Inventory all user-visible overlays and transient UI required by the flows in scope: popups, modals, confirmation dialogs, bottom sheets, drawers, popovers, dropdowns, tooltips, toasts/snackbars, and system permission prompts where applicable. Include them even when they have no route. Generate mockups that visibly show each distinct state in its host-screen context; a text note alone does not count as a completed mockup. Reuse identical states across repeated entry points.

Give overlays with meaningful actions or decisions their own catalog nodes and images. Show lightweight feedback in the relevant host-screen state. Record each trigger and applicable confirm, cancel, close, outside-tap, back, or automatic-dismiss behavior, including the destination and any preserved input or selection. Connect decision branches, resulting success/error states, and return paths in the same map. Follow established product behavior; label unresolved behavior as proposed rather than inventing an approved dismissal or permission policy.

Keep all included screens in **one map**. Sections and spatial groups organize that map; they do not split the product into isolated chapter graphs. Multiple legitimate entry points are allowed, including deep links and authenticated entry. Label arrows with actions or conditions, not arbitrary arrows that imply nonexistent behavior.

Read [catalog.md](references/catalog.md) when preparing or editing `flow.json`. For new screen designs, use the [bundled image-generation guide](embedded/image-generation/GUIDE.md) with the available image tool and read [image-workflow.md](references/image-workflow.md). Create the actual screen mockups with image generation; do not substitute HTML/CSS, SVG, canvas drawings, or browser captures unless the user explicitly chooses that production method. The HTML viewer presents the generated images; it is not a substitute image renderer.

Generate independent screen images **in parallel**, with one image-generation call per screen and bounded concurrency supported by the current harness. Define the catalog, shared visual direction, and exact copy first. A representative anchor can precede dependent screens; generate the independent screens within each batch concurrently. Reuse existing screenshots and user-provided mockups for unchanged screens. Parallel tool calls do not require subagents or a CLI/API backend; follow the session's separate authorization rules for those mechanisms.

## Use the bundled viewer

Resolve `SKILL_DIR` to this skill's actual directory. Node.js 18+ is sufficient; there is no install step or runtime CDN dependency.

```sh
node "$SKILL_DIR/scripts/review.mjs" init ./output/screen-flow --title "프로젝트 · 전체 화면과 흐름"
# Populate flow.json and copy selected screen images into images/.
node "$SKILL_DIR/scripts/review.mjs" build ./output/screen-flow
node "$SKILL_DIR/scripts/review.mjs" validate ./output/screen-flow --require-images
```

For changes to the helper itself, run `node --test "$SKILL_DIR/scripts/review.test.mjs"`.

`init` refuses a nonempty destination. `build` validates the catalog and updates image availability in `flow.json`; it does not generate images or invent connections. `validate` is read-only and distinguishes missing files from ready files. File presence does not prove image decoding or visual quality.

The starter contains an empty catalog rather than fake completed screens. Add `meta.entryScreenIds`, section definitions, screens, and one flow with explicit grid coordinates. Use `meta.defaultMode` to choose `all` or `graph`; URL parameters override it. Theme the review shell through `viewer.css` only when requested or useful. The app designs themselves remain separate images.

Serve the artifact over HTTP because the viewer fetches `flow.json`. Prefer the project's existing local server and observe its port conventions. If needed, serve only the output directory on loopback using an available port. Never expose the repository root merely to preview an artifact. Follow the [bundled browser runtime guide](embedded/browser-runtime/GUIDE.md). In Orca, establish this session's workspace, and pin subsequent commands to its page ID; otherwise use the environment's approved browser workflow.

## Verify the review, then hand it back

- Validate IDs, section references, every mapped screen, coordinates, edge endpoints, duplicate edges, reachability from declared entries, and actual image availability.
- Check that overlays and transient states identified in scope appear in the generated images, with their triggers, decisions, dismissal, and return behavior represented in the catalog and map as applicable.
- Open both modes. Check a preview, an outgoing connection, search, zoom/fit, a `?mode=all&screen=<id>` deep link, and keyboard close/focus return. Missing-image and invalid-catalog states must remain visible rather than appearing complete.
- Inspect image decoding and proportions. In the gallery and modal, do not stretch or crop an entire screen to fill a fixed frame. Check narrow layout around 320–430px and a larger review viewport when relevant.
- For a dense map, inspect connectors for non-endpoint card intersections, clipped routes, and unreadable labels. Structural validation alone does not verify geometry or rendered images.
- Record actual checks and remaining limitations beside the artifact. Deliver its URL and source directory. Describe it as a reviewable design, not implemented authentication, payment, or native app behavior.

Publishing, production changes, and external communication are separate from creating this local artifact. Missing image-generation tools do not prevent catalog/viewer work with existing assets, but new image mockups must remain pending; report the specific blocker instead of silently replacing their production method.
