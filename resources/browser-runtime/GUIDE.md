# Browser runtime integration

Use this guide when the calling skill needs a browser. It replaces a dependency on separately installed browser-discovery skills; it does not provide a browser binary, logged-in session, or permission to operate another workspace.

## Select and resolve the environment

Follow the user's browser choice and the active session's routing rules. An Orca-hosted session normally uses its own workspace's embedded browser. Other environments use their exposed browser tools or an explicitly selected local browser. Do not switch browsers because an expected tool is missing.

For Orca, select the session's executable using its runtime metadata: an explicit `ORCA_CLI_COMMAND`, then `orca-dev` for a development session exposing `ORCA_DEV_REPO_ROOT`, otherwise the installed platform entrypoint. On Linux outside an Orca terminal, use `orca-ide`; bare `orca` can be the unrelated screen reader. Treat environment-provided executable names as structured arguments, not shell code. Read `<selected executable> skills get orca-cli --json` before operating it. Reuse the same executable and its version-matched guide; do not bundle a frozen copy of its changing command interface.

Resolve the current session's owning worktree or folder from runtime/session metadata. A focused workspace, the first list result, or a matching URL is insufficient. Use that workspace's explicit selector, create or reuse a page belonging to it, retain the returned page ID, and pass it to subsequent commands. Re-list in that same workspace if the ID is stale. If ownership or command support cannot be established, report the specific limitation and continue independent artifact work.

When Aside is selected, read `aside guide` from the installed executable. Use its documented persistent interactive session for review pages; do not assume one-shot execution keeps a tab alive. Installation, upgrades, other accounts, and browser substitutions require the applicable user authorization. An unavailable guide is an unavailable runtime, not a reason to guess commands.

For other exposed browser tools, read their current tool schema and follow the environment's session and page targeting rules. Browser access does not authorize submitting forms, publishing, buying, sending messages, or changing production data.

## Open, verify, and return

- Reuse the project's server and port conventions only when its ownership is established. Otherwise serve the intended artifact directory on loopback at an available port; do not expose a home directory or repository root. Record the task-owned process/session and restart command.
- Inspect the actual requested URL, image loading, affected layout, keyboard/focus behavior, and changed controls. Use the calling workflow's scope and checks. Source inspection or successful HTML generation alone is not rendered verification.
- Keep a decision report available until the user returns its selected decisions or ends the review. Do not stop a server merely because a screenshot was captured. Stop only task-owned processes when their purpose has ended.
- Return the artifact path, running URL when available, actions actually exercised, and specific unavailable checks. Saved files remain deliverables if a browser is unavailable; their runtime verification remains incomplete.
