# Report input

Use UTF-8 JSON. The renderer takes one object with `title`, `checked_on`, `brief`, optional `notes`, and a `candidates` array. All copy is supplied by the task; the helper does not infer project facts or eligibility.

Each candidate requires `name`, `profile_url`, `category`, `priority`, `activity`, `evidence`, `fit`, `contact`, `history`, and `pending` strings. Optional fields:

- `handle`, `platform`: display labels.
- `audience`: displayed count including any approximation, e.g. `About 1,200 followers`; use `Not checked` if unknown. Do not coerce missing counts to zero.
- `email`: a public contact address; omit when unavailable. Describe restrictions in `contact` or `pending`.
- `contact_methods`: a list of actually available route labels such as `DM`, `Email`, `Form`, or `Agency`. An unavailable route belongs in `pending`, not this list.
- `sources`: objects with `label` and `url` linking to first-party evidence. Put snippet-only or unavailable evidence in `evidence` with its limitation.
- `recent_content`, `representative_content`: candidate-specific arrays of up to five recent posts and three representative posts by default. Items require `title`, `summary`, `source_url`; optional fields are `image_path`, `published_on`, `captured_on`, `capture_type`. A missing image is shown as text content, not an invented placeholder photograph. Representative overlap with recent URLs is labeled automatically.
- `content`: the same item format for additional user-requested content examples; do not use it as a detached global gallery.

Explain the recent ordering basis and representative selection in the candidate's `pending` or report `notes`. Pinned placement is not chronology, and representative selection is not a verified ranking by views. Include `published_on` only when observed. With only five accessible posts, recent and representative groups may overlap; the unique-post count remains five, not eight.

Use `evidence` for criteria and account ownership, `activity` for observed posts, `fit` for recruiting interpretation, and `pending` for unresolved eligibility/conditions. Store detailed eligibility and outreach checks in the project's existing record if needed. `history` must describe the actual scope checked, e.g. `No messages visible in this Instagram conversation; email history not checked`.

`profile_url`, source URLs and content source URLs must use HTTP(S). Local image paths resolve against the JSON's directory. Supported embedded image types are PNG, JPEG, WebP and GIF; SVG and arbitrary files are rejected. The helper performs no remote image fetching. Do not include credentials, cookies or expiring private media URLs.

The target count is a recruitment requirement, not a renderer default. Record pending accounts separately or label them explicitly; don't present them as verified matches to reach the count.

Minimal illustrative input (fictional, not a real candidate):

```json
{
  "title": "Community partner candidates",
  "checked_on": "2026-10-06",
  "brief": "Find craft creators who may host community workshops.",
  "notes": "Participation interest has not been confirmed. No outreach sent.",
  "candidates": [{
    "name": "Illustrative candidate",
    "profile_url": "https://example.com/creator",
    "category": "Craft",
    "priority": "Review first",
    "activity": "Example only; replace with verified observations.",
    "evidence": "Example only; no identity evidence collected.",
    "fit": "Potential workshop topic, subject to confirmation.",
    "contact": "Not checked",
    "history": "Not checked",
    "pending": "Replace example with actual research."
  }]
}
```
