---
name: iky-erd
description: Extract an ERD from product plans and iky-screen-flow screens, or update an existing ERD when plans or screens change. Produces entities, attributes, relations, lifecycle states, a screen-by-entity CRUD map, and a change log traced to requirement and screen IDs. Use for "ERD 만들어줘", "기획 바뀐 거 ERD에 반영해줘", data-model extraction before backend work, or reconciling a data model with the current schema. Does not write migrations or change code.
---

# IKY ERD

Turn the agreed product plan and screens into a data model the backend can be designed from. The ERD is a document; schema changes in code belong to `iky-backend-build`.

## Inputs

- Product plan: `docs/planning/<topic>/spec.md` (requirements, policies, acceptance criteria) or the project's planning location.
- Screens: `output/screen-flow/flow.json` and its images — screen IDs, states, overlays, and actions.
- Current truth: existing migrations, ORM models, schema files, or database docs. The code schema describes what exists; the ERD may propose more, but never misstate what exists.
- Existing ERD: the project's ERD document, or `docs/architecture/erd.md`.

If the plan or screens are missing, say which and work from what exists; label any element derived only from screens or only from code.

## Extract

1. **Screen data inventory.** For every screen ID and overlay, list the data it displays, the inputs it collects, and the actions it triggers (create, read, update, delete, state change). Include list filters, sort orders, counts, and empty/error states, since they imply queries and fields.
2. **Entities.** Group the inventory into entities by identity and lifecycle, not by screen. Merge duplicates that describe the same thing under different screen labels. Value objects that never stand alone become attributes or embedded types.
3. **Attributes.** Name, type, nullability, uniqueness, default, and units (money, time zone, locale) following project conventions. Mark personal or sensitive data.
4. **Relations.** Cardinality and optionality from policies ("한 사용자는 여러 주문"), ownership, and deletion behavior (cascade, restrict, soft delete). Many-to-many relations that carry data become entities.
5. **Lifecycle.** Status enums with allowed transitions and the policy that drives each transition.
6. **Traceability.** Tag each entity, attribute, and relation with its source: requirement ID, screen ID, or existing schema.

Do not invent policy. When the plan does not decide something that changes the model (cardinality, retention, whether history is kept), list it as an open question with the options and their model impact.

## Update an existing ERD

Preserve existing entity and attribute names unless the plan renames them. Mark each change **added**, **changed**, **removed**, or **unchanged-but-now-used**, and state the triggering requirement or screen. Flag changes that will need a data migration (type changes, new non-null columns on populated tables, splits, merges). Keep one ERD document current; record the change in its log instead of creating dated copies.

## Output

Write `docs/architecture/erd.md` (or update the project's ERD) with:

- Status line: draft / accepted, last updated, sources and their revisions.
- Mermaid `erDiagram` of entities and relations. Split by domain when one diagram exceeds roughly 15 entities.
- Entity tables: attribute, type, constraints, notes, source.
- Lifecycle tables or `stateDiagram-v2` for status fields.
- Screen × entity CRUD map.
- Change log and open questions.

## Verify

- Every data element in the screen inventory maps to an attribute or is listed as an open question.
- Every entity traces to at least one requirement or screen; unused existing tables are noted, not deleted.
- Relation endpoints exist, and cardinality matches the policies quoted.
- Mermaid syntax is valid: render it with an available renderer, or check entity and relation syntax line by line and say it was not rendered.

Hand back the document path, the change summary, and the open questions that block backend design. The next stage is `iky-backend-architecture`.
