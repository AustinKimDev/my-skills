# Problem and Ideation

## JTBD

Describe the user's situation, progress sought, current workaround, obstacles and expected outcome. Distinguish observed accounts from inferred motivations. A useful prompt is “When [situation], I want to [progress], so I can [outcome].” Validate inferred jobs with evidence rather than turning a feature wish into a claimed user need.

## 5 Whys

Follow a causal question with supporting evidence and allow branching causes. Five is a prompt, not a required count. Stop when evidence runs out; label the remaining chain a hypothesis. Avoid blame, a forced single root cause, or presenting successive guesses as diagnosis.

## SCAMPER

Explore Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, and Reverse/Rearrange against the specific problem. Use only productive prompts; do not force seven outputs. Filter generated options by user value, constraints, risk and validation cost before presenting a small meaningful choice set. AI or personalization is not a mandatory alternative.

Keep the original problem and accepted constraints stable while exploring. Record why the selected direction was chosen and what remains uncertain.

## Worked application: unclear save behavior

Fictional starting request: “I press Save again because I don't know if it worked.” No interview transcript or behavioral log is available.

JTBD hypothesis: while editing a profile, the user wants to know whether the change was applied so they can safely continue. Separate this from the feature wish “show a toast.” Needed evidence is what the user observed, expected and did next; do not invent emotion or motivation as fact.

Use 5 Whys as an evidence-seeking branch: repeat press → uncertain response → possibly missing feedback, a slow operation, or an unrecognized control. Inspect the actual state feedback and available observations to distinguish them. Without those observations, stop with competing causal hypotheses; do not keep asking “why” until a preferred redesign appears inevitable.

Apply productive SCAMPER prompts to the fixed problem:

| Prompt | Candidate | Tradeoff |
|---|---|---|
| Modify | Make pending and final states understandable | Requires state-specific copy and behavior |
| Combine | Pair immediate button feedback with persistent recovery guidance | Adds space and state coordination |
| Eliminate | Remove explicit saving through autosave | Changes persistence and recovery policy; larger scope |

Interpretation: the combined option is a reasonable candidate if feedback/recovery are the cause and explicit saving remains accepted. Autosave is a distinct policy choice, not a routine refinement. A merely reworded button is insufficient if the response never arrives.

Output: the scenario and causal uncertainty, a meaningful option comparison, and selected requirements such as SF-01–04 in [save feedback](../examples/save-feedback.md). After choosing, validate state comprehension rather than assuming it improved.

## Inspected references

Inspected 2026-09-10 through Aside:

- [Christensen Institute — Jobs to Be Done](https://www.christenseninstitute.org/theory/jobs-to-be-done/): supports attention to circumstances, desired progress and functional/social/emotional forces. The short sentence prompt above is a planning aid; it does not replace a JTBD investigation.
- [ASQ — Five Whys and Five Hows](https://asq.org/quality-resources/five-whys): supports iterative problem exploration and that the useful number of questions can differ from five. The evidence stop and branching safeguards are this skill's operational guidance.
- [IMD — SCAMPER](https://www.imd.org/blog/innovation/scamper-method-design-thinking/): supports the seven prompts and moving from a defined problem through idea generation to evaluation. No broad claim of guaranteed innovation or company success causation is adopted from the article.
