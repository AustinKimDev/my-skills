# Bitbucket review collection

Resolve the workspace, repository and reviewer from the authorized project's configuration and current account context. Keep company-specific account mappings in that project's private instructions, not in this portable skill.

- Query `/repositories/<workspace>/<repo>/pullrequests` updated in the requested range and include participants.
- Inspect `/pullrequests/{id}/activity`; count the user's actual approvals or comments, excluding PRs they authored. Reviewer assignment alone is not review activity.
- Resolve reviewer identity through an authorized account lookup or a previously verified project-local mapping. A display name alone may not be unique.
- If `/user` is unavailable because the integration lacks that scope, reuse a verified mapping only for that same integration. Otherwise report identity or review history as unverified.
- A query such as `updated_on >= <DATE>T00:00:00+09:00` is only a candidate filter. Filter actual review activity to the full requested date range and timezone.

Report missing access separately from a confirmed absence of reviews. This workflow does not submit reviews or post comments.
