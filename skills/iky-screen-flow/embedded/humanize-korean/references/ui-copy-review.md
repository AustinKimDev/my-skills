# Korean UI-copy review integration

This local integration was requested on 2026-09-14 for Korean wording in `iky-design`, `iky-design-audit`, `ui-design`, and related product-copy work through `better-writing`. The installed skill uses the upstream Codex single-call entrypoint and the shared reference bundle from [epoko77-ai/im-not-ai](https://github.com/epoko77-ai/im-not-ai/tree/9747f036cdc28a1a8aea4dc71fef1f7846eb96f7). Preserve this local integration when updating upstream files.

## Embedded review

For Korean product copy, use this embedded mode instead of the standalone skill's file-only output, long-form grading, percentage-change targets, and `_workspace` run artifacts. Keep the calling design or audit workflow primary. Review the actual draft or existing strings in scope; do not ask the user to paste text already available in the task.

1. Read [quick-rules.md](quick-rules.md). Review individual words, labels, headings, body copy, validation messages, empty states, and confirmation text that are created, changed, or explicitly included in the audit scope.
2. Apply only patterns supported by the actual string and its screen context. Look for translation-like phrasing, unnecessary passive or nominal constructions, redundant modifiers, stock rhetoric, and unclear actions. Check spelling, spacing, particles, and terminology consistency directly as companion UI checks; do not mislabel these as upstream AI-style rules.
3. Preserve meaning, facts, numbers, names, product terminology, brand voice, honorific level, and the stated action or consequence. Preserve interpolation placeholders, localization keys, markup, accessibility meaning, and legal text. Korean word order takes precedence over English verb-first examples.
4. Treat short labels as UI labels. Do not expand them into sentences, vary repeated functional terminology for literary rhythm, or apply paragraph rhythm, connector frequency, long-form grades, or percentage-change thresholds to a word or button. A clear existing phrase can pass unchanged. Do not invent a defect to meet a quota.
5. In an authorized implementation, apply the smallest supported correction directly to the intended artifact. In review-only work, report the original, suggested wording, reason, and applicable pattern ID when one exists. Keep semantic ambiguity unresolved rather than guessing a different feature promise.
6. Re-read the final strings in their actual component context. Check action clarity, consistency across the affected flow, and preservation of variables and facts. Follow the calling workflow's rendered-state verification for changed copy that can affect wrapping, truncation, or accessible labels. Mark unavailable runtime evidence unverified.

Report a concise Korean verification line in the existing task result, with material examples only when useful. Distinguish a completed textual review from unverified rendering. Do not claim measured scores, AI authorship detection, or automated checks that were not run. Do not create separate review artifacts or launch subagents merely for this embedded check.

Standalone requests to humanize a document continue to use the installed `SKILL.md` procedure. Non-Korean copy does not activate this integration or change the project's locale.
