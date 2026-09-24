---
name: image-assets
description: "Initialize project asset style guides, then create and integrate coherent UI imagery: transparent illustrations, backgrounds, heroes, editorial images and textures. Apply project colors/references, reusable 2D/anime/3D/photo templates, generation, cleanup and delivery checks. Use standalone, with image-assets init, or when ui-design needs assets; preserve code-native icons and existing user media."
---

# Image Assets

Own image art direction and production through a usable saved asset. When called by `ui-design`, remain its supporting workflow: return the finished images and integration evidence without restarting screen discovery. Follow the user's language and project locale for communication and product copy; maintain instructions and prompt records in English unless requested otherwise.

## Project setup and init

The default project-owned contract is **`ASSET_GUIDE.md` at the project root** (user decision, 2026-09-06; supersedes the initial `assets/ASSET_GUIDE.md` creation default). It owns image palette roles, material/light/view, reference images, text treatment and delivery defaults; existing UI tokens/themes remain the authority for UI colors. Runtime images still belong under the project's asset directory. If the project already keeps the contract elsewhere, including `assets/ASSET_GUIDE.md`, reuse it and link its path instead of creating a competing guide or relocating it automatically.

Treat **`$image-assets init`** as a skill request to inspect and initialize this project contract, not as an installed shell executable. Follow [project setup](references/project-setup.md); use the bundled initializer for a missing guide, then populate it from actual project evidence and the user's decisions. Existing guides are preserved. Initialization does not generate images or replace project assets.

Before production, reuse the guide when sufficient. For a continuing image collection without one, setup is part of the authorized work; derive known settings and ask only about unresolved choices that materially affect this task. Do not demand a completed global questionnaire, force a guide for a one-off image, or treat an unspecified field as approved. Color tone follows this project contract, never a palette hardcoded in the portable skill.

## 1. Establish the image contract

Apply **explicit user direction → current project asset guide and inspected references → selected style template**. UI design tokens govern surrounding UI; they do not automatically define illustration materials or pixel colors. The bundled soft-toy illustration is an optional example, not a default for all projects or all media.

Read the nearest asset guide, design notes and relevant existing assets. Inspect actual reference images before matching their style. Record which input is a style reference, composition reference, identity reference or edit target. Reuse a suitable existing asset; retain user photos, uploaded creator content, logos and functional icons unless their modification is requested. Prefer existing vectors/code for functional icons, charts, simple gradients and editable diagrams. Do not substitute a vector placeholder for an explicitly requested raster illustration.

Determine two independent axes:

- **Purpose/delivery:** isolated object, background/hero scene, editorial/character illustration, or repeating texture; use [deliverables](references/deliverables.md).
- **Art direction:** select one compatible recipe from [style templates](references/styles.md). Mix recipes only intentionally, with a shared palette, rendering and detail contract. The list is extensible, not a closed menu.

Choose text treatment alongside those axes using [text in images](references/text-in-images.md): live UI text, hybrid image lettering, or a complete banner with baked-in copy. Typography may be part of the artwork when appropriate; preserve the user's selected direction and the project's content/accessibility constraints.

Capture the essential brief in the task's existing notes: subject and meaning, placement, logical display size and largest crop, style/reference, palette roles, silhouette/material/lighting/view, background or alpha intent, text-safe area, format and destination. Resolve these from the requested design and code where possible. Ask only for a missing decision that materially changes the result; do not run an eight-template interview or generate every template.

Use the current project's guide and reference images. For a selected glossy 3D family, the [soft-toy reference](references/soft-toy-reference.md) is optional supporting material. When no guide exists and continuing consistency is needed, record a concise project-local style contract using [the style-lock fields](references/styles.md#collection-style-lock).

## 2. Produce within the requested scope

For a requested asset or assets needed by an authorized UI implementation, proceed with creation, necessary background removal, edge cleanup, resizing, saving and integration. These are part of the deliverable; do not ask for a separate confirmation for each production step. A read-only review does not authorize new images. Optional full-screen concept mockups and additional style exploration follow the parent workflow's opt-in rule. Do not generate a gallery merely because several templates exist.

Use the installed `imagegen` skill as the execution backend, or the user's explicitly selected image tool/skill. Read its instructions when generating. Prefer the exposed built-in generation tool; use its actual input schema and report only tool/model metadata that is available. Do not promise a model from a prompt preference. Do not install tools or dependencies, switch to a separate paid API/CLI, publish, or broaden the asset batch without the applicable authorization. Loading a supporting skill does not require spawning a subagent.

Compose the final prompt from the chosen style recipe, delivery recipe and text mode; fill task fields and omit irrelevant lines. Supply inspected references where supported, labeling their roles. For edits, enumerate what must remain unchanged. For a collection, hold the style lock constant across separate assets and vary only the requested subjects. Default changing/personalized content and functional controls to live UI. Static titles or complete banner copy may belong in the image when selected; verify exact lettering and provide actual accessible actions and the responsive/text-size behavior in [text in images](references/text-in-images.md).

Follow [production and verification](references/production.md) for generation, local processing and integration. Generate cutout-ready source from the first prompt if true transparency is unavailable. Preserve source images. Do not repeatedly request alpha from a mode returning opaque images or silently deliver an unprocessed rectangle. Local background removal and optimization are normal production steps for this workflow; use available tools under current harness permissions. If the backend cannot run, disclose the failure and available authorized alternatives; do not invent an output or mark a placeholder complete. Continue independent UI work and keep the missing asset visibly unresolved in task notes.

Iterate for a concrete defect within the requested batch and budget; do not run an unlimited aesthetic search. Fix crop/mask/size locally where suitable. Regenerate only when the source prevents a correct result. If tool availability, authorization or a user budget prevents completion, report the specific blocker and completed artifacts.

## 3. Deliver and return to UI work

Save final runtime assets in the repository's established location, conventionally `assets/images/<feature>/`, with descriptive lowercase kebab-case names. Keep original sources and prompt records in the task's design-artifact area, outside runtime imports. Create a versioned sibling for revisions; replace a referenced file only when replacement is in scope.

Verify the file, style, actual display size, alpha or crop, intended surfaces and consuming component as specified in [production](references/production.md#acceptance-and-return). Report completed and unverified checks separately. Standalone image work reports component integration as not applicable; it does not create a UI just for testing.

Return to the parent workflow with the saved asset paths, dimensions/bytes/alpha findings, style/reference and prompt-record links, placement and sizing/crop rules, decorative/semantic accessibility treatment, consumer references, completed checks and remaining limitations. A generated preview alone is not a finished project asset.
