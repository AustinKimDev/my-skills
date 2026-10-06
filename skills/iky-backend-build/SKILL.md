---
name: iky-backend-build
description: Implement and test backend APIs from iky-backend-spec contracts in vertical slices — migration, data access, domain rules, handler, validation, permissions, and tests — using the project's existing stack. Use for "API 구현해줘", "백엔드 개발", implementing a specified operation group, or bringing the backend in line with an updated spec. Running migrations on shared or production databases and adding dependencies require approval.
---

# IKY Backend Build

Implement the specified operations so that the running server matches the contract. The spec is the source of truth; when implementation reveals a problem in it, fix the spec deliberately rather than drifting.

## Inputs

- Contract and index: `docs/api/openapi.yaml` (or the project's format) and `docs/api/spec.md`.
- `docs/architecture/backend.md` for module ownership and boundaries; `docs/architecture/erd.md` for the data model and migration plan.
- The existing codebase, its test setup, and the project's required checks.

If no spec exists, say so and recommend `iky-backend-spec` instead of implementing from screens directly.

## Plan the slices

Group operations into slices that can each be finished and tested end to end — usually one module's operations for one user flow. Order slices by dependency (data that others read comes first). Implement the slices the user asked for; list the rest.

## Build each slice

1. **Migration.** Write it reversible and in the project's migration tool. Run it only against a local or disposable database. Running it against shared, staging, or production databases needs the user's approval.
2. **Data access** in the owning module, following existing repository/ORM patterns.
3. **Domain rules:** state transitions, limits, and policies from the spec, kept in the module's service layer rather than in handlers.
4. **Handler:** routing, request validation against the contract schema, permission check, response mapping, and error codes from the catalog.
5. **Side effects:** jobs, events, and external calls with the idempotency and retry rules from the spec.
6. **Tests:**
   - contract tests — status codes, response shapes, and error codes match the spec;
   - domain tests — each policy and state transition, including rejected ones;
   - permission tests — forbidden and unauthenticated calls fail correctly;
   - integration tests against a real test database where the project supports it.

Match the existing style. Do not add dependencies, change public contracts, or alter auth boundaries without approval.

## Keep the spec true

- When a slice is complete, update its operations in `docs/api/spec.md` to `implemented` or `tested`.
- If the contract must change (a missing field, an impossible rule), stop and propose the change; once approved, update the contract first, then the code.

## Verify

- Run the project's required checks (tests, typecheck, lint).
- Start the server locally — check the port first and reuse your own server — and call each new operation, including one failure path, with real requests. Record the commands and responses.
- Report which operations are tested, which are only implemented, and what was not verified.

Next: `iky-integration-check` once the frontend calls these operations; otherwise `iky-frontend-build`.
