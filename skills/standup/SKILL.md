---
name: standup
description: Summarize today's merged PRs and commits from git history into a concise Korean work report for Confluence. Use when the user asks for a daily work summary, 업무보고, 오늘 한 일 정리, standup report, or invokes /standup. Optionally accepts a date (e.g. "어제", "2026-06-10") or extra repo paths as arguments.
---

# Standup — Daily Work Report

Extract merged PRs and commits for the target date(s) from git history and produce a Korean work report ready to paste into Confluence.

## Workflow

1. **Resolve the target date(s)** — default is today. Arguments like "어제", "6/10", "2026-06-10" select that date. "이번주" means **Monday of the current week through today** — the user's weekly reporting unit starts on Monday. A day count like "지난 3일간" means exactly that many days counting back from today inclusive (e.g. on Friday → Wed–Fri).

2. **Collect target repositories** — include all of:
   - the current working directory (if a git repo)
   - every additional working directory of the session that is a git repo
   - any repo path passed as an argument

3. **Collect commits** — for each repo (parallelizable):

   ```bash
   git log --all --since="<DATE> 00:00" --until="<DATE> 23:59" \
     --pretty=format:"%h %ad %an %s" --date=format:"%H:%M"
   ```

   Author/committer timezones may disagree, so treat times as approximate; trust the `--since/--until` filtering itself. A repo with no commits is dropped from the report.

4. **Collect PR reviews** — include peer PRs the user reviewed but did not author. Resolve the hosting provider, repository owner/name, and reviewer identity from the selected project's configuration and authorized account context. Use an available provider tool or CLI; do not assume an organization or user from another project.

   - Count a review only when the user authored an approval or comment within the requested date range. Reviewer assignment alone does not count.
   - For a Bitbucket repository, consult [review collection notes](references/bitbucket.md). Keep organization and reviewer mappings in the authorized project's private configuration.
   - For a configured Bitbucket repository, query `/repositories/<workspace>/<repo>/pullrequests` updated in range, including participants, then inspect the relevant `/pullrequests/{id}/activity` entries. Match the verified account identity. If the integration is known to lack `/user` scope, reuse its established identity mapping rather than repeating that failing request.
   - For another provider, use its equivalent review/activity evidence. If the provider, identity, access, or tool is unavailable, state that review history could not be checked; do not report zero reviews or install tooling silently.
   - Render verified reviews as "동료 PR 리뷰, <short phrase describing what the PR was about>" under the repository. This reporting workflow does not post comments or submit reviews.

5. **Group and dedupe**:
   - Merge commits of the form `Merged in <branch> (pull request #N)` define the PR unit.
   - Commits belonging to a PR (fix/feat/docs commits on the same branch) are absorbed into that PR's item — never listed separately.
   - Commits pushed directly without a PR stand as their own items.
   - Group by nature: features / bug fixes & stabilization / releases / docs / dependencies, etc.

6. **Output** — sections per repository, in the format below.

## Output format

```markdown
- <repo folder name>
  - <work item — one short Korean noun phrase per line>
  - <work item>
- <repo folder name>
  - <area name>
    - <work item>
    - <work item>
  - <area name>
    - <work item>
- 기타
  - <maintenance, chores, ongoing work>
```

When covering multiple dates, put each date under a `## 6/10 (화)` header and repeat the same structure beneath it.

Structure rules:

- **Top-level bullet = repository folder name, nothing else.** Do not invent product names — use the repo directory name verbatim (e.g. project-api, project-web). Append nothing after the name: no parenthetical glosses, PR ranges, or counts. If one repo's work spans several areas, add one level of area bullets beneath it (e.g. 관리 콘솔, 수집 파이프라인, AI 분석) and group items there. Chores that belong to no repo go under "기타".
- **Sub-bullet = one line per work item.** End with a short Korean noun phrase (구현, 추가, 수정, 머지, 측정, 미팅, 작성). If one piece of work has several meaningful units, split into multiple sub-bullets so the volume of work is visible.
- No git metadata — PR numbers, commit hashes, counts — unless the user asks for it.
- Mark ongoing work with `(진행중)` at the end; if the start date matters, write `(6/12~ 진행중)`.
- No tables, no HTML — pure markdown bullets only (Confluence paste compatibility).

## Writing style — like a human wrote it (★critical)

Commit messages are **raw material, not sentences.** Copying them through reads machine-made. Rewrite as if answering a coworker who asked "오늘 뭐 했어요?" out loud.

- **The reader does not know this project.** Someone from the next team over must understand every line. Replace internal jargon, component names, and library names with *what the work made possible* ("MSW 목 인프라 구축" → "백엔드 없이 화면 개발할 수 있는 가짜 API 환경 구축"). Give domain-specific concepts a short gloss on first appearance ("Evidence Ledger(AI 결과 근거 추적 장부)"). Area names become plain Korean, kept clean ("콘솔 FE" → "관리 콘솔").
- **Never paste commit messages.** Not keyword compression ("기사당 fan-out·중복제거·부분실패 처리") but the way a person jots a note, keeping only the core ("수집 파이프라인 운영 실행 기능 구현").
- **No compression with middle dots (·) or em-dashes (—).** Use commas for lists. At most 2–3 technical keywords per item.
- **Short.** One sub-bullet is one breath. The density bar is "기하보정 완료시 actual_lat, actual_lon 자동 저장" — do not lapse into explanation.
- **Surface all the work.** Over-merging items makes the work look small. One sub-bullet per meaningful unit; even small fixes and chores get their own line under "기타".
- **Process counts as work.** Design (specs, plans, mockups), debugging (bugs whose cause was found), verification (eval measurements, real-DB tests), and meetings deserve items even when no code merged.
- **Numbers woven into the phrase.** "화면 10개 구현", "eval 정밀도 0.548 측정" — real numbers only, never inflated.
- **Select detail.** Keep: measurements, decisions (ADRs), progress status. Drop: component name lists, internal implementation vocabulary, long why-explanations.
- English technical terms survive only when untranslatable like product names or proper nouns (e.g. Postgres, RSS); the rest becomes Korean. Implementation-means names (libraries, encryption schemes) carry no information for the reader — cut them.

## Example

```markdown
- project-api
  - MCP, 내장 툴 실패 시 턴 끊기지 않게 에러 복구 개선
  - 동일 예외 중복 출력 제거
  - v0.1.7 릴리스
  - README Bitbucket 렌더링 깨짐 수정
- project-web
  - 동료 PR 리뷰, 위성영상 구매 확인 팝업
- 기타
  - Google Drive 블루본 이미지 전체 로컬 다운로드 (25년 11월~ 진행중)
```

Bad example (machine-flavored — never write like this):

```markdown
- 에이전트 에러 처리 안정화 — MCP/내장 툴 실패 시 턴 중단 없이 복구·동일 예외 중복 출력 제거·재시도 로직 보강 (PR #62, #67, #68)
```
