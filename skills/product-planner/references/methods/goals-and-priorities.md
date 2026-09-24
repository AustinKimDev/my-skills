# Goals and Priorities

## SMART

Check Specific, Measurable, Achievable, Relevant, Time-bound. Capture target audience/action/outcome, measurement definition, feasibility evidence, relation to the problem, and time window. Missing baseline or target is an explicit open item. Never invent a percentage to make a goal look measurable. SMART checks goal formulation, not desirability or causal impact.

## RICE and ICE

RICE compares reach × impact × confidence / effort. Define the common reach window, impact/confidence scales, effort unit and evidence for estimates before ranking. Use sensitivity checks where uncertain estimates could reverse order. Missing evidence is not a zero score.

ICE compares impact, confidence and ease. State the scoring convention and consistent scale; conventions vary. Treat scores as decision aids, not measured truth. Do not compare incompatible scales or let numerical precision conceal weak evidence.

## MoSCoW

Classify Must, Should, Could and Won't for the stated release/timebox. Explain what makes a Must indispensable and consequences of deferral. Won't means excluded from this scope, not permanently rejected. Check dependencies and available capacity; avoid marking everything Must.

Produce a proposed order or scope with rationale and uncertainty, not executable issue slices. User choices and actual constraints outrank an arbitrary score.

## Worked application: save feedback

Fictional input: the [save-feedback specification](../examples/save-feedback.md) has no measured baseline or release date. Question: is “make saving clearer” ready to use as a goal?

| Check | Application | Interpretation/action |
|---|---|---|
| Specific | Editing users must distinguish pending, applied, not applied and unknown outcomes | Connect the goal to SF-01–04 |
| Measurable | Observe correct state identification and successful recovery; no baseline is available | Define the observation, leave target improvement unresolved |
| Achievable | Pending feedback is describable; prior-operation reconciliation capability is unknown | Carry a feasibility question for SF-04, not a guessed API |
| Relevant | Feedback and recovery address the stated uncertainty | Preserve that problem rather than adding unrelated visual polish |
| Time-bound | No agreed evaluation window | Ask when it is needed for an outcome commitment; do not invent a date |

Result: behavioral acceptance can be written now; a time-bound outcome commitment remains incomplete. The Korean deliverable should use the scenario-specific goal and missing inputs in the linked example rather than a generic slogan.

For prioritization, first compare minimum feedback/recovery with automatic retry. Apply MoSCoW within the agreed save-feedback scope: preventing repeat activation is a candidate Must, clear recovery is a candidate Must, decorative success motion is a Could, and offline draft synchronization is Won't for this scope. These are proposed classifications, not approvals. Confirm whether an unknown-outcome path can be resolved before calling that path ready.

## Worked scoring and its limit

Illustrative RICE inputs only: option A reaches 100 users/week, impact 2, confidence 0.5, effort 2 person-weeks → score 50. Option B reaches 50 users/week, impact 3, confidence 0.8, effort 4 person-weeks → score 30. The priority is conditional: if A's confidence is only 0.2, its score becomes 20 and the rank reverses. The useful next step is resolving A's uncertainty, not presenting 50 as a measured business benefit.

For an ICE comparison, explicitly choose a convention, for example multiplying three consistently defined 1–5 scores, and document what each score means. If confidence is unsupported, provide a qualitative comparison and the missing evidence instead of fabricating an ICE total. Map the chosen priority into product scope, not implementation tickets.

## Inspected references

Inspected 2026-09-10 through the user-selected Aside browser:

- [CDC — Design Training: Learning Objectives](https://www.cdc.gov/training-development/php/about/design-training-learning-objectives.html): supports the Specific/Measurable/Achievable/Relevant/Time-bound interpretation. This source addresses learning objectives; applying those questions to product outcomes is this skill's adaptation, not a CDC product-development standard.
- [Intercom — RICE](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/): supports the factors, consistent reach period, confidence, effort and comparative scoring. The worked numbers and person-week unit are illustrative adaptations, not Intercom data or its original person-month convention.
- [Agile Business Consortium — MoSCoW](https://www.agilebusiness.org/resource/what-is-moscow-prioritization/): supports the four categories and explicit timebox. No delivery guarantee or effort-percentage recommendation is imported as a universal skill rule.

ICE has no newly inspected primary attribution in this revision. Its illustrative scale is a declared local convention; verify the user's intended variant before presenting it as a named source's formula.
