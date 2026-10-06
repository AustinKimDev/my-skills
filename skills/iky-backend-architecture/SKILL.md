---
name: iky-backend-architecture
description: Design backend module boundaries, data architecture, and server architecture from an ERD and product plan, respecting the existing stack. Produces a backend architecture document with an entity-ownership map, query-pattern and index plan, runtime topology, and decision records. Use for "백엔드 구조 설계", "모듈 나눠줘", "데이터/서버 아키텍처 잡아줘", or before writing API specs. Does not write API specs or code.
---

# IKY Backend Architecture

Decide how the backend is divided and how data and requests flow, so that specs and implementation have fixed boundaries. Existing architecture is the default; change it only where the plan requires it.

## Inputs

- ERD: `docs/architecture/erd.md` from `iky-erd` (or the project's data model).
- Product plan and screens for behavior, volume, and latency expectations.
- The existing codebase: framework, folder structure, database, ORM, auth, background jobs, hosting, and deployment configuration. Read these before proposing anything.

## Decide

### Modules

- Group entities into modules by domain responsibility and transaction boundary. Each entity has exactly one owning module; other modules read it through that module's interface or react to its events.
- Name each module's public surface (services, events) and its private internals. Avoid circular dependencies; draw the dependency direction.
- Follow the project's layering conventions inside a module. For a new project, use the simplest layering the framework supports.

### Data

- Database and storage per data type: relational tables, files and media, cache, search, analytics events. Reuse what the project has.
- Consistency: which operations must be atomic, where eventual consistency is acceptable, and how cross-module updates are coordinated (single transaction, outbox, events).
- Query patterns from the screens (lists, filters, sorts, counts, feeds) mapped to indexes or read models. Note expected volumes only when the plan or real data supports them.
- Sensitive data: classification, encryption, retention, and deletion paths that the policies require.

### Server

- API style (REST, GraphQL, RPC) — keep the existing one.
- Authentication, sessions, and the authorization model (roles, ownership checks) at the level the API spec will need.
- Background work: queues, scheduled jobs, retries, idempotency for side effects such as payments, notifications, and external calls.
- Realtime needs, external integrations, configuration and secrets handling, observability (logs, metrics, traces), environments, and deployment topology.

## Approval boundaries

New infrastructure, new services or dependencies, auth model changes, and data migrations of existing production data are proposals until the user approves them. Present each with the reason, options, trade-offs, recommendation, and rollback path.

## Output

Write `docs/architecture/backend.md` (or update the project's architecture document) with:

- Context and constraints (existing stack, non-functional requirements with sources).
- Module map (Mermaid flowchart) and entity-ownership table.
- Data architecture: stores, consistency boundaries, query-pattern → index table, sensitive-data handling.
- Server architecture: request path, auth, jobs, integrations, observability, environments.
- Decision records for significant choices in `docs/architecture/decisions/NNNN-<title>.md` (context, options, decision, consequences). Keep one current record per decision; mark superseded ones.
- Open questions.

## Verify

- Every ERD entity has one owning module; no module depends on another's internals.
- Every screen query pattern has a planned access path.
- Each proposed change from the existing architecture is justified by a requirement and listed for approval.

Hand back the document path, decisions needing approval, and open questions. The next stage is `iky-backend-spec`.
