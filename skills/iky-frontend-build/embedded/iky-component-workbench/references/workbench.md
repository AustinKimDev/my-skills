# Interactive component documentation

Read this when choosing a host, authoring specimens, or updating the workspace. Build against the actual target runtime; the documentation shell is an adapter around the source library.

## Select the least disruptive host

Inspect existing scripts, runtime versions, story configuration and dependencies before choosing a host. Reuse installed capabilities. Consult current official documentation when exact framework/tool compatibility or unfamiliar APIs require verification; do not hardcode package versions from another project.

| Project condition | Preferred approach |
| --- | --- |
| Working Storybook or equivalent explorer | Extend its stories, docs, controls and navigation. Preserve established IDs and configuration. |
| Existing web app or component preview host | Add a bounded development workspace using the actual exports and project styling/providers. |
| React Native / Expo library | Reuse its existing compatible Expo or native story host. Import the real RN components; record web, iOS and Android verification separately. |
| Another native framework | Use its native preview/catalog facilities for interactive evidence. A browser index may link to native specimens and captures; label captures as static. |
| Source library with no host | Create a minimal compatible development host within authorized scope, or outside the repository when project boundaries require it. Record how to start it. |

An existing host should not gain a public production route merely to expose developer documentation. Follow project conventions for development-only access. Use minimal local providers and synthetic data so previews can run without a live backend or personal credentials. Mock service boundaries rather than replacing the component under review.

If a host needs new dependencies, apply the session's existing approval rules and carry prior authorization forward. Do not silently install Storybook, upgrade the app, restore a deleted product host or change native configuration merely because documentation needs rendering. Prepare independent inventory/docs work while an actual blocking decision is pending; an unavailable preview remains incomplete.

Do not bundle a second, manually styled implementation of the library into an HTML gallery. Framework-neutral HTML is suitable for an index or report, not evidence that a copied React Native component works. Iframe-based shells may link to actual isolated component routes, with clear unavailable/error handling.

## Reader experience

Use a searchable index grouped by the library's real responsibilities. Show a useful initial specimen and let a reader reopen a component/state with a stable URL or native navigation ID. On narrow screens, adapt the navigation without squeezing the specimen. Distinguish the workbench viewport from the target component's available width.

A component page should answer:

1. What task does it serve, and when should it be used or composed differently?
2. What does it look and behave like across the meaningful supported states?
3. Which props, defaults, callbacks and required providers form its public contract?
4. How does a caller use it correctly in a realistic context?
5. Where did the design come from, where is the source used, and what was verified?

Prefer one coherent component page with specimens, API and examples over separate drifting catalogs. Preserve the project's documentation style. New shell styling must remain distinct from specimen styling; do not change product tokens to make the documentation look consistent.

## Author meaningful specimens

Import the actual public export. Provide a small, understandable local harness for caller-owned values and events. Props controls should produce a visible change, such as toggling selection, editing text, changing a variant, or displaying callback output. Provide reset where the example has mutable state; reset must also cancel pending demo work and clear stale errors/results.

Use explicit state fixtures when a controls panel cannot express behavior clearly. Show only meaningful combinations. A single enormous control surface or a matrix of every Cartesian combination is rarely useful. Callback props get a local action log or readable result; users should not need the browser console to know that an action happened.

Do not force unsupported states onto existing APIs. If a real component has no loading state, document that limitation instead of faking one in a wrapper and attributing it to the component. Context examples can own domain state, but explain which behavior belongs to the caller.

Examples of relevant state coverage, selected by responsibility:

| Responsibility | Useful specimens and actions |
| --- | --- |
| Action | Default, disabled, busy; trigger callback; block repeat activation while pending. |
| Field / search | Empty, entered value, validation, disabled; clear; suggestions, keyboard and IME paths only when supported or being implemented. |
| Selection | Off/on, mixed when supported, disabled; change value and show callback result. |
| Async content / upload | Missing, loading, success, confirmed empty and error as distinct states; failure and retry preserve relevant data. |
| Dialog / sheet | Open, confirm, cancel, failure/retry, pending; backdrop, Escape/Back and focus behavior according to the actual policy. |
| Responsive composition | Representative short and long content, narrow and wider layouts, missing media and relevant text scaling. |

Local async demonstrations need deterministic success/failure controls and cancellation/reset semantics. Label them as simulations; they must not suggest real upload, payment, authentication or message delivery. Avoid timers or action logs that grow indefinitely or leak between stories.

Use synthetic content and available project assets. Do not bring personal records, credentials or private media into a publishable catalog. Required backend context should be supplied through bounded fixtures rather than production requests.

## API and usage documentation

Document actual types, requiredness, defaults and callback meanings. Explain controlled values and ownership where misuse is likely. Link canonical types/source when detailed duplication would drift. Usage examples must use valid exports and props, include necessary providers and show realistic caller state; verify them through the host's compile/type checks when available.

Show at least one useful usage example per component. Add a contextual composition when it clarifies layout, ownership or behavior; do not manufacture a whole product screen for every atom. Include relevant accessibility semantics and keyboard/touch behavior, distinguishing implementation inspection from tested assistive-technology behavior.

Allow copying code with visible success/error feedback when the host supports it. Keep source/design links safe and functional in the chosen environment. A local filesystem path alone is not a working web hyperlink; use project source integration, an actual repository URL, or copyable path text as appropriate.

## Preview controls and environment limits

Expose only controls that the renderer can truthfully apply:

- Width presets or a resizable container for the actual target layouts; a native device selector if available.
- Existing light/dark or other appearance modes; do not add product theming solely for documentation.
- Supported text scaling and reduced-motion settings or clearly labelled simulations.
- Meaningful props, state/scenario selection and reset.

For a new mobile-target workspace, inspect a relevant 320–430px layout and a wider composition. Otherwise derive widths from the target product. Browser zoom or CSS resizing does not certify native Dynamic Type, safe-area, keyboard or gesture behavior. A web renderer's successful build is separate from native runtime testing.

Missing fonts, assets or providers should produce a visible diagnostic or an explicitly unavailable specimen, never a silent blank panel counted as documented. Label reference screenshots and historical captures; show their revision and avoid stretching or cropping whole component evidence to imply fidelity.

## Incremental maintenance

When adding a component, register it in the existing navigation/catalog, connect its public source, add props/states/examples, and link its design/consumer references. For an extension, update the affected contract and specimens in place, preserve earlier behavior and inspect relevant consumers. Do not recreate the shell for every request.

When an API changes, update imports, examples and affected controls together. Retire removed states intentionally; preserve stable links or provide an explicit replacement where feasible. Keep historical comparisons separate from current specimens. A refreshed page does not mean an agent continuously watches for requests or automatically implements new variants.

Store the runtime command, required configuration and checks in the host's existing documentation. For temporary hosts, record their location and lifetime limits. For ongoing work, save remaining coverage and current decisions in one continuation record rather than duplicating the inventory.

## Verification and completion

For a new host, check navigation/search, a component/state deep link, changing controls, reset, action output and any copy-code action. Test keyboard access and relevant narrow rendering. Verify an unavailable/failed preview path if the host loads isolated routes or assets that may fail.

For component implementation changes, exercise the changed interaction plus relevant disabled/pending/failure/return paths. Check actual rendered results, focus and layout where affected. Use existing targeted automated checks; add regression tests when they meaningfully protect behavior. Documentation-only work should not trigger unrelated application audits or broad suites.

Check inventory coverage against the requested inputs. Confirm that specimens import actual source and examples remain valid. Record pass, fail, unverified or not applicable with the environment and evidence. Previously passing screenshots are not fresh checks after source/runtime changes.

Finish with a running URL when available, file location, reproducible start command, scoped implementation summary and material verification limits. State a blocked runtime plainly while still delivering completed inventory/docs work. Do not equate generated documentation with completed product integration, native parity, publishing or deployment.
