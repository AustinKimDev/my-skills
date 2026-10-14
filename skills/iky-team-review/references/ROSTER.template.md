# Company roster

Role definitions live in `~/.claude/agents/<name>.md` (global Claude Code agents). The PM (main session) picks whoever fits the task from each agent's `description`; there is no fixed mapping from stage to role. A stance (advocate / alternative / skeptic) is given in the brief per call. "Hire" = add or edit the role file. "Fire" = replace the file with a differently-tempered one and log it below. Agents keep no memory between sessions.

## Active roles (created 2026-10-15)

| Group | Roles |
|---|---|
| Engineering | frontend-engineer, mobile-engineer, backend-engineer, system-engineer, infra-engineer, sre-oncall, dba, security-engineer, data-engineer, qa-engineer, tech-lead, cto |
| Product and business | product-manager, product-designer, business-strategist, ceo, finance-controller, marketing-manager, sales-manager, localization-manager, data-analyst, customer-support, legal-privacy |
| Users | user-general, user-light, user-heavy, angry-customer |

Builders with write access: frontend-engineer, mobile-engineer, backend-engineer, data-engineer, qa-engineer (plus the generic `builder`). All others are read-only.

## Scorecard (per task, filled by the PM)

| Role/stance | Task | Findings confirmed / reported | Actionable | Novel vs peers | In scope | Verdict |
|---|---|---|---|---|---|---|

Probation: first two tasks of a role. Fire if confirmed rate is under half, scope was broken, or the brief format was ignored twice. Record the reason and the replacement.

## Hiring and firing log

| Date | Action | Role | Reason | Replacement |
|---|---|---|---|---|
| 2026-10-15 | hire | initial 24 roles above | initial company | - |
| 2026-10-15 | hire | mobile-engineer, sales-manager, localization-manager | requested by user | - |
