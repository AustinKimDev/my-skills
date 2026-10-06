# Planning Specification

This is input to downstream PRD work, not the formal PRD publication workflow. Use the existing project format. Include only relevant sections, but do not omit required behavior to keep a document short.

## Content contract

- Purpose: user problem, affected audience/context, supporting evidence, and business/operational concern where relevant.
- Goals: intended outcome, success definition, available baseline, target rationale, measurement window or explicitly unresolved values.
- Decision: selected solution, alternatives considered and reasons, accepted/proposed status.
- Scope: included behavior, exclusions, conceptual dependencies and known constraints.
- Scenarios: actor, entry/preconditions, action, expected result, cancellation/failure/recovery/return where relevant.
- Requirements: stable ID, precise trigger/conditions, visible or operational outcome, applicable policy, and acceptance criteria.
- Policies: actors/permissions, states and allowed transitions, boundary conditions, exceptions, operational resolution.
- Screens: purpose, content priority, actions, conditional visibility, connected destinations, relevant state views.
- Validation: checks actually performed, outcomes, evidence limits, and separate effectiveness hypotheses.
- Open questions: specific missing decision/evidence, affected scope, and how it can be resolved.

Use project terminology. Do not invent participants, deadlines, legal conclusions, metrics, APIs, schemas, or architectural commitments. Describe required behavior and confirmed constraints; downstream engineering determines implementation modules and testing decisions.

## Existing changes

Identify baseline → problem/evidence → proposed change → affected flows/policies → acceptance. Preserve unaffected behavior explicitly only when useful for assessing regression risk. A component-library change requires a relevant consumer inventory; a single-screen change does not authorize a global rewrite.

## Acceptance

Write observable, falsifiable outcomes: given a meaningful condition, when an action occurs, then the expected result follows. Include relevant negative paths. Distinguish a functional acceptance condition from an outcome metric; correct navigation does not prove improved retention.

Example (illustrative): Given an authorized user and an in-progress save, another activation does not initiate a duplicate operation; a failed save preserves entered values and exposes a retry path. Whether this policy is appropriate must be decided for the actual product.

## Deepen where behavior branches

When permissions, time boundaries, asynchronous outcomes or operational exceptions affect the result, read [policy-and-exceptions.md](policy-and-exceptions.md). Link the consequential condition rows to requirements and acceptance scenarios. Do not expand every simple action into a full matrix.

For a complete bounded example, read [save-feedback.md](examples/save-feedback.md). For a connected user/admin policy change, read [reservation-cancellation.md](examples/reservation-cancellation.md). These are fictional Korean deliverables. Reuse their level of specificity and traceability, not their rules, numbers or decisions.
