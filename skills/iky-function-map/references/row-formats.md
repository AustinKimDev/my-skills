# Row formats

Use TSV, one row per function or step. Header names must match, because `scripts/check_map.py` reads them.

## function-map.tsv

| Column | Required | Meaning |
| --- | --- | --- |
| `ID` | yes | Stable ID such as `MEM-012`. Never reuse one. |
| `현재 위치` | no | Screen or surface today. Enables the inheritance test. |
| `기능` | yes | What it does, specific enough to test. |
| `유형` | no | 조회, 검색, 변경, 판단, 발송, 정책, 이력 |
| `표준 대상` | no | The object it acts on, from one shared list. |
| `업무 단위` | yes | Unit code first, then its name: `U08 잔액 조정`. |
| `처리` | yes | 유지, 합침, 연결, 공통, 구현 필요, 조건부 제거, 제거 |
| `합치는 곳` | when 합침 | The representative row's ID. |
| `위험 표지` | no | 돈, 민감, 대외, 되돌림 없음. Derive from behavior. |
| `처리 사유` | unless 유지 | Why. For 조건부 제거, name the condition. |
| `사용 빈도` | recommended | Volume with its source, or `추정`. |
| `자동화 후보` | recommended | The rule that could replace the screen. |

## Inventory columns

Collect these per area before classifying, then join them into the map: function, type, object, state change, reversible or not, outside effect, record left, rule, API, code reference. Keep an empty cell honest: write `없음` or `미확인`.

## process-map.tsv

| Column | Required | Meaning |
| --- | --- | --- |
| `프로세스` | yes | `E01` |
| `이름` | yes | Name of the flow. |
| `순서` | yes | Step number, ascending inside a process. |
| `단계` | yes | What happens. |
| `업무 단위` | yes | Unit code, or `밖`. |
| `행위자` | yes | 운영자, 파트너, 회원, 서버 |
| `상태` | yes | 있음, 끊김, 없음, 밖, 안 함 |
| `메모` | yes | Evidence: code reference or function ID. |
| `해결` | recommended | For 끊김 and 없음: N, X, decision, `안 고침(사유)`, or `답 없음`. |

`안 함` means a decision removed the step. Do not count it as broken.
