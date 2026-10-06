---
name: iky-backend-spec
description: Write backend API contracts and supporting specs from the backend architecture, ERD, product plan, and iky-screen-flow actions — OpenAPI (or the project's contract format), a screen-to-operation map, permission matrix, error catalog, and event, job, and migration specs. Use for "API 명세 써줘", "백엔드 명세 정리", contract-first backend work, or updating specs after plan changes. Does not implement endpoints.
---

# IKY Backend Spec

Define every operation the product needs as a contract that backend and frontend can both build against. Specs come from user actions and policies, not from table structure.

## Inputs

- `docs/architecture/backend.md` and `docs/architecture/erd.md`.
- Product plan policies and acceptance criteria.
- `output/screen-flow/flow.json`: screen IDs, actions, overlays, and transitions.
- Existing API code or contract files. An existing contract is a public contract: changes to it need the user's approval.

## Derive operations

1. For each screen ID, list the user actions and data loads. Each becomes an operation or reuses one; record the mapping in a screen → operation table.
2. Design each operation around the user intent ("주문 취소"), then fit it to the API style and module ownership from the architecture.
3. Apply the policies: who may call it, preconditions, state transitions, limits, and what happens on conflict.

## Specify each operation

- Method and path (or query/mutation/procedure name), owning module, and summary.
- Authentication and permission rule.
- Request schema with validation rules; response schema with field meanings, nullability, and formats (money, time zone, IDs).
- Pagination, filtering, and sorting for lists.
- Idempotency for mutations with side effects; concurrency handling (versions, locks) where the policies need it.
- Errors: codes from the shared catalog, with the condition that triggers each.
- An example request and response.

Use OpenAPI 3.1 for REST unless the project uses another contract format (GraphQL SDL, tRPC router types, protobuf). Reuse shared schemas instead of duplicating them.

## Supporting specs

Write only those the product needs:

- **Permission matrix:** role × operation.
- **Error catalog:** code, HTTP status, meaning, and what the client should show or do.
- **Events and webhooks:** name, producer, payload, consumers, delivery guarantees.
- **Background jobs:** trigger, schedule, retry and failure handling.
- **Notifications:** trigger, channel, template variables.
- **Migration plan:** derived from the ERD change log — ordered steps, backfills, and rollback for each.
- **Fixtures:** example data that matches the schemas, for frontend mocks and tests.

## Output

- Contract: `docs/api/openapi.yaml` or the project's contract location.
- `docs/api/spec.md`: index of operations with a status column (`specified`, `implemented`, `tested`), screen → operation map, and the supporting specs above. Mark breaking changes to existing contracts and list them for approval.

## Verify

- Every screen action and data load maps to an operation; every operation traces to a screen or requirement.
- Every operation has auth, errors, and examples; every error code exists in the catalog.
- Validate the contract with the project's existing linter if there is one. Do not install a linter without approval; otherwise parse the file and check references, and say a full lint was not run.

Hand back the contract path, open questions, and breaking changes needing approval. Next: `iky-backend-build`; `iky-frontend-build` can start in parallel against the fixtures.
