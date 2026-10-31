# Three-camp panel

Use when the owner asks for a wide review, or for a plan that later work will copy. Default budget: at most 20 agents including cross-readers. The owner's number overrides it.

## Camps

- **Opposing:** argues against the plan. Rival route with cost and reversal cost, pre-mortem, executive challenge, the hurt customer.
- **Collaborating:** the functions that inherit the result. Support, finance, legal, security, backend, data, design, app, the daily operator, QA.
- **Rival:** a product lead at a competitor. Compares with real products and says what to copy, what not to copy, and how they would attack.

## Briefs

- Give each agent a distinct question, files and an evidence task, not a character. Persona prompts rarely improve factual accuracy, and irrelevant persona detail can hurt, so the value comes from what each agent is told to check.
- Give each agent a job that can fail: verify these numbered facts, sample these rows, count the hops for these five inquiries.
- Rival briefs must require opening at least two primary sources, cited with URL and date. Without them the comparison is `guess` and the report must say so.
- Output: 강점 / 약점 / 개선, at most 15 lines, each `위치 - 발견 - 등급 - 조치`, severity H, M or L on weaknesses, then what was not checked.
- State the project's bans in every brief, so reviewers do not propose what is ruled out.

## Rounds

1. Launch every Round 1 agent in one message, blind to the others. Studies of LLM debate attribute most of the gain to independent answers plus aggregation, and report conformity when agents see each other.
2. Save all reports to the thread file before synthesis.
3. Count independent convergence: the same weakness from different camps outranks one loud finding.
4. Cross-read only disputed H findings, with at most three agents. Never run a free debate.
5. Verify every H and every `guess` yourself before acting.

## Report

Lead with the converged weaknesses, then strengths to protect, then improvements ranked by cost. Separate plan changes you made from decisions the owner must take. State who did not open what.
