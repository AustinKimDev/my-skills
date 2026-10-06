# Overlay behavior and confirmation contract

Status: current portable IKY guidance, authorized by the user on 2026-09-09. The motivating case was inconsistent request/withdrawal confirmations in one mobile attendance flow. The portable correction is consistent task semantics, presentation selection and lifecycle ownership; the product's attendance fields and brand are not universal defaults.

## Principle

Choose presentation from the user's task and environment, not from the component a developer happens to import. Equivalent actions in the same context use one confirmation anatomy, button hierarchy and lifecycle. Platform adaptations may change the host while preserving that contract. Existing explicit project decisions take precedence; an unexplained mixed implementation is not an established exception.

A popup is an imprecise description. Identify whether the task is a confirmation, contextual choice, short edit, blocking notice, transient result or independent screen before selecting a host.

## Selection matrix — OVERLAY-01

| User task | Default presentation | Boundary |
| --- | --- | --- |
| Confirm an action, withdrawal, cancellation or deletion in the current workflow | One shared task-confirmation composition: bottom sheet in compact touch layouts; centered dialog in spacious desktop layouts | Request and withdrawal remain the same family. Destructiveness changes consequence copy and action emphasis, not the host. A documented project policy may choose dialogs for both. |
| Choose among contextual actions or values | Anchored menu/popover when a usable anchor and space exist; action/selection sheet in compact touch layouts | A menu selects the next action; its destructive action may enter the shared confirmation step. It is not itself a second confirmation design. |
| Enter a short form or inspect local details | Sheet or dialog using the same environment policy | Grow with content within the usable viewport. Promote a long, independent or multi-step task to a screen; do not bury essential actions below a fixed-height overlay. |
| Confirm that an ordinary operation succeeded | Update the affected content, optionally with a nonblocking toast | Do not require another confirmation tap for an ordinary success. Use an explicit receipt/detail screen when the result itself requires review. |
| Recover from a form or request failure | Inline error in the owning form/confirmation with retry | Preserve values and context. Do not switch from sheet to alert merely because a request failed. |
| App-wide blocking interruption requiring an immediate decision | Shared blocking dialog/guard, independent of a local task form | A session interruption or other documented global condition can justify this. Severity words alone do not make every error a blocking dialog. |
| OS-owned permission, payment, share or authentication UI | The actual platform/system surface | Do not imitate or replace required system UI to achieve visual uniformity. Coordinate dismissal and return to the app. |

The same task on mobile and desktop may legitimately use different hosts. The same mobile request and its withdrawal must not use a sheet and a centered alert solely because two APIs are convenient. Do not mechanically convert every alert into a sheet: classify first and preserve cancellation and callback semantics.

## Confirmation composition — OVERLAY-02

Use shared header, body and action-row components within a platform adapter. Keep title scale, body spacing, radius, safe-area treatment and action placement consistent for equivalent tasks; domain content may differ.

- Name the action and object in the title. Include consequential context such as the affected item, amount or effective time only when relevant. Do not invent missing values.
- Distinguish the original request time, the proposed effective time and the eventual processing time. A displayed submission snapshot must match the submitted value; a live/server-receipt estimate must be labelled accordingly.
- Explain the actual consequence before committing. Do not label a reversible withdrawal irreversible, or confuse closing a confirmation with cancelling an existing request.
- Default two actions to a horizontal row with separate hit targets: neutral return/dismiss on the leading side, explicit commit action on the trailing side, respecting locale direction. Use action-specific labels rather than two generic confirmation/cancellation words.
- A primary action has the selected project/IKY filled emphasis; destructive actions use the danger treatment when consequences justify it. Return stays visually secondary. Use dedicated on-action text/icon/progress foregrounds. Merely accepting a `secondary`/`danger` prop is not compliance: it must visibly change the rendered control.
- Stack only when available width, localization or enlarged text cannot preserve readable unbroken labels and target sizes. Treat that as responsive behavior, not a different feature-specific style.

## Content sizing and navigation — OVERLAY-03

Default short confirmations to content height with a usable-viewport maximum accounting for safe areas and the software keyboard. Use deliberate detents only for tasks that benefit from expansion, such as a long list. Do not leave a large empty fixed-percentage sheet for a short confirmation.

Keep the action row reachable while the body scrolls for long content. Avoid self-expanding layout loops between dynamic sizing and flex/percentage-height children. Verify long copy, enlarged text and a visible software keyboard; input focus alone does not prove keyboard safety.

A dependent action must be visibly entered, not appended beneath off-screen detail content. Reuse an in-host next step when it preserves the workflow. A child sheet is appropriate when the detail must remain available as the return context and the platform host supports it. Do not impose nested sheets on every task.

## Ownership and asynchronous state — OVERLAY-04

One topmost task surface owns interaction and focus. A preserved parent is inert while its child is active. Closing a child returns to the parent with its scroll, selection and input intact. Dismiss the parent too only when the action's actual success/navigation contract requires it.

- Capture the intended operation once and prevent duplicate commits while pending. Dismissal policy must be explicit: if interrupting would lose an in-flight operation, block return, backdrop, swipe, Escape and system Back consistently; otherwise preserve and reconcile that operation across dismissal.
- Failure keeps the owning task open with entered values and a retry path. Success updates the source state, dismisses the appropriate surface and restores a usable screen/focus. Do not close a confirmation on dispatch and then lose its failure state.
- Serialize host transitions through actual dismiss/presentation completion callbacks when required by the native platform; do not use arbitrary timeouts to mask competing presentation transactions.
- Reuse the application's overlay coordinator for incoming calls or other priority surfaces. A direct library Modal must not silently bypass preemption, Back, focus or cleanup policies.
- Restore focus to a valid trigger/return target. Support the applicable accessibility boundary, keyboard dismissal and reduced motion. Backdrop behavior follows the same pending/dirty-state policy as visible controls.

## Implementation boundary — OVERLAY-05

One semantic confirmation interface per compatible adapter should carry content, action labels/tone, busy/error state and dismissal policy; the host adapts to the environment. This does not require one widget package across React, React Native and Flutter.

Before adding another abstraction, inventory equivalent callers and follow their actual imports through aliases, shims and providers. A function named native Alert may render an app-owned dialog; two toast APIs may reach the same host. Reuse or deepen existing components before adding a parallel confirmation component. Do not migrate system pickers, viewers, editors and confirmations as if they were the same task.

For a scoped repair, check equivalent entry points and the failure/return paths in that feature. For an authorized global migration, record a caller inventory and migrate by semantic family, retaining async and platform behavior. Skill maintenance or an audit alone does not authorize a product-wide rewrite, dependency change or release.

## Audit and evidence — OVERLAY-06

Compare paired tasks in the same environment (for example request/withdraw, delete/return, save/failure), not isolated screenshots alone. Check selected host, actual action hierarchy, effective data, busy repeat activation, failure/retry, child return, final dismissal, priority interruption and focus restoration. Include short/long content, narrow width, enlarged text and visible software keyboard where relevant.

Use pass/fail/unverified/not-applicable with the specific source and observed state. A source scan proves implementation divergence, not native behavior; call-site counts are not counts of defective user flows. An untested required platform remains unverified. See [the audit matrix](audit.md#overlay-consistency-and-lifecycle).

The existing bundled HTML remains a visual reference for its recorded specimens. These selection/lifecycle rules extend the textual contract; that bundle does not demonstrate or certify every mobile child-sheet or asynchronous task flow. Its original capture provenance remains intact.
