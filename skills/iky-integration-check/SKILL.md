---
name: iky-integration-check
description: Verify that the implemented frontend and backend are wired correctly — each screen action reaches the right operation with matching request and response shapes, documented errors are handled in the UI, auth and cache invalidation work, and no mocks remain in production paths — by static tracing plus running both locally. Produces an integration matrix by screen ID. Use for "프론트랑 백엔드 연결 확인", "API 연동 점검", or before launch checks. Reports by default; fixes only when asked.
---

# IKY Integration Check

## Bundled support

Read [the dependency map](references/dependencies.md) when a step calls for another skill. The required guides and resources are included in this folder; load only the relevant support and keep this workflow primary. Resolve a supporting guide's scripts and assets from its own directory. Runtime tools and project packages still come from the active environment.

Prove, screen by screen, that what the UI sends and expects matches what the server accepts and returns. Default to a report; change code only when the user asked for fixes.

## Inputs

- `output/screen-flow/flow.json` (screen IDs and actions) and the product plan.
- `docs/api/openapi.yaml` / `docs/api/spec.md` (operations, screen → operation map, error catalog).
- Frontend and backend source.

## Static trace

Build one row per screen action or data load:

screen ID → frontend call site (`file:line`) → operation in the spec → backend handler (`file:line`).

For each row check:

- The operation exists in the spec and in the backend with the same method and path.
- Request fields, types, and required flags match; the UI does not send fields the server ignores.
- Every response field the UI reads exists in the contract and the handler.
- Each documented error code for the operation has a UI treatment; generic fallbacks are noted.
- Auth: credentials are attached, and permission failures lead to the intended screen.
- After mutations, dependent data is refreshed or invalidated.
- No fixtures, mock adapters, debug flags, or hardcoded base URLs remain in production paths; environment configuration points to the right server.

Also list spec operations that no screen calls and calls that the spec does not define.

## Runtime check

- Start backend and frontend locally (check ports first; reuse your own servers) against a local or test database — never production data.
- Walk each flow in the browser following the [bundled browser runtime guide](embedded/browser-runtime/GUIDE.md). Watch network requests and server logs; confirm status codes and payloads match the contract.
- Force at least one failure per flow: invalid input, unauthorized access, a missing resource, or a server error. Confirm the UI shows the documented state.
- Do not send real payments, messages, or external side effects to verify a flow.

## Output

Write `docs/qa/integration-matrix.md` with the trace table and a status per row — **OK**, **mismatch**, **missing**, **unverified** — with evidence (file links, request/response excerpts, screenshots). Summarize blocking mismatches first. When fixes were requested, fix within scope, re-run the affected rows, and update the matrix.

Next: `iky-motion-audit`, then `iky-website-launch-readiness`.
