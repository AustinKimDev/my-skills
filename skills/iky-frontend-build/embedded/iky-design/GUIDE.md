> Bundled supporting guide. Preserve the calling workflow's scope and project authority. Use [local support](references/dependencies.md) for named dependencies; this guide does not grant additional tool or mutation permissions.

# IKY Design

## Bundled support

Read [the dependency map](references/dependencies.md) when a step calls for another skill. The required guides and resources are included in this folder; load only the relevant support and keep this workflow primary. Resolve a supporting guide's scripts and assets from its own directory. Runtime tools and project packages still come from the active environment.


## Korean product-copy review

When creating, changing, or reviewing Korean words or sentences in this workflow, follow the [bundled Korean UI-copy review](../humanize-korean/references/ui-copy-review.md) before accepting the copy. This includes short labels as well as headings, explanations, errors, empty states, and confirmations. Keep the current workflow and its authorization scope; an audit remains read-only unless fixes were requested.


## Authority and project defaults

Apply **explicit user direction → established project design settings → IKY defaults → optional supporting references**. Project design documents, configured tokens/themes, reusable components, branding, locale, and established conventions take precedence; IKY fills unspecified decisions. Reuse those settings without requiring renewed approval or migrating them to IKY. Record relevant overrides by linking their existing source, not duplicating their values. Distinguish a deliberate project setting from an isolated implementation defect. Apply the effective project contract during implementation and audit; a difference from IKY alone is not a defect. Keep project overrides local unless portable IKY maintenance is explicitly requested.

Read [rules](references/rules.md) and [numeric tokens](references/tokens.json) for the relevant component scope. These bundled, versioned references are the SSOT snapshot; no project checkout or framework is required. Read the typography, interaction, data and motion sections when those domains are touched. Preserve detailed rules and examples rather than summarizing away exceptions.

## Project setup, init and overrides

The default new project record is **`DESIGN.md` at the project root**. Before applying IKY, resolve the nearest project instructions and their actual design authority; read this guide when present, or reuse the existing authoritative path. Follow [project setup and overrides](references/project-setup.md) for `$iky-design init`, `$iky-design override`, baseline adoption, legacy records and scoped decision format.

`init` inspects and initializes that project record using [the non-destructive helper](scripts/init_iky_guide.py); it is a skill request, not a shell executable. `override` records a project-specific rule/token/domain replacement in the same authority, with scope, decision source and verification status. Keep unknowns and proposals explicit. Reuse existing sources instead of copying token values; mark superseded decisions and link the replacement.

Do not create new active override ledgers under `.ui-design/`; task briefs and audit evidence link the project guide. Existing `.ui-design/iky-overrides.md` or other authoritative records are preserved and reused until an authorized migration reconciles them. If the project explicitly excludes IKY, respect its independent design contract. Setup does not select a new design system, modify product UI or upgrade the baseline. A bounded implementation can reuse known project settings without requiring an initialization ceremony.

## Runnable visual reference

Open [the complete interactive HTML sheet](assets/reference/index.html) when resolving visual/interaction decisions, reconstructing materials, or investigating fidelity discrepancies; start at [depth and materials](assets/reference/index.html#depth-rules) when relevant. Bounded reuse of established project components does not require reopening it. The bundle runs without the original repository or a CDN. If a local static server is needed, follow the environment's port policy; never assume another session's server belongs to this task.

This sheet is the visual and behavioral SSOT example; [rules](references/rules.md), [tokens](references/tokens.json) and recipes define the portable contract. Do not infer universal APIs from HTML markup. Numeric values come from tokens; interactions, grouping and materials are inspectable in the sheet. If the sheet, tokens or rules disagree, report the discrepancy and reconcile the authorized source rather than choosing silently. Neither the HTML nor RN implementation proves native/Flutter fidelity.

The [bundle manifest](assets/reference/manifest.json) records the contract hash, source hashes, asset hashes and relocation transformations. Match its contractHash to references/manifest.json before use. This repository maintains the portable bundle and spec together. After an authorized update, synchronize affected manifests and keep historical source/style measurements labeled with their original provenance; recapture measurements when visual or structural changes invalidate them. A documentation or packaging update is not a fresh visual acceptance. Record intentional project overrides separately.

Use this as the design contract alongside the selected implementation workflow. Do not start another exploration or require permission merely to apply it. Explicit user decisions and closer project instructions override defaults; record the token/rule override, purpose and scope. Product copy follows the project locale. This contract does not force one implementation language or library.

1. Identify the actual screen, state, platform and existing runtime. Locate a project IKY spec if present; compare its version/hash with [manifest](references/manifest.json). Report drift; do not silently regenerate an accepted reference from the implementation.
2. Map components to stable rule IDs. Preserve detailed source documentation and build actual interactive controls in the target stack. Reuse the existing platform dependencies. Keep numbers, semantics and state ownership explicit.
3. Match tokens, supported font weights, dimensions, surface layers and motion. Keep typography roles separate from raw values. Any renderer fallback requires explicit platform verification.
4. Run scoped behavior, accessibility and visual comparison. Use the self-contained rubric in [audit](references/audit.md); the separate `iky-design-audit` entrypoint is optional and is not required to perform these checks. Audit only relevant scope, but mark untested required targets unverified.
5. Report implemented work, evidence and unresolved differences. Never claim identical native output from web screenshots or successful typechecking alone.

For exact component composition and required states, read [component recipes](references/component-recipes.md). The [complete sheet fixture](references/reference-sheet.json) preserves every section and product example without abridgement; consult relevant sections when reconstructing or auditing the gallery. Its product strings do not impose a project language.

For exact document spacing and type measurements, consult [source style measurements](references/reference-styles.json) by the fixture node path and [capture provenance](references/reference-style-manifest.json). The [complete introduction](references/reference-introduction.json) is retained separately from the eleven sections.

For semantic button emphasis, apply the user-selected **09+04 gradient-corner** recipe under IKY COLOR-03 / CONTROL-07 / DEPTH-06. Read the [recipe](references/component-recipes.md#semantic-gradient-corner-buttons) and [tokens](references/tokens.json): neutral faces and appearance-specific neutral labels, directional gradient borders, aligned corner light, and neutral contact depth. This replaces the saturated filled-face and three-strength colored-shadow explorations. Preserve focus, disabled, busy repeat blocking, stable geometry, interruptible hover/press transitions and reduced motion. Measure actual composed contrast and verify both appearances; source integrity does not certify browser or native appearance. Explicitly filled brand-pink actions retain their separate white foreground rule. Keep numeric values in IKY and apply project overrides first.

Before using source measurements, compare `reference-style-manifest.json.sourceDigest` with `tokens.json.sourceDigest`. A mismatch means the measurements are historical; preserve their original provenance and mark current geometry/appearance unverified until recaptured.

## Material and layout fidelity

For surface-palette maintenance, apply COLOR-01 and DEPTH-02 to canvas, surfaces, material gradients and glass fill together. The default dark material is restrained low-chroma indigo; the light set remains near-white. Keep numeric values in tokens and recipes. Resolve retained fixture colors and displayed/copied examples through their semantic roles in both appearances. Preserve fixed social-brand colors and black contact shadows; a palette revision is not a blanket black/gray replacement. Explicit project overrides still take precedence.

Read the material reconstruction and narrow-card sections of [component recipes](references/component-recipes.md) when working on cards, light fields, control surfaces or trailing icons. They cover full-surface background ownership, separate surface/featured/glass roles, actual renderer radius/focal geometry, and reserved icon columns. Numeric recipes belong in those references, not duplicated local style guesses.
After user-approved visual corrections, update the applicable project contract. Update portable IKY snapshots only when the correction is authorized as portable design-system maintenance; a project override does not change global IKY defaults. Preserve detailed fixtures and previous evidence, and check manifests for any snapshots actually updated. Keep framework-specific adapter notes separate from the language-independent design outcome. Do not label the corrected contract as visually accepted on platforms that have not been retested.

For identity or appearance work, read IDENTITY-01 and THEME-01–04 in [rules](references/rules.md), the appearance setup in [recipes](references/component-recipes.md), and the two-appearance acceptance procedure in [audit](references/audit.md). IKY is the system identity; product specimens do not define its brand. Keep system preference distinct from resolved appearance and verify both light and dark material sets.

## Scope and cross-platform reuse

Read SCOPE-01 and PORTABLE-01 in [rules](references/rules.md) and the cross-platform reuse strategy in [recipes](references/component-recipes.md). Maintain the portable contract, tokens, detailed states and visual examples as the shared authority. React/Vite/Next, React Native and Flutter use appropriate implementation adapters; this skill does not require a universal UI package or library publication. The existing RN implementation is a reference, not proof of parity for other renderers.

Distinguish design-system maintenance from product adoption before acting. A gallery hosted by a product does not authorize changing that product's native configuration or installing dependencies. For appearance and control work, apply THEME-05, DEPTH-05 and LAYOUT-04, including light readability, visible layered button depth and separated content/action regions. Keep exact values in the shared references.

## Brand button foreground

Explicitly filled brand-pink buttons use the white on-action foreground for text, icons and progress in both appearances, including hover, pressed and busy states. Follow the brand recipe in [component recipes](references/component-recipes.md) and the [brand foreground decision record](references/brand-button-foreground.md); other semantic tones retain their own foregrounds and disabled stays neutral. Check actual nested labels, not just container styles. Record visual conformance and COLOR-02 contrast separately; never silently darken an approved white brand label or claim contrast compliance from user preference.

## Popups, confirmations and bottom sheets

For these tasks, read [overlay behavior](references/overlay-behavior.md) and apply OVERLAY-01–06. Select presentation by task and environment, compare equivalent entry points, and preserve async failure/return and priority-overlay ownership. Use the [overlay audit matrix](references/audit.md#overlay-consistency-and-lifecycle) for scoped evidence. An isolated mixture is not an intentional project convention; neither a global replacement nor product integration is authorized merely by loading these rules.
