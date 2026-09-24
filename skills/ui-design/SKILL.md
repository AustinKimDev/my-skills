---
name: ui-design
description: "Design and implement web or native UI using project settings first and IKY for unresolved design decisions. Use for UI implementation, requested review, or guided exploration; preserve an explicitly selected alternative workflow. Bounded edits reuse established components and targeted checks."
---

# UI Design

## Korean product-copy review

When creating, changing, or reviewing Korean words or sentences in this workflow, resolve the separately installed `humanize-korean` skill and follow its `references/ui-copy-review.md` integration (normally under `~/.agents/skills/humanize-korean`) before accepting the copy. This includes short labels as well as headings, explanations, errors, empty states, and confirmations. Keep the current workflow and its authorization scope; an audit remains read-only unless fixes were requested.


Write agent instructions and maintained guides in English. User-facing communication and product copy follow the user’s requested language and the project locale; Korean examples are references, not a global language restriction.

Use this design precedence throughout: **explicit user direction → established project design settings → IKY defaults → optional supporting references**. Project settings include design documents, configured tokens and themes, reusable components, branding, locale, and established conventions. Use IKY to fill unspecified decisions; do not restyle an existing project merely to match IKY. An isolated implementation defect is not automatically an intentional project convention.

When IKY is part of the effective project contract, resolve root `DESIGN.md` or the project's existing named authority before applying its defaults. Use IKY's [project setup and override workflow](../iky-design/references/project-setup.md) for explicit initialization or continuing project-specific decisions. Store active overrides there with scope and decision provenance; `.ui-design/` briefs link the authority instead of creating another override ledger. Preserve legacy records and independent non-IKY design contracts; ordinary UI work does not force setup, migration or adoption.

## IKY single source of truth

Read [iky-design](../iky-design/SKILL.md) when exploration, implementation, or review requires design decisions, changes to visual rules or interaction, or resolution of uncertain design behavior. It supplies the default foundation beneath project settings. For bounded edits reusing established components and tokens, inspect the affected behavior and rendered state without opening the full reference/audit workflow. Reuse relevant guidance already read. Preserve detailed design documentation and record actual scoped overrides rather than copying or silently changing tokens.

After changes to visual rules, interaction, materials, or unresolved design behavior, run the applicable scope of [iky-design-audit](../iky-design-audit/SKILL.md). For bounded edits using established components and tokens, use targeted checks of the affected behavior and rendered state. Retain pass/fail/unverified/not-applicable evidence for the checks actually required. A successful web build does not establish native visual parity. Neither path starts a new approval round for an already selected direction.

For changes to card materials, gradients, button surfaces or trailing icons, follow IKY's [material reconstruction recipes](../iky-design/references/component-recipes.md) and [scoped regression matrix](../iky-design-audit/references/audit.md). Preserve background ownership across the full surface, distinct light roles and reserved text/icon layout space. Verify actual renderer geometry and output; a platform adapter must not silently change the visual contract. Keep numeric values in IKY's SSOT rather than copying another palette or radius into this workflow.

When a user approves a design correction, carry it into the canonical project rules. Update portable skill snapshots only when portable IKY maintenance is explicitly in scope; a project override must not silently become a global default. Preserve detailed tables, examples and exceptions. Compare manifests after synchronization, and retain earlier captures under their original revision; updated guidance does not retroactively certify native or web parity.

For surface-palette changes, route to IKY COLOR-01 and DEPTH-02: keep the restrained indigo dark foundation, material gradients and glass fill consistent while retaining near-white light surfaces. Follow explicit project overrides; do not introduce a separate palette in this workflow. Include retained examples and displayed/copied tokens in the appearance checks.

For semantic button emphasis, apply the user-selected **09+04 gradient-corner** recipe under IKY COLOR-03 / CONTROL-07 / DEPTH-06. Read the [recipe](../iky-design/references/component-recipes.md#semantic-gradient-corner-buttons) and [tokens](../iky-design/references/tokens.json): neutral faces and appearance-specific neutral labels, directional gradient borders, aligned corner light, and neutral contact depth. This replaces the saturated filled-face and three-strength colored-shadow explorations. Preserve focus, disabled, busy repeat blocking, stable geometry, interruptible hover/press transitions and reduced motion. Measure actual composed contrast and verify both appearances; source integrity does not certify browser or native appearance. Explicitly filled brand-pink actions retain their separate white foreground rule. Keep numeric values in IKY and apply project overrides first.

For IKY appearance setup, use its system/light/dark preference contract and light/dark semantic material sets. Consult THEME-01–04 and the appearance recipes; do not assume IKY means dark-only or reuse a product example's brand as the design-system identity. Verify overlays and component states as well as the page background in both appearances.

Open IKY's [bundled interactive sheet](../iky-design/assets/reference/index.html) when visual or interaction decisions require comparison with its examples, when reconstructing materials, or when investigating a fidelity discrepancy. Compare the relevant states and retain their evidence; bounded reuse of established components does not require reopening the sheet. Its local assets and manifest are the portable reference, and a localhost URL from another session is not.

### IKY scope and reuse

Use SCOPE-01 and PORTABLE-01 to distinguish design-system maintenance, platform implementation and product adoption. Hosting a gallery is not authorization to change the host product's native configuration, dependencies or deployment. Keep future host setup as integration guidance unless adoption is requested.

Share the detailed contract, semantic tokens, component/state recipes and visual examples across React/Vite/Next, React Native and Flutter. Reuse implementation within compatible platform adapters; do not require a universal component library or publish packages without a separate request. Treat the existing RN components as a reference implementation. Extract adapters only when actual project reuse and a stable API justify them.

For light appearance and controls, route to THEME-05, DEPTH-05 and LAYOUT-04: near-white surfaces, readable explanations and social labels, visible button depth, content-fitting tabs and separated heading/body/footer regions. Audit retained document specimens as well as reusable components. Keep numeric values and detailed exceptions in IKY references.

## Popup and bottom-sheet workflow

When implementing or reviewing confirmations, sheets, dialogs or operation feedback, read IKY's [overlay behavior contract](../iky-design/references/overlay-behavior.md) (OVERLAY-01–06). Identify the user task and target environment before choosing a component. Trace existing imports, Alert shims and overlay providers; reuse the shared semantic confirmation anatomy rather than styling each call site independently.

Compare equivalent actions within the affected feature, including request/withdrawal and failure/return. Apply the project's recorded host policy or the IKY selection matrix; mobile/desktop adaptation can change the host while preserving content/action semantics. Check actual secondary/primary styling, content height, keyboard space and all dismissal routes while pending. Use [the overlay audit matrix](../iky-design-audit/references/audit.md#overlay-consistency-and-lifecycle); keep source findings and target-runtime verification distinct.

A request to investigate globally authorizes a caller inventory and ranked findings, not an automatic application-wide rewrite. When migration is authorized, group callers by task semantics and preserve asynchronous and platform lifecycle behavior. Portable skill maintenance updates the guidance and integrity records; product implementation, visual reference recapture and deployment remain separate scopes unless requested.

## Design character within the effective contract

Derive typography, colors, materials, controls, and motion from project settings first and IKY for unspecified decisions. Earlier preferences for soft ambient depth, subtle gradients, and Korean emotional warmth remain supporting art direction only where compatible with that contract. Do not add a parallel Apple aesthetic or override project tokens to reproduce another service. Vary composition and interaction across alternatives while holding the effective design contract fixed unless that contract is the requested comparison target. The comparison workbench retains its own specified styling unless the user requests a workbench change.

## 1. Choose the work path and scope

- **Review:** inspect and report evidence-backed improvements. Continue into fixes only when requested as part of the task.
- **Guided exploration:** use dialogue, bundled reference analysis, and 4–5 alternatives when direction is open or the user wants options. A generic request to make a new screen does not settle its design direction.
- **Direct implementation:** proceed for small edits, a selected direction, or a sufficient brief with explicit design delegation. Do not require another variant-selection round. Ask only unresolved questions that materially affect the result.

Infer the path from context and announce it briefly. Clarify only if the intended path remains unclear. Then determine three independent axes:

- **Purpose and composition:** describe the user task, content, primary action, and context in plain language. The [screen guides](references/screens/service.md) and [catalog examples](references/screens/catalog.json) are optional inspiration, not a taxonomy or whitelist. Combine, reinterpret, or create patterns appropriate to the task; no catalog registration is required. A canvas, simulation, mixed workspace, or unfamiliar service is valid. Existing IDs remain usable as optional hints.
- **Review mode:** use [modes.md](references/modes.md). Select modes for actual decisions; do not generate every mode or rebuild a whole page to compare one component. For page exploration, propose relevant detailed comparisons and sequence them through the conversation.
- **Environment:** identify the existing stack and responsive web, mobile-first web, or native context. Mobile is an environment, not an aesthetic. Test the target platforms and narrow web layouts.

| Optional lens | Guide | Common decisions |
|---|---|---|
| service | [service.md](references/screens/service.md) | Discovery, details, accounts, input, transactions, content |
| landing | [landing.md](references/screens/landing.md) | Product, campaign, pricing, event, brand |
| dashboard | [dashboard.md](references/screens/dashboard.md) | Overview, analysis, records, workflows, editing, access |
| chat | [chat.md](references/screens/chat.md) | Inbox, conversation, AI, support, channels, threads |

Start from the problem, not a screen label. Familiar service, landing, operational, and conversation patterns may be combined or omitted. Catalog `next` entries are examples, not a feature checklist. Implement only agreed paths; preserve back navigation, input, filters, and originating context.

## 2. Discover through dialogue and alternatives

For exploration, read [discovery.md](references/discovery.md). Ask 1–3 focused questions at a time, connect answers to relevant saved reference observations, then refine the next questions and comparisons. Do not treat one question as sufficient when meaningful decisions remain. Reuse existing answers and proceed once direction is sufficiently concrete or delegated.

**For each new comparison target, provide five alternatives by default, at least four.** This includes component and typography exploration. Exceptions: the user requests fewer, or the current round narrows previously presented options. Do not reduce to 2–3 to save effort. If differences are weak, research and refine the hypotheses instead of padding with duplicates.

Give each alternative a **name, user problem, design hypothesis, changed and fixed elements, evidence screen, expected observation, and tradeoff**. Keep facts and content consistent; vary what the selected mode is meant to test.

Separate **acceptance conditions** from **choice criteria**. Choose 4–8 relevant criteria across purpose, structure, visual expression, and interaction; publish the comparison table and recommendations in the browser workspace using [comparison data](references/preview.md#comparison-data). Recommend an overall direction, 2–3 criterion-specific choices, a useful hybrid where appropriate, and the next detailed comparison. Never invent measured performance or scores.

Optionally offer [generated image concepts](references/discovery.md#optional-generated-image-concepts) as visual references before implementation. **Full-screen/component concept generation is off by default to conserve tokens/cost; run it only when the user opts in.** Prefer GPT Image 2 when available without promising unavailable model selection. This is separate from producing images required by an authorized implementation, which follows the asset workflow below. The five-direction default does not require five generated images.

## 3. Reuse the reference library

Consult [brands/index.md](references/brands/index.md) only when service examples help resolve a concrete design question. Toss, Daangn, Naver, Kakao, Hyundai Card, Baemin, and Yogiyo are optional supporting references, not alternative default design systems. Extend with independent service files and screen observations. Choose specific interaction or composition ideas rather than a whole-brand look; see the [pattern synthesis](references/brands/patterns.md).

Apple references are independent product surfaces: [Music](references/brands/apple-music.md), [Wallet](references/brands/apple-wallet.md), and [website](references/brands/apple-web.md). Load a case only when useful; no Apple or Korean reference is mandatory. These products do not share one universal layout, material, or interaction, and their examples do not override project settings or IKY defaults.

**Use bundled knowledge first, including for new direction exploration.** Read project decisions and relevant IKY guidance first. If supporting examples add value, read [pattern synthesis](references/brands/patterns.md) and selected service observations; inspect local captures when visual detail matters. Source URLs are provenance, not instructions to visit websites. Compare 3–5 relevant saved screen observations when useful; do not browse to meet a reference count. When using service references, recommend useful supporting patterns and explain what to borrow and avoid without changing the effective design contract. A new screen, variant, session, or invocation does not require fresh research.

Use external research only for an explicit research/refresh request, a material evidence gap that local records cannot resolve, or a claim that requires current verification. State the specific gap, inspect only the necessary sources, and save reusable analysis and captures using [the library workflow](references/brands/index.md#targeted-research-and-library-maintenance). Do not refresh dated inspiration merely because it is old. Opening the local IKY sheet, coded previews, and the actual implementation for verification remains part of their respective workflows.

When collecting external reference evidence, save source URL, capture, date, environment, observed pattern, applicable situation, and limits. `brand_candidates` are discovery hints, not fit scores. Do not infer app visuals from company-site text. Mark inaccessible or untested aspects explicitly and continue with accessible alternatives. Reuse saved evidence with its original date and limits; do not describe it as a fresh inspection or as model training.

## 4. Preview, feedback, and revision history

Follow [preview.md](references/preview.md) for the local comparison workspace. Provide a reopenable URL and the states, sizes, viewports, and contexts relevant to the decision.

For reviews spanning multiple user roles, independent capabilities, connected screens or conditional states, use the [overview board pattern](references/overview-board.md) when a simultaneous overview helps the decision. It adds synchronized screen frames, fit/actual-size views, an information-architecture explanation, connected-screen links and a condition matrix alongside the existing direction/feedback workbench. Adapt its scope to the project; it is not required for bounded edits, and example ports and product roles are not portable defaults.

Declare each subject's target `preview.viewport`; keep portrait mobile frames separate from the desktop workbench. Set a short `isolatedHeight` only for a bounded specimen, never simply because the mode is component, color, or typography.

- Show isolated components and their real context; use identical Korean samples for typography. Follow each mode's comparison conditions.
- Make agreed prototype paths clickable. Simulate writes, payments, and message sending locally.
- Selecting a direction is a design decision, not permission to push, deploy, install dependencies, or change authentication.
- On feedback, summarize what stays, what changes, and what to compare next. Archive the previous round before replacing current alternatives or shared assets; see [revision history](references/preview.md#revision-history).
- Variant switching is immediate. Creating new variants requires the active agent. File refresh does not imply an always-running AI.
- During active review, use `poll` to read feedback; resume from saved events and decisions. Clearly distinguish saved feedback from processed feedback and stop waiting when the review session ends.

## 5. Use focused expertise

IKY is the default foundation beneath project settings. Apple Design and other expertise are optional support, loaded only for the current problem; they do not override the effective design contract. Keep one primary workflow. A supporting skill does not start a new design-system setup, interview, or approval process.

| Need | Installed skill |
|---|---|
| Supplemental Apple interaction or spatial guidance | `apple-design` |
| Keyboard, focus, forms, accessibility | `better-accessibility` |
| Grouping, layout, responsive behavior | `better-layout` |
| Korean type, numbers, wrapping | `better-typography` |
| Color roles, themes, contrast | `better-colors` |
| Labels, errors, instructions | `better-writing` |
| Component craft and purposeful motion | `better-ui`; `emil-design-eng` when useful |
| Requested holistic review | `better-interface` |
| Motion review or improvement plan | `review-animations`, `improve-animations` |
| Existing/requested component library | `shadcn`, `daisyui`, or `magic-ui` |
| Illustrations, backgrounds, textures and image-led cards | `image-assets`, using `imagegen` or the user's selected generation backend |

Do not install missing skills automatically. Respect existing platform features and project patterns. UI Craft, OMD, Impeccable, and aesthetic presets are explicitly selected alternatives.

### Image assets as part of UI design

Own the complete composition: layout, live text, imagery, interactions and integration. When the requested design needs imagery, load [image-assets](../image-assets/SKILL.md); skill routing means reading and applying its workflow, not automatically spawning an agent. It handles style selection, generation, processing and deliverable verification while `ui-design` remains the primary workflow.

1. Inspect project assets and their current guide, then decide whether to reuse an image, use existing vectors/code, or create a raster asset. Use the existing project asset contract; new guides default to `ASSET_GUIDE.md` at the project root, while existing locations such as `assets/ASSET_GUIDE.md` remain valid. When a continuing collection needs a guide, follow `image-assets` project setup/init to derive project colors and style, recording only unresolved decisions. Do not overwrite an existing guide or ask for setup on every invocation. Identify a concrete visual purpose; do not add imagery to every screen or generate a placeholder gallery.
2. Hand over the subject/meaning, effective project style and inspected references, actual placement/size/crops, text and action locations, output path and requested scope. Choose art style separately from delivery: a soft 3D object and its scene background may share materials but have different alpha and composition rules.
3. Design text and imagery together. Use [image-assets text modes](../image-assets/references/text-in-images.md) for live text, a hybrid with illustrated lettering, or a complete banner with baked-in copy. Do not ban image typography categorically. Use the current user choice and project contract; keep content accurate and actual actions accessible at all supported sizes.
4. In direct implementation or after selection/design delegation, create the images needed for the scoped outcome and complete necessary cutout cleanup, optimization, repository saving and consuming-code integration without a separate routine approval round. Reuse accepted assets across variants where suitable. Optional concept mockups, extra image batches, dependency installation and backend/API changes retain their own boundaries. Review-only work remains read-only.
5. Resume the screen implementation with the returned files. Verify actual image placement, crop/alpha, copy readability, hit targets, relevant appearance/text-size states and target platforms. If creation is unavailable, continue independent work, record the missing deliverable and report the limitation; do not call the UI complete with a fabricated asset.

Keep one image prompt/processing record per task and link it from the existing brief. Project art direction takes precedence over generic templates; image styles do not silently replace UI tokens or restyle user media.

## 6. Record and implement

Preserve the authority of existing DESIGN.md, PRODUCT.md, or .ui-craft documents. Create or update an existing brief, using `.ui-design/brief.md` when needed, only when a durable design decision, exploration result, or multi-session continuation needs recording. Include the relevant scope, decisions and authorization, acceptance conditions, evidence, unresolved issues and next action; retain comparison history for exploration. For image work, link the authoritative style/prompt/processing record and asset consumers instead of duplicating it. A bounded edit without a durable decision needs no new brief. Do not duplicate design tokens across documents.

After selection or design delegation, implement in the existing stack. Replace mock-only states with real data flow and error handling when delivering production functionality. Verify acceptance conditions, chosen design intent, keyboard/input behavior, narrow layouts, relevant states, and connected flows. HTML previews of native UI require subsequent simulator/device verification. Finish after relevant and required checks pass; do not keep polishing unrelated areas.
