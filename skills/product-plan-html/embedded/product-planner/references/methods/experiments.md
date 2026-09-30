# Experiments and Measurement

State the hypothesis before proposing an experiment: audience/context, proposed change, expected observable outcome, and rationale. Define what result would support, challenge or leave it unresolved.

Choose evidence proportional to the question: task-based usability review for discoverability/flow, interviews for context and needs, existing behavioral data for patterns, or a controlled experiment when causal impact and an adequate setup matter. Do not assume an A/B test is always feasible.

Record baseline availability, metric definition and denominator, exposure/population, observation window, decision criterion, guardrails and practical limitations. Separate functional acceptance from product outcomes. Small convenience samples or observational correlations do not establish general causal effects.

If a plan requires traffic, instrumentation, recruitment, permissions or expertise not available, record that dependency and what can be learned now. Planning does not authorize live experiments or new data collection. Actual analysis requires real supplied or authorized data, not simulated metrics passed off as findings.

Report supported, contradicted, or inconclusive with evidence and limits; propose the next decision. A prototype can test comprehension and flow but does not establish production reliability or adoption.

## Worked application: a planning usability check

Fictional proposal: combine button feedback with persistent save-result guidance. Hypothesis: participants can distinguish pending, saved, definitely not saved and unknown outcomes and choose a safe next action.

- Task: edit a profile name and attempt to save. Present the relevant outcome without coaching the participant to the recovery control. Ask what happened and what they would do next.
- Observe: state interpretation, repeat-save attempts, recovery choice, and whether they believe an unknown result is definitely a failure. Record behavior before prompting for explanations.
- Definition: state-identification rate = correctly identified presented cases / presented cases, with the case set and participant context disclosed. Do not mix differently sampled cases into an apparently comparable score.
- Decision: define the intended acceptance bar before running the check. A participant interpreting unknown as confirmed failure is a specific safety-of-action finding to investigate; it is not automatically a population failure rate. Do not invent a universal sample size or percentage threshold.
- Limit: the local prototype cannot verify persistence, network reconciliation, browser re-entry or production accessibility. Those require appropriate implementation checks.

No participants or results are supplied, so the deliverable is a protocol and open evaluation criteria, not a passed test. Functional scenarios in [save feedback](../examples/save-feedback.md) remain separate from this effectiveness check.

For a later outcome check on [reservation cancellation](../examples/reservation-cancellation.md), define self-service completion and operational contact measures with eligible populations and a time window. Compare like populations and document concurrent changes; a before/after drop in support contacts alone does not establish causality.
