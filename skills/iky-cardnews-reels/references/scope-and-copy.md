# Scope and copy

## Find out what actually shipped

An announcement that only covers the headline feature is usually wrong by omission. Before writing:

1. Fix the two refs: the commit just before the release was merged and the shipping head. Read the release PR bodies, then the diff by area (`git diff --stat <base> <head>` grouped by top-level folder).
2. For every user-facing surface the release touches, list each thing a user can now do, where they tap, and whether it is new, changed or unchanged. Check the shipping ref directly (`git show <head>:<path>`, `git grep <pattern> <head>`), not a stale working tree.
3. Look for the same capability on other surfaces. A feature built for one screen often lands on another (for example chat as well as live), and an older path may still exist beside the new one.
4. Record what the code cannot tell you: feature flags and their production values, store availability, catalog contents, server configuration. These go into the pre-publication note, not into the artwork.

Fan the audit out to read-only workers when it spans many files, and spot-check their key claims against the source before using them.

Split the announcement when the release spans distinct surfaces or audiences. Each carousel and reel then stands alone under the same version title, and a fact that applies to both may appear in both.

## Card copy

Each card carries four pieces, in this order of size:

| Piece | Role | Guideline |
| --- | --- | --- |
| Keyword | The one thing this card is about | One to three syllables, a noun the audience already uses |
| Gloss | A reading of the keyword, in brackets | The same word in another script or language, never a second fact |
| Claim | What changed for the reader | One full sentence in the product's register, about 14 characters |
| Detail | One supporting fact | One sentence with the number, limit or location that makes the claim concrete |

The cover names the area and promises the change; its detail line lists the cards that follow. The last card may carry the least glamorous but real improvement (stability, a platform fix).

Write from the reader's side, and prefer an invitation to act ("…해 보세요") over a description of the system. Describe the change, not a guaranteed state: "we tuned the stream to be steadier", not "the stream is stable". Keep wording independent of button positions when the interface may still move. Use the product's own current terms; if the release renamed something, use the new name.

Rejected patterns:

- A card for something that did not change. "X still works as before" is not news; an unchanged path that the audit found is context for the team, not a card. Every card and every reel scene names a change.
- A claim that describes a state from the product's side ("gifts are collected too") when an invitation from the reader's side says it better ("send gifts and fill your collection").
- A bracket holding an unrelated label because the layout had a bracket slot.
- A keyword invented to fit two syllables when the natural word is different.
- Slogan fragments split across lines that do not form a sentence when read together.
- A detail line that restates the claim.

## Caption

Connect the first line to what the cards show, then add what the cards do not: who each change is for, or how the areas relate. One invitation to swipe is enough. Keep relevant hashtags only. Under the caption, keep an internal pre-publication block (clearly marked as not for posting) listing the unverified items from the audit.

## Checks before rendering

Use the Korean Instagram writing guidance for register and caption shape, and the Korean naturalness rules for translationese, comma-after-connective, repeated endings and stock phrases. Read every claim against the audit table once more: each must be true on the shipping ref and still true if a flag is off.

Reel copy uses the same sentences split over two lines (a lead line and a key line). Read the two lines together; they must still be one sentence.
