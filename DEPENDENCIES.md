# 스킬 연결 관계

2026-10-03 기준 19개 스킬을 관리합니다. 단독 폴더 설치를 기준으로 필요한 지침·참조·스크립트·에셋을 내장합니다. 연결 목록의 원본은 [skill-dependencies.json](skill-dependencies.json), 실제 로딩 경로는 각 스킬의 `references/dependencies.md`입니다.

| 스킬 | 직접 연결하는 내장 자료 | 전체 내장 모듈 수 |
|---|---|---:|
| component-workbench | ui-design, 브라우저 연결 | 19 |
| decision-report | 브라우저 연결 | 1 |
| deploy | 독립 실행 | 0 |
| deploy-branch-deploy | deploy | 1 |
| develop-pr-review-merge | 브라우저 연결 | 1 |
| iky-design | humanize-korean, 브라우저 연결 | 2 |
| iky-design-audit | iky-design, humanize-korean | 3 |
| image-assets | 이미지 생성 연결 | 1 |
| instagram-korean-writing | 독립 실행, 자체 말투 분석 자료 | 0 |
| interactive-landing | 독립 실행, 자체 디자인·인터랙션 기준과 CSS 토큰 | 0 |
| product-plan-html | product-planner, 브라우저 연결 | 20 |
| product-planner | ui-design | 19 |
| recommend-animate | 독립 실행 | 0 |
| screen-flow | ui-design, 이미지 생성·브라우저 연결 | 19 |
| standup | 독립 실행 | 0 |
| threads-korean-writing | 독립 실행, 자체 말투 분석 자료 | 0 |
| ui-design | IKY 설계·검수, 이미지 제작, 한국어 검수, UI 전문 지침, 브라우저·컴포넌트 연결 | 18 |
| website-launch-readiness | 독립 실행 | 0 |
| x-korean-writing | 독립 실행, 자체 말투 분석 자료 | 0 |

전체 수에는 연결 스킬이 다시 참조하는 지원 자료까지 포함됩니다. 같은 패키지 안에서는 한 번만 저장합니다. `better-*`의 상호 참조는 하나의 평평한 묶음으로 해결하며, 이미 읽은 지침을 반복 호출하지 않습니다. 독립 스킬에는 원래 작업에 필요하지 않은 의존성을 추가하지 않았습니다.

## 필요한 때만 읽는 연결

- `ui-design`은 프로젝트의 디자인 설정을 우선하고, 필요한 범위에서만 IKY와 전문 지침을 읽습니다. 내장되어 있다는 이유로 전체 감사를 실행하지 않습니다.
- 한국어 제품 문구는 `humanize-korean/references/ui-copy-review.md`를 사용합니다. 버튼 한 단어에 장문 윤문용 점수·변경률·별도 결과 파일을 강제하지 않습니다.
- `product-planner → ui-design`은 기획을 보조하는 제한된 검토입니다. 제품 코드 구현이나 트래커 발행 권한이 생기지 않습니다.
- `product-plan-html → product-planner`는 새 기획 판단이 실제로 필요한 경우에만 사용합니다. 문서 서식 변경으로 기획 인터뷰를 다시 시작하지 않습니다.
- `deploy-branch-deploy → deploy`는 승인된 통합 커밋의 배포·검증에만 적용합니다. 내장 파일을 열거나 스킬을 설치하는 행위는 배포 승인이 아닙니다.

## 별도 작업과 실행 환경

`screen-flow` 산출물을 읽는 것은 `component-workbench`의 입력 경로입니다. 문서 작성에 화면 이미지 생성기까지 필요하지 않아 그 생성 워크플로는 추가하지 않았습니다. `to-prd`, `to-issues`, `interface-review`는 기존 지침에서 명시적으로 분리한 후속 작업입니다. 이들을 자동 실행하거나 현재 작업의 필수 조건으로 만들지 않았습니다.

브라우저·이미지 생성·컴포넌트 라이브러리 연결 안내는 자체 작성한 휴대 가능한 지침입니다. 실행 도구나 외부 스킬 전체를 복제한 것으로 표시하지 않습니다. 해당 도구의 최신 사용법, 프로젝트 패키지, 계정과 권한은 실행 환경에서 확인합니다. 도구가 없으면 독립적으로 가능한 작업은 진행하고, 해당 검증·생성 작업은 미완료로 표시합니다.

각 폴더는 독립 설치를 위해 필요한 자료를 실제 파일로 포함합니다. 폰트·이미지까지 포함하므로 전체 저장소의 작업 폴더 용량은 늘어나지만, 설치 후 다른 저장소나 심볼릭 링크에 의존하지 않습니다. 유지보수는 원본을 수정한 뒤 생성 도구로 내장본을 갱신하는 방식입니다.
