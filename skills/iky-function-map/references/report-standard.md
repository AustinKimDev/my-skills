# Report standard

The page has one reader, the owner, who reads it once and must decide something. `scripts/build_report.py` fixes the shape. This file sets the bar for what goes into `report.json`. Start from `assets/example/report.json`: `units` maps each code to its area, surface and done state, `focus` lists the process IDs to show in full, and `joins` names what connects the surfaces.

## Order

| Part | Question it answers | Bar |
|---|---|---|
| Answer | What did we conclude? | One sentence, 90 characters at most, with the conclusion and the first move |
| Reasons | Why believe it? | 2 to 4 numbers, each a different argument |
| Next | What do I do now? | One action, naming the decision or person |
| Heat map | Where does it hurt? | Work units by surface, one attribute at a time |
| Lanes | How does it break? | The 3 or 4 worst processes, now and after |
| Answers | Is every break closed? | `답 없음` is zero, or a reason and the next step say it is not closed |
| First slice | What ships first? | What is in, what waits, and how success is measured |
| Decisions | What is left to me? | Open first, each with options and one recommendation |
| Not checked | What should I not trust? | Never empty |

Cut any section the owner has no use for. A section stays only if it changes a decision or a belief.

## Answer and reasons

State the conclusion, not the topic. If the sentence still works with any project's name in it, it says nothing.

| Weak | Strong |
|---|---|
| 관리자 기능 분석 결과입니다 | 화면 수가 아니라 환불과 신고가 메뉴 사이에서 끊기는 것이 문제이므로, 주문 찾기부터 고칩니다. |
| 기능 381개를 정리했습니다 | 기능은 대부분 남기고, 끊긴 33단계를 잇는 것이 재구성의 전부입니다. |

Reasons are a pyramid under the answer: each one supports it, and together they are enough. A count nobody can act on is not a reason.

## Numbers

- Write counts as placeholders so they come from the maps: `"{broken} / {counted}"`. Available: `broken`, `counted`, `unanswered`, `processes`, `broken_processes`, `crossing`, `handoffs`, `units`, `functions`. `crossing` counts processes that touch more than one surface with a `path`.
- Type a number only when it comes from outside the maps, such as a log query. Say where it came from, and write `추정` if it is an estimate.
- Keep the denominator. "33단계" says less than "33 / 98".
- Say which rows actually leave. "381 → 292" reads as cutting 89 features when most of them merged.

## Heat map

- A cell is a work unit, never a menu.
- Show one attribute at a time, and name it in a legend on screen.
- Keep the raw value in the cell. Color alone must not carry meaning.
- Green means clean. Risk has no green level, because a little risk is not good news.
- No `사용 빈도` column means the usage view stays off. Do not fill it with guesses.
- Do not hide what leaves. Removed rows stay in `function-map.tsv` with a reason.

## Lanes

- Each lane is a work unit, plus one `밖` lane. Keep to about six lanes. With more, the process is two processes, or the units are too fine.
- Each step is one action with one actor. Mark every crossing; the crossings are where work gets lost.
- The difference between now and after is the action list. Every broken step names its answer.
- A step that stays broken says `안 고침` and why. Silence reads as forgotten.
- A step with no answer yet says `답 없음`. Never invent an answer to close the count.
- Show the worst few in full and fold the rest. Fix the choice with `focus`.

## Decisions

- Open decisions come before accepted ones. Each gives options, one recommendation, and what the answer changes.
- Label a proposal inside an accepted decision as a proposal.
- With more than four open decisions, or when a choice needs a picture to be understood, offer `iky-decision-report` instead of a longer list.

## Deck

`build_report.py` also writes `deck.html` from the same data, so the slides cannot disagree with the page. Use it when the owner will present the plan or wants to walk through it. Arrow keys and space move between slides, and printing to PDF gives one slide per page.

- One message per slide, and the title states it.
- Order: answer, reasons, the three layers, surfaces, heat map, the worst flow now and after, answers, first slice, decisions, what was not checked with the next action.
- Fill `boundary` (the surface rule in one sentence), `method` (`function`, `unit`, `process`: one real example of each) and, when useful, `extras` (a slide with `title`, `lead` and `columns` of `head` and `items`). `focus[0]` picks the worst flow.
- A `.pptx` needs a package this skill does not ship. Ask before installing one.

## Pass check

Answer each one by looking at the rendered page:

- [ ] Reading only the top screen, the owner knows the conclusion and the next action.
- [ ] Every number traces to a map, a named query, or a `추정` label.
- [ ] The legend explains each color, and each colored cell also shows its value.
- [ ] Every 끊김 and 없음 step has an answer, or the page counts it as open.
- [ ] Nothing stated as fact lacks a file, a line, or a measurement in the spec.
- [ ] "확인하지 못한 것" names real gaps, such as usage, legal duties and production state.
- [ ] The page holds at desktop and phone widths, in light and dark, with no sideways scroll on the page itself.
- [ ] Every slide fits its frame, and the title alone tells the story when read in order.

Check the render once, fix everything found in one batch, and confirm once. Sources are in [research notes](research.md).
