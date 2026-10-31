---
name: iky-graph-run
description: Take a goal and run it as an execution graph without waiting for plan approval - split the work into nodes (work, owned files, check), edges (needs that result first) and joins (where the main session verifies), fix shared contracts first, launch every ready node in parallel, retry only what failed, and report once at the end. Small work stays in the main session with no graph. Use when the user invokes it or says "그래프로 진행", "그래프로 돌려", "노드로 쪼개서 진행", "알아서 쪼개서 돌려", "병렬로 알아서 진행", or "run this as a graph". Not for walking the iky pipeline with a report after each stage; that is iky-pm-run.
---

# IKY Graph Run

The user gives a goal. You draw the graph, announce it in two lines and run it in the same turn. You stay the orchestrator: you hold the decisions, run the joins and report once at the end.

Invoking this skill is the user's request to fan out for this goal, so a default of "do it yourself unless there are many items" does not apply here. Every other orchestration and model-routing rule in the harness instructions still does; this skill does not restate them. Project instructions outrank this skill.

## 1. Frame

1. Read only the code needed to see the shape of the work and its shared contracts.
2. Set the done criterion: the command or real behavior that proves the goal. If the user gave none, choose one and state it.
3. Ask first only when the answer would change scope, data handling, security, a public contract or an irreversible action. Ask once, then run. Decide everything else.

## 2. Graph or no graph

Skip the graph and do the work in the main session when it is one file, a quick fix, a chain where each step depends on seeing the last result, or when fewer than two pieces can run independently. Say so in one line with the reason, then work.

If the design or the bug direction is unsettled, settle it first, yourself or through a read-only node. Workers do not decide architecture, public APIs, dependencies or bug direction.

## 3. Draw

- **Node:** one work item with its owned files, its check, and its model and effort from the routing rules. One to three related items per node. One writer per file.
- **Edge:** "needs that result first". It carries conclusions, paths and check output, never a transcript.
- **Join:** where you verify before the next level starts.
- **Gate:** where a branch stops for the user. Use gates only for section 7.
- **Cycle:** a fix and re-check loop. Every cycle has a cap.

Shared files (API definitions, types, manifests, lockfiles, build config, migrations, auth, global styles, entrypoints) are contract nodes that you own. They run first, so parallel nodes cannot read the interface differently.

If the user supplied a graph, use it and fill only its gaps.

Announce the graph in Korean in one or two lines, then start in the same turn. Do not ask for confirmation.

```text
완료 판정: 관련 테스트 통과 + 화면에서 실제 다운로드 확인
그래프: C(공통 타입, 직접) → A(API), B(화면) 병렬 → J(타입체크, 실제 다운로드)
```

## 4. Run

1. Finish the contract nodes yourself.
2. Launch every node whose inputs are ready in one message. Pieces that must fit together or challenge each other go to an agent team; independent bulk goes to plain subagents.
3. Keep doing visible work while nodes run, and relay each result in one line as it arrives.
4. Start the next level only after its join passes.
5. If a result invalidates the graph, redraw only the remaining part, state the change in one line and continue. Nodes that passed stay passed.

Add a review node only where a miss is costly: money, auth, DB changes, concurrency, real customer data.

## 5. Join

1. Review every diff: scope, unrelated edits, dependencies, public-API impact. Reject output you cannot verify.
2. Run the project-wide checks once, one at a time, after every node of that level has finished.
3. Exercise the changed behavior: open the screen, perform the interaction, call the endpoint.

A worker's "done" is not evidence, and a passing typecheck is not a working feature.

## 6. Failure

- Rerun only the failing node or check. Pass the failure cause and check output, not the earlier transcript.
- One retry per step, raised as the routing rules say.
- If the retry fails, stop that branch and whatever depends on it, finish the branches that do not, and report it as unfinished.
- A fix and re-review cycle stops after two rounds; report what is left.

## 7. Stop for the user

Stop the affected branch, and only that branch, before a push, a deployment, a dependency change, a DB migration, a public-contract change, an auth-boundary change, or any other irreversible or outward-facing action. Keep the other branches running. Carry earlier approvals forward.

- Run a Workflow script only when the user asked for one in their own words. This skill does not grant that.
- Inside Orca, never create, switch or delete branches or worktrees. Brief workers to stay on the current branch.
- Work across projects goes to each project's own worker through `orchestration`, not to subagents of this session.

## 8. Close

1. Commit at the recovery point. Never push without approval.
2. Shut down any teammates.
3. Report once in Korean: the graph as it ran, each node's result, checks run with their results, what was not checked, what remains or is risky.

Do not stop between levels to report unless a gate fired.
