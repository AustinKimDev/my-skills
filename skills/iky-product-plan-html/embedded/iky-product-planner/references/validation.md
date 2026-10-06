# Validation

## Three separate claims

1. Planning review: goals, logic, completeness, consistency and plausibility have been checked.
2. Implementation verification: observed behavior matches specified acceptance conditions in a named environment.
3. Effectiveness validation: user or measurement evidence supports the intended outcome within stated limitations.

Never substitute one for another. SMART completion or a SWOT analysis does not prove demand. A static source review is not runtime verification. An untested path is not a pass.

## Before delivery

Check the relevant scope for evidence/assumption clarity; goals and exclusions; actor/permission/state consistency; entry/completion/cancel/failure/return; operational handling; agreement between specification and views; and observable acceptance criteria. Resolve ordinary omissions within authorization. Ask about policy or scope changes, rather than silently introducing them.

Record finding, evidence, impact and resolution. Use pass/fail/unverified/not-applicable for applicable checks and keep user acceptance separate. Do not require every possible state for every component.

For consequential branches, use [policy-and-exceptions.md](policy-and-exceptions.md) and follow a sample chain from policy condition → requirement → screen state → acceptance outcome. Look specifically for contradictions and conflation of confirmed failure with an unknown operation result. A completed example is a quality reference, not evidence that an agent followed the skill successfully in an independent trial.

## Implementation review

Establish the exact specification revision and target environment. Compare expected and observed results with evidence. Avoid live side effects outside authorization. Report regressions and untested paths. UI rendering and input verification belong with the relevant UI workflow; do not mark native verified from HTML.

## Outcome evaluation

Use [methods/index.md](methods/index.md) to choose a method. State hypothesis, evidence needed, observation/measurement procedure, decision criterion, guardrails, and limitations. If data are missing, deliver a concrete validation plan rather than a fabricated result. An inconclusive result remains inconclusive. No external experiment, tracking instrumentation, recruitment, or implementation is automatically authorized.
