# Component discovery and reuse

Read this when building or extending the inventory. The inventory connects design needs, source contracts and runnable specimens; it is not a second copy of the component implementation.

## From screens to component families

Inspect the selected images or live prototype as well as the supplied catalog. Read the current decisions before interpreting visual details. Separate observed appearance, documented behavior and inference. A screenshot can establish layout; it cannot prove focus order, dismissal policy, data loading or validation rules.

Identify recurring responsibilities across the in-scope screens:

- Foundations: semantic typography, icon conventions, spacing and existing tokens.
- Controls: actions, editable values, choices, search and file selection.
- Navigation and layout: tabs, headers, action areas, adaptive containers.
- Content compositions: repeated identity, content, scheduling or commerce patterns.
- Feedback and overlays: progress, missing data, failure, notices and confirmations.

These are optional discovery lenses, not a required catalog. Keep a unique screen arrangement as a screen composition unless it has a useful reusable boundary. Do not build every possible control or duplicate an existing component for each screen.

Group by responsibility, state model, semantics and data shape as well as appearance. Similar rounded rectangles may represent unrelated tasks. Different-looking actions may share one existing button API. Trace repeated atoms inside compositions instead of extracting a monolithic component from every mockup.

For each candidate, describe its user task, caller-owned data, actions, visible states, necessary accessibility behavior and target platform. Infer routine reversible details from project conventions; ask only when an unresolved decision changes intended behavior or a material contract. Label inferred behavior until supported by a decision or implementation.

Read all in-scope screens before finalizing coverage. Preserve screen IDs and state references; do not renumber a screen-flow catalog to match component order. Existing screenshots may be linked as provenance. New image generation is not necessary to document actual components.

## From source to verified contracts

Start at the package's public exports and existing documentation. Trace wrappers, re-exports and consumers before deciding which declarations are distinct components. Include intentionally scoped application-local components when requested; keep internal helpers out of the public index unless they are useful documentation subjects.

For each component inspect:

1. Export name and import path; types or prop definitions and runtime defaults.
2. Rendering and event handlers, controlled/uncontrolled behavior and asynchronous guards.
3. Providers, platform adapters, assets, styling and layout assumptions needed to render it.
4. Representative consumers showing supported composition and actual use.
5. Stories and relevant tests showing intended states and known limits.

Record differences between the declared API and observed behavior. For documentation-only work, describe or flag a defect without silently fixing production source. Do not improve appearance just because a component differs from a preferred design system.

Do not fabricate API descriptions from names. If a default is caller supplied, say so. Distinguish a disabled prop from a handler that actually blocks activation; distinguish an error presentation from a retry path that actually works. Use type extraction where available, then check unions, callbacks, generics and runtime defaults manually when the generator cannot represent them accurately.

## Reconcile designs and existing components

Use a compact decision table. An illustrative decision vocabulary is:

| Decision | Choose when | Result |
| --- | --- | --- |
| Reuse | Existing API and behavior meet the need | Add or update the specimen/context example only. |
| Compose | Existing exports meet the need in combination | Demonstrate the composition; extract it only if a shared responsibility justifies it. |
| Extend | A missing state or variant fits the existing semantic contract | Make the scoped, authorized extension and check existing variants/consumers. |
| Add | No compatible responsibility exists | Implement the smallest complete public component and its specimens. |
| Report | A mismatch is outside scope, unapproved or unresolved | Keep it visible as a finding/proposal; do not present it as implemented. |

In a hybrid request, perform this mapping before building lookalikes. Prefer source composition over parallel copies. A supplied design may require a deliberate departure from existing visuals, but only within the user's selected scope; the existence of old code does not approve future design.

## Inventory and evidence

Reuse an existing story registry or catalog when it can hold the required mapping. Otherwise keep a small Markdown table, typed registry or JSON file beside the workbench. Choose the format that avoids duplicate maintenance; there is no mandatory schema or new package.

Maintain these facts, with unsupported fields explicitly unknown or not applicable:

| Fact | Content |
| --- | --- |
| Identity | Stable ID, display name, family/category, purpose |
| Source | Export/import path and implementation file, or proposed location clearly labelled |
| Provenance | Screen/design ID and selected revision, or existing consumer/story references |
| Decision | Reuse, compose, extend, add or report with a short reason |
| Contract | Link to API, dependencies/providers, caller-owned state and callbacks |
| Coverage | Variants and meaningful states with specimen/deep links; missing states remain visible |
| Status | Proposed or implemented; verification recorded independently |
| Evidence | Check, result, environment, revision and evidence link when one exists |

Check that inventory IDs and specimen links resolve, and that every scoped export or design need is covered or explicitly accounted for. Aliases point to one component record. Avoid claiming full screen coverage because several common atoms have stories.

Keep verification results specific: source-inspected, rendered on web, interaction-tested on Android, or unverified are different facts. If source changes after a capture, retain the capture's original revision and mark affected evidence as needing recheck. Absence of a failure report is not a pass.
