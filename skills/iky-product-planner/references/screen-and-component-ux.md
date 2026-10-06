# Screens and Component UX

Start by distinguishing a single usage from a shared component change. Resolve from context or ask when the difference materially changes scope. Inspect representative consumers for shared changes.

## Planning responsibility

Define the action's purpose, eligible actors, conditions, user-visible state changes, completion/failure/cancel/retry behavior, and impact on connected flows. Consider discoverability, understandable labels, input methods, feedback, error prevention/recovery, and consistency as relevant to the task.

A button's appearance cannot decide whether an operation may be repeated or reversed. Conversely, purely visual or focus-state corrections may need only iky-ui-design, without a new PM process.

## Screen specification

Assign stable screen/action identifiers where cross-references help. Connect content priorities and low-fidelity regions to behavior and policy. Cover relevant entry, exit, back navigation and retained context. State coverage is contextual: mark loading, empty, error, partial, disabled, pending, success, conflict or offline as applicable with reasons, not as mandatory features.

Show before/after for improvements. Use representative content lengths and label illustrative data. Include mobile/desktop variants only for target environments in scope. A browser prototype of native UI does not verify native layout or interaction.

## UI expertise boundary

Read [integrations.md](integrations.md) when detailed visual, accessibility, layout, motion or interaction decisions need iky-ui-design. Forward settled goals, policies, constraints, prior decisions, target environment and exact unresolved questions. Do not duplicate its design system or expert guidance here.

A low-fidelity planning review does not trigger a full visual exploration. For a scoped UI comparison, specify the intended number of options explicitly; otherwise respect the selected UI workflow's defaults. Keep product policy alternatives distinct from UI design alternatives.
