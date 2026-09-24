# Conditional Behavior and Exceptions

Use this procedure when a result varies by role, state, time or operation outcome. Start from the accepted task and observed system. The procedure discovers questions; it does not authorize adding policies, retention behavior or new features.

## Find the consequential branches

1. Identify the affected entity and its lifecycle, the initiating actor, the action and the user-visible outcome.
2. List only factors that can change eligibility or results: ownership/permission, current state, meaningful time boundaries, input validity, concurrent changes and external response certainty.
3. Partition each factor into behaviorally distinct cases. For a cutoff, consider before, exactly at and after it. Do not invent a time zone or authoritative clock when none is known.
4. Describe the normal path, then vary one factor at a time. Add interacting cases where they matter, such as a permission change while an operation is pending. Avoid an exhaustive Cartesian product of irrelevant combinations.
5. Put observed rules and proposed rules in separate columns or explicitly label their status. Ask about unresolved rules that change the outcome; reuse established decisions for the rest.

## Conditional outcome table

Use the project's existing format, or these fields when helpful:

| Case ID | Actor and preconditions | Event/condition | Allowed? | Resulting state | Visible feedback and return/recovery | Decision/evidence |
|---|---|---|---|---|---|---|

Every material row needs a concrete outcome or a named unresolved decision. “Handle appropriately” is not an outcome. Link related requirement, screen and acceptance IDs without inventing a new ticket taxonomy.

## Check operation certainty

Distinguish a confirmed rejection/failure from an unknown outcome. A timeout or disconnected client alone does not prove that the operation failed. Determine the required user-facing reconciliation behavior before allowing retry; do not prescribe an API or database mechanism. If feasibility is unknown, record the requirement and the exact technical question.

Check repeated activation, stale views, leaving/reopening the flow, and another actor changing the entity where relevant. Preserve user-entered data according to an explicit policy. Do not add indefinite storage, live monitoring, offline queues or support workflows without a real need and authorization.

## State transitions and invariants

For stateful work, write current state → event/guard → next state → side effects. Separate domain state (for example a canceled reservation) from transient UI state (a pending request). Name business invariants such as “a canceled reservation cannot be canceled a second time.” Identify which actions are unavailable and how users understand why.

For operational recovery, state the responsible role and permissible resolution. Unknown actors or support capabilities remain open questions; never promise a capability merely to complete an error state.

## Review and acceptance

Turn consequential rows into Given/When/Then scenarios. Trace selected policies to affected screens and acceptance criteria. Check that the same condition does not produce contradictory results across views and that every changed transition has a completion or unresolved-result route.

Stop once the relevant branches are covered. A result depending on an unresolved business rule is a planning blocker for that path; an undecided implementation mechanism is a downstream engineering question. Neither means all other planning must stop.

See the condition and transition tables in [reservation-cancellation.md](examples/reservation-cancellation.md), including the exact start-time boundary and result-unknown case. The [save-feedback example](examples/save-feedback.md) shows when a smaller table is sufficient.
