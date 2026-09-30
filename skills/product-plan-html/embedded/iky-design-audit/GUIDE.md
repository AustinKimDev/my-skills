> Bundled supporting guide. Preserve the calling workflow's scope and project authority. Use [local support](references/dependencies.md) for named dependencies; this guide does not grant additional tool or mutation permissions.

# IKY Design Audit

## Bundled support

Read [the dependency map](references/dependencies.md) when a step calls for another skill. The required guides and resources are included in this folder; load only the relevant support and keep this workflow primary. Resolve a supporting guide's scripts and assets from its own directory. Runtime tools and project packages still come from the active environment.


## Korean product-copy review

When creating, changing, or reviewing Korean words or sentences in this workflow, follow the [bundled Korean UI-copy review](../humanize-korean/references/ui-copy-review.md) before accepting the copy. This includes short labels as well as headings, explanations, errors, empty states, and confirmations. Keep the current workflow and its authorization scope; an audit remains read-only unless fixes were requested.


Read [audit procedure](references/audit.md), [rules](references/rules.md), and [tokens](references/tokens.json). These bundled references are self-contained. Compare [manifest](references/manifest.json) with a project's contract when one exists; report drift instead of assuming either is current.

First establish the effective contract: explicit user direction, then established project design documents, configured tokens/themes, reusable components and conventions, then IKY defaults. Cite existing project settings as scoped overrides without requiring renewed approval. Evaluate overridden behavior against the project requirement; mark the replaced IKY requirement not-applicable with its source and scope. An intentional difference from IKY alone is not a failure. Continue checking applicable accessibility and functional requirements independently; do not excuse an observed defect as an undocumented override.

Resolve the project-root `DESIGN.md` or the authority named by the nearest project instructions before evaluating defaults. Follow [project override review](references/project-setup.md#review-and-audit): verify target, scope, decision source and current/superseded status; keep validation evidence separate from approval. Existing `.ui-design/iky-overrides.md` may remain authoritative or historical—read its actual status and linked replacement. Missing initialization alone is not a design defect, and auditing does not authorize creating or migrating a guide. A project that excludes IKY is judged against its own contract.

Default to read-only inspection. An explicit implementation-and-fix task authorizes fixes in that scope; an audit request alone does not. Do not install dependencies, change branding, rewrite unrelated components, or broaden scope as part of an audit.

Assign each applicable rule one status: `pass`, `fail`, `unverified`, or `not-applicable`. Cite file/line, observed state, device/browser dimensions and capture or test evidence. Never turn missing screenshots, inaccessible native runtimes, font fallbacks or pending assets into passes. Report ranked findings with trigger, observed behavior, expected rule, user impact and concrete repair. Re-test repaired findings and retain original evidence.

For exact component composition and required states, read [component recipes](references/component-recipes.md). The [complete sheet fixture](references/reference-sheet.json) preserves every section and product example without abridgement; consult relevant sections when reconstructing or auditing the gallery. Its product strings do not impose a project language.

For exact document spacing and type measurements, consult [source style measurements](references/reference-styles.json) by the fixture node path and [capture provenance](references/reference-style-manifest.json). The [complete introduction](references/reference-introduction.json) is retained separately from the eleven sections.

For semantic button emphasis, apply the user-selected **09+04 gradient-corner** recipe under IKY COLOR-03 / CONTROL-07 / DEPTH-06. Read the [recipe](references/component-recipes.md#semantic-gradient-corner-buttons) and [tokens](references/tokens.json): neutral faces and appearance-specific neutral labels, directional gradient borders, aligned corner light, and neutral contact depth. This replaces the saturated filled-face and three-strength colored-shadow explorations. Preserve focus, disabled, busy repeat blocking, stable geometry, interruptible hover/press transitions and reduced motion. Measure actual composed contrast and verify both appearances; source integrity does not certify browser or native appearance. Explicitly filled brand-pink actions retain their separate white foreground rule. Keep numeric values in IKY and apply project overrides first.

Before using source measurements, compare `reference-style-manifest.json.sourceDigest` with `tokens.json.sourceDigest`. A mismatch means the measurements are historical; preserve their original provenance and mark current geometry/appearance unverified until recaptured.

## Material and layout fidelity

For surface-palette maintenance, apply COLOR-01 and DEPTH-02 to canvas, surfaces, material gradients and glass fill together. The default dark material is restrained low-chroma indigo; the light set remains near-white. Keep numeric values in tokens and recipes. Resolve retained fixture colors and displayed/copied examples through their semantic roles in both appearances. Preserve fixed social-brand colors and black contact shadows; a palette revision is not a blanket black/gray replacement. Explicit project overrides still take precedence.

Read the material reconstruction and narrow-card sections of [component recipes](references/component-recipes.md) when working on cards, light fields, control surfaces or trailing icons. They cover full-surface background ownership, separate surface/featured/glass roles, actual renderer radius/focal geometry, and reserved icon columns. Numeric recipes belong in those references, not duplicated local style guesses.
Use the scoped material/icon regression matrix in [audit procedure](references/audit.md). Check the rendered outcome as well as geometry: correct props or a successful build cannot pass missing bloom, clipped light, overlapping text, or an unverified native target. Approved brand color and text-contrast compliance are separate findings.

For identity or appearance work, read IDENTITY-01 and THEME-01–04 in [rules](references/rules.md), the appearance setup in [recipes](references/component-recipes.md), and the two-appearance acceptance procedure in [audit](references/audit.md). IKY is the system identity; product specimens do not define its brand. Keep system preference distinct from resolved appearance and verify both light and dark material sets.

## Scope and cross-platform reuse

Read SCOPE-01 and PORTABLE-01 in [rules](references/rules.md) and the cross-platform reuse strategy in [recipes](references/component-recipes.md). Maintain the portable contract, tokens, detailed states and visual examples as the shared authority. React/Vite/Next, React Native and Flutter use appropriate implementation adapters; this skill does not require a universal UI package or library publication. The existing RN implementation is a reference, not proof of parity for other renderers.

Distinguish design-system maintenance from product adoption before acting. A gallery hosted by a product does not authorize changing that product's native configuration or installing dependencies. For appearance and control work, apply THEME-05, DEPTH-05 and LAYOUT-04, including light readability, visible layered button depth and separated content/action regions. Keep exact values in the shared references.

Use the scope and platform acceptance section of [audit procedure](references/audit.md). Mark unrequested adoption checks not-applicable with a reason, and requested but untested adapter targets unverified. Neither an unavailable host nor a passing document validator proves or disproves a different deliverable.

## Runnable reference checks

When the audit requires comparison with IKY examples, material reconstruction, or investigation of a visual/interaction discrepancy, open its [interactive reference](../iky-design/assets/reference/index.html), verify its bundle manifest against this contract revision, and compare the relevant states and appearances. Bounded reuse of established project components needs targeted checks of the affected rendered state and behavior, without reopening the sheet. Tokens and rules retain numeric/semantic authority. Report discrepancies and preserve comparison provenance. Missing browser/native evidence stays unverified for a required target; a valid bundle hash only proves reference integrity.

## Brand button foreground

Explicitly filled brand-pink buttons use the white on-action foreground for text, icons and progress in both appearances, including hover, pressed and busy states. Follow the brand recipe in [component recipes](references/component-recipes.md) and the [brand foreground decision record](../iky-design/references/brand-button-foreground.md); other semantic tones retain their own foregrounds and disabled stays neutral. Check actual nested labels, not just container styles. Record visual conformance and COLOR-02 contrast separately; never silently darken an approved white brand label or claim contrast compliance from user preference.

## Popups, confirmations and bottom sheets

For these tasks, read [overlay behavior](references/overlay-behavior.md) and apply OVERLAY-01–06. Select presentation by task and environment, compare equivalent entry points, and preserve async failure/return and priority-overlay ownership. Use the [overlay audit matrix](references/audit.md#overlay-consistency-and-lifecycle) for scoped evidence. An isolated mixture is not an intentional project convention; neither a global replacement nor product integration is authorized merely by loading these rules.
