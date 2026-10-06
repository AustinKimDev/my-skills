> Bundled supporting guide. Preserve the calling workflow's scope and project authority. Use [local support](references/dependencies.md) for named dependencies; this guide does not grant additional tool or mutation permissions.


# Component Workbench

## Bundled support

Read [the dependency map](references/dependencies.md) when a step calls for another skill. The required guides and resources are included in this folder; load only the relevant support and keep this workflow primary. Resolve a supporting guide's scripts and assets from its own directory. Runtime tools and project packages still come from the active environment.


Deliver a browsable, interactive reference connected to the project's actual component source. Readers should be able to find a component, exercise its meaningful states, understand its public API, copy a valid usage example, and trace it to design evidence or existing consumers. A Markdown inventory or screenshot gallery alone does not satisfy a request for a Storybook-like workspace.

Write agent-facing guides in English. Use the user's language and project locale for the workspace and user-facing documentation. Preserve the project's framework, design rules, component boundaries, and naming; a previous project's palette, font, navigation, component count, or package layout is not a portable default.

## Select the input path and mutation scope

Infer the path from the request and available inputs. State it briefly; do not repeat a questionnaire when the supplied material is sufficient.

| Path | Inputs | Work |
| --- | --- | --- |
| Design → components + docs | Selected mockups, iky-screen-flow catalog, iky-ui-design decisions, screenshots or prototype | Identify shared component families, inspect for existing equivalents, implement the requested missing components, and document them with live specimens. |
| Existing components → docs | Source package, exports, stories or application components | Inspect public behavior and consumers; document the scoped components with live specimens. Preserve production implementation unless changes were requested. |
| Design + existing → reuse and extend | Both design evidence and component code | Map design needs to existing APIs; reuse, compose, extend or add within the requested scope; update one coherent workspace. |

Inputs do not grant permission to change components. A documentation-only request with mockups remains documentation-only: report mismatches and proposed additions. A request to build or add components authorizes those scoped implementations without another routine confirmation. Honor the session's boundaries for dependencies, public API changes, publishing and deployment.

An invocation to add one component updates the existing inventory and stories; it does not regenerate the library or redesign the documentation shell. If the stack is unknown and choosing it would change the intended product, clarify that decision while continuing the design inventory.

## Discover and map before building

Read [discovery.md](references/discovery.md) for extraction, source inspection, and reuse decisions. Inspect the actual supplied screens and relevant source, not only their titles or filenames.

- For `iky-screen-flow` output, use stable screen IDs, selected images, states and transitions from its catalog and current decision record. Resolve files relative to the artifact. Do not turn every screen into a component or regenerate its mockups.
- For `iky-ui-design` output, use the selected direction and current project authority. Alternatives are evidence, not simultaneous requirements. Label unresolved design choices rather than silently selecting a new theme.
- For existing code, inspect exports, implementation, types, providers, styles, consumers, tests and any existing stories. Prefer the environment's code graph when available; fall back to targeted source search when needed. Types alone do not prove behavior.

Keep traceability in the project's existing format, or create a small component inventory when none exists. Record stable component IDs, source/export, design references or consumers, reuse decision, public contract, meaningful states, specimen links, and verification evidence. Keep proposed, implemented and verified separate. Account for all components in the requested scope; do not silently document only the easiest exports.

Avoid copying an existing design authority into a competing rulebook. Link the original tokens, design decisions and source API. Record scoped decisions once, next to the maintained library or workbench.

## Implement only the required component work

The effective design order is user direction → project settings → the selected design workflow. Use [bundled iky-ui-design](../iky-ui-design/GUIDE.md) for unresolved implementation/design choices, or the user's selected alternative. Reusing established components for documentation does not start a design exploration, style migration or full audit. If the design workflow requires additional references, follow it only for the affected decision.

Prefer existing primitives and compatible composition. Add a component when there is a distinct reusable responsibility; add a variant when semantics and state are genuinely shared. Preserve public contracts and existing consumers. Do not flatten business logic into atoms or introduce a universal cross-platform package solely to host documentation.

Implement the interaction needed to complete the component's task, not just its initial appearance. Model controlled values, callbacks, focus, pending, disabled and failure/retry behavior where relevant. Domain fetching, credentials and persistence stay with callers. Label local simulations and preserve drafts on recoverable failures. A component's visual similarity does not establish a working search service, payment flow or message delivery.

## Build the interactive documentation

Read [workbench.md](references/workbench.md) for host selection, specimen anatomy, controls and verification.

Use an existing Storybook or equivalent host when it fits the project. Otherwise create a small host in the established stack that imports the real components. Storybook-like describes the interaction and documentation outcome; it does not mandate installing Storybook, switching frameworks, or copying production components into a static showcase. If a new host/dependency decision is unresolved, complete the inventory, component contracts and other independent work while resolving that boundary.

The workspace provides:

- A searchable component index, stable links, grouping appropriate to the library, and honest implementation/verification status.
- Live isolated specimens with useful props and state controls, reset, and visible action results; contextual compositions where they clarify usage.
- Purpose, API/props with actual defaults, variants, state behavior, copyable usage examples, accessibility notes, and source/design references.
- Relevant width, appearance, text-size and motion checks supported by the target platform. The documentation shell must not alter the specimens' theme or typography.

Use synthetic local fixtures with clearly labelled simulated requests. A demo must not send real messages, place orders or mutate production data. Do not call hardcoded screenshots interactive, or present an unavailable runtime as a working preview.

## Extend, verify and hand back

For additions or corrections, preserve component IDs, deep links, accepted designs and unrelated stories. Update the inventory, implementation when authorized, examples and evidence together. Preserve prior before/after captures under their original revision when a comparison is requested. Do not create a separate competing catalog for each addition.

Run checks proportional to the touched behavior and the project's requirements. Exercise actual specimen actions and relevant failure paths, check affected renders in the target runtime, and verify search/navigation/deep links in a new host. A static build or web preview does not establish native parity. Report unavailable checks separately from failures or passes.

Use the session's approved browser workflow. Follow the [browser runtime guide](../browser-runtime/GUIDE.md); in Orca, resolve the owning workspace and pin its page ID. Serve only the intended artifact/host using the project's port conventions; retain a repeatable command, not merely a transient localhost URL.

Deliver the workspace URL if running, source location and restart command, what was reused/added/changed, checks actually performed and material limits. Component documentation does not establish product integration or deployment. Stop after the requested coverage and applicable checks are complete.

## Invocation examples

- `$iky-component-workbench 이 iky-screen-flow 시안에서 공통 컴포넌트를 추출해 구현하고, 상태를 조작할 수 있는 문서를 만들어줘.`
- `$iky-component-workbench packages/ui의 기존 컴포넌트를 읽고 Storybook처럼 보여줘. 컴포넌트 구현은 수정하지 마.`
- `$iky-component-workbench 이 iky-ui-design 시안과 기존 컴포넌트를 비교해서 재사용하고, 빠진 것만 추가한 뒤 기존 문서에 합쳐줘.`
- `$iky-component-workbench 기존 문서에 파일 업로드 컴포넌트를 추가하고 업로드 중·실패·재시도 상태도 보여줘.`
