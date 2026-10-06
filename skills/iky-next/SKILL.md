---
name: iky-next
description: Map the iky planning-to-launch pipeline, inspect which stage artifacts exist in the current project, and recommend the next iky skill to run with the reason. Use when the user asks what to do next, which iky skill comes next, where a project stands, or the order of the iky skills — e.g. "이제 뭐 해야 하지", "다음 작업 추천해줘", "iky 스킬 순서 알려줘", "지금 어디까지 했지". Read-only; it recommends and does not start the next stage.
---

# IKY Next

Tell the user where the project stands in the iky pipeline and which single step to take next. This skill reads artifacts and recommends; it never runs the next stage itself.

## Pipeline

| # | Stage | Skill | Main output (project default; prefer an existing project location) |
|---|---|---|---|
| 0 | Clarify the idea | `grill-me` | Shared understanding in conversation or notes |
| 1 | Product plan | `iky-product-planner` | `docs/planning/<topic>/spec.md` |
| 2 | Plan document | `iky-product-plan-html` | `docs/planning/<topic>/index.html` |
| 3 | Screen mockups and flow | `iky-screen-flow` | `output/screen-flow/flow.json` + `images/` |
| 4B | Data model | `iky-erd` | `docs/architecture/erd.md` |
| 5B | Backend architecture | `iky-backend-architecture` | `docs/architecture/backend.md`, `docs/architecture/decisions/` |
| 6B | Backend specs | `iky-backend-spec` | `docs/api/openapi.yaml` (or the project's contract format), `docs/api/spec.md` |
| 7B | Backend build | `iky-backend-build` | Backend code, migrations, tests |
| 4F | Shared components | `iky-component-workbench` | Component source + workbench |
| 5F | Working mockups | `iky-ui-design` (+ `iky-design`, `iky-design-audit`) | `.ui-design/` review and mockup code |
| 6F | Frontend build | `iky-frontend-build` | Production screens, routes, data layer |
| 8 | Front–back integration | `iky-integration-check` | `docs/qa/integration-matrix.md` |
| 9 | Motion | `iky-motion-audit` | `docs/qa/motion-audit.md` |
| 10 | Pre-launch | `iky-website-launch-readiness` | Readiness table in the work report |

After stage 3 the backend track (B) and frontend track (F) can run in parallel. `iky-frontend-build` can start against the API spec with spec-shaped fixtures before `iky-backend-build` finishes; stage 8 needs both. Delivery skills (`iky-develop-pr-review-merge`, `iky-deploy`) follow the project's integration rules after any build stage.

## Find the current state

1. Read the nearest project instructions for established document locations, then look for each stage's artifact at that location or the default above. Search `docs/` for close equivalents (an existing ERD, OpenAPI file, or architecture note counts even if named differently).
2. Classify each stage: **missing**, **draft** (exists with open questions, `draft`/`proposed` status, or pending images), **done**, or **stale** (an upstream artifact changed after it — compare git history or modification times and say which signal you used).
3. For build stages, look for evidence rather than files: implemented routes listed in `flow.json` `screens[].route`, status columns in `docs/api/spec.md`, and tests. Do not call a build stage done from file presence alone.
4. Note small-task shortcuts: a bug fix or a bounded UI edit does not need the pipeline — recommend `iky-ui-design` or ordinary work directly.

## Recommend

Recommend exactly one next step, plus at most one parallel step when the tracks allow it. Prefer, in order: a stale artifact that blocks downstream work, the earliest missing stage on the critical path, then the next stage on the less advanced track. If the user names a goal (for example "백엔드부터"), recommend within that track.

Reply in Korean, compactly:

```
현재 위치
| 단계 | 상태 | 근거 |
...

다음 추천: /iky-erd
이유: 기획서와 화면 흐름은 확정됐고 데이터 모델 문서가 없음
병행 가능: /iky-component-workbench
```

Show only the stages relevant to the project; collapse untouched later stages into one line. State uncertainty when artifacts live outside the searched locations. Do not start the recommended skill until the user asks.
