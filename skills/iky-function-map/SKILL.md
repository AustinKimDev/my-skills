---
name: iky-function-map
description: Rebuilds an existing product, admin console or back office on paper before any screen is drawn. Inventories every function from code, separates work units from processes, recombines them into surfaces, and closes owner decisions with evidence. Use when the user wants functions analyzed, separated, classified and recombined, says a console should be treated as built from scratch, or asks for a function map, for example "기능분석/기능분리/기능분류/기능 재조합", "업무 단위와 프로세스 분리", "어드민 처음부터", "백오피스 재구성", "기능 지도". Not for one new feature (iky-product-planner) or screen design (iky-ui-design). Stops before implementation.
---

# IKY Function Map

Treat the current product as evidence of what exists, not as its structure. Separate what must be accountable from how work flows, recombine, and draw screens last. Write dialogue and deliverables in the user's language; the examples here use Korean headers because the validator expects them.

## Working contract

- Keep four kinds of statement apart: fact (file and line), proposal, accepted decision, unknown. Label proposals even inside a decision table.
- Menus and screens are evidence. Do not inherit them as structure.
- Generate every count with a script. Never type a total by hand.
- Save to the project's planning location, for example `docs/planning/<name>/`. Treat the markdown spec as the authority.
- Do not design screens, change code, or start server design in this skill.

## Workflow

Copy this checklist and track it:

```
- [ ] 1 Outcomes and operator
- [ ] 2 Hold screen work
- [ ] 3 Inventory every function
- [ ] 4 Measure use
- [ ] 5 Work units
- [ ] 6 Processes
- [ ] 7 Recombine
- [ ] 8 Check facts
- [ ] 9 Close decisions
- [ ] 10 Plan delivery
- [ ] 11 Validate and publish one page
- [ ] 12 Report and stop
```

### 1. Outcomes and operator

Write one to three outcomes and one sentence on how the operator's day changes. Ask how many people operate it and on which device. A rebuild with no named outcome drifts into feature parity, a common cause of failure in replacing old systems.

### 2. Hold screen work

Pause mockups and direction picking. Record the hold in the design brief so a later session does not resume them.

### 3. Inventory every function

Fan out by area, using one agent per area and a fixed row format ([row formats](references/row-formats.md)). Also list what is not a screen: notifications that bring the operator in, scheduled jobs that need a person, deep links, and operator work done outside the console.

Cross-check by machine: every route and server endpoint has a row or a stated exclusion.

### 4. Measure use

For each area, get volume and frequency from logs or a read-only query. With no data, take the operator's estimate and label it `추정`. Do this before dispositions. Usage decides what to keep; without it every row weighs the same and "keep" becomes the default.

### 5. Work units

A work unit is an object plus an accountable result, and its done state fits in one sentence. Name it with a noun; it has no time order. With one operator, units separate attention, not people. A unit is not a menu.

Inheritance test: list units whose functions all came from one old screen, and justify each or split it.

### 6. Processes

A process is a time-ordered chain of steps. Give each step a unit, an actor and a state: 있음, 끊김, 없음, 밖, 안 함. Keep units and processes linked but separate: one process crosses many units and one unit serves many processes.

Label single-unit flows as such rather than counting them as crossings. State which units no process touches.

### 7. Recombine

- Give every row one disposition and a reason: 유지, 합침, 연결, 공통, 구현 필요, 조건부 제거, 제거.
- List new functions (N) and shared capabilities (X) apart from the rows.
- Give every 끊김 or 없음 step an answer in a `해결` column: an N, an X, a decision, `안 고침` with the reason, or `답 없음` until one exists. The validator rejects a blank and warns on `답 없음`.
- Rank each N by what stays blocked each month without it.
- Mark rows that should be a rule rather than a screen, so the operator sees exceptions only.
- Split into surfaces only with evidence. State the boundary in one sentence, count the processes that cross it, and name what joins the surfaces.

### 8. Check facts

Verify each claim in the spec against code, using [evidence rules](references/evidence-rules.md). Read that file before writing "없다" or "있다" about anything.

### 9. Close decisions

Bring only what changes money, privacy, auth, a public contract or scope. Give each decision options and one recommendation. When answers arrive, record them, apply them to the maps, and rebuild. Resolve a "follow the recommendation" answer row by row, and state any reading of your own as a reading.

### 10. Plan delivery

A map is not a plan until it says how the old thing goes away:

- The first slice, chosen from step 7's ranking, and how the operator's day changes when it ships.
- Delivery by process: one change adds the new screen and removes the old one. Avoid a single cutover. Follow the project's rule on release switches.
- Which device each unit needs, and the density it assumes.
- Throughput rules: next item after an action, bulk actions, saved filters.
- The shipping kind for each slice, and what must stay stable, such as links already sent in notifications.
- A baseline for success: broken steps closed, and time to answer a typical question.

### 11. Validate and publish one page

Read the [report standard](references/report-standard.md), then write `report.json` next to the maps, starting from `assets/example/report.json`. Run from the skill directory:

```bash
python3 scripts/check_map.py <planning-dir>
python3 scripts/build_report.py <planning-dir>
```

Fix every error and rerun. This writes `review.html`. It is built, not written by hand, so numbers cannot drift from the maps. The standard also sets what pictures it needs: real screens for the worst breaks and a picture inside each open decision. Capture those before the last build. `assets/example/` is a complete fictional case: build it to see what good looks like.

Open the page and answer the standard's pass check once, at desktop and phone widths, in light and dark.

### 12. Report and stop

Report outcomes, surfaces, broken-step count, decisions, the first slice, and what was not checked. For a full rebuild, offer `iky-team-review` with its three-camp panel. Stop before mockups or implementation.

## Gotchas

- Headline wording: "381 → 292" reads as cutting 89 features. Say which rows actually leave.
- A plan can keep every row and still be feature parity. If "유지" dominates, recheck step 4.
- Risk tags built from one column miss money moves. Derive them from the state change as well as the outside effect.
- A rule that a thing "stays somewhere else" still needs a link and a return path in the process.
- Count crossings per branch. A refund that one path runs inside the console and another inside the store crosses the boundary in the second path only.
- Deliver an answer for each broken step before calling the plan closed. Empty `해결` cells are the plan's real backlog.

## Sources

Method background and limits: [research notes](references/research.md).
