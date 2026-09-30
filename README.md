# My Skills

UI 설계, 기획, 이미지 제작, 배포와 업무보고에 사용하는 스킬 15개를 모은 공개 저장소입니다. `SKILL.md`와 실행에 필요한 스크립트, 참조 문서, 이미지·폰트, 원래의 라이선스 파일을 함께 보관합니다.

## 스킬 목록

| 스킬 | 용도 |
|---|---|
| [component-workbench](skills/component-workbench/SKILL.md) | 시안·기존 코드 기반 공통 컴포넌트 구현과 인터랙티브 문서 |
| [decision-report](skills/decision-report/SKILL.md) | 선택·승인이 가능한 HTML 보고서 |
| [deploy](skills/deploy/SKILL.md) | 배포 절차 실행·검증 |
| [deploy-branch-deploy](skills/deploy-branch-deploy/SKILL.md) | deploy 브랜치 통합·배포 |
| [develop-pr-review-merge](skills/develop-pr-review-merge/SKILL.md) | develop PR 생성·리뷰·수정·머지 |
| [iky-design](skills/iky-design/SKILL.md) | IKY 디자인 규칙 적용 |
| [iky-design-audit](skills/iky-design-audit/SKILL.md) | IKY 디자인 규칙 검수 |
| [image-assets](skills/image-assets/SKILL.md) | 이미지 스타일 가이드와 에셋 제작 |
| [product-plan-html](skills/product-plan-html/SKILL.md) | 기획서를 HTML 문서로 제작 |
| [product-planner](skills/product-planner/SKILL.md) | 제품·기능·정책 기획 |
| [recommend-animate](skills/recommend-animate/SKILL.md) | 애니메이션 도구 선택·조합 |
| [screen-flow](skills/screen-flow/SKILL.md) | 화면 시안 갤러리·연결 지도 생성과 검증 |
| [standup](skills/standup/SKILL.md) | Git 기록 기반 한국어 업무보고 |
| [ui-design](skills/ui-design/SKILL.md) | UI 설계·구현·시안 비교 |
| [website-launch-readiness](skills/website-launch-readiness/SKILL.md) | 출시 전 20개 항목 점검 |

## 사용 방법

필요한 스킬 폴더를 사용하는 에이전트 환경의 스킬 경로에 연결하거나 설치합니다. `SKILL.md`만 가져오면 참조 문서나 실행 파일이 빠질 수 있으므로 해당 폴더 전체를 사용하세요.

```sh
git clone https://github.com/AustinKimDev/my-skills.git ~/Workspace/my-skills
```

이 저장소의 로컬 관리 구조는 다음과 같습니다.

- 원본: `~/Workspace/my-skills/skills/<스킬명>/`
- 공통 발견 경로: `~/.agents/skills/<스킬명>`에서 원본을 가리키는 심볼릭 링크
- Codex·Orca 계정별 경로: 공통 발견 경로로 연결

기존 설치가 있다면 덮어쓰지 말고 차이를 확인한 뒤 연결하세요. 다른 에이전트 환경에서는 해당 환경의 스킬 설치 방식을 따릅니다. 소스 수정은 원본에서 하고, 커밋과 원격 푸시는 별도로 수행합니다.

## 외부 스킬과 도구

`humanize-korean`, `better-writing`, `imagegen` 등 일부 연동 대상은 별도 설치 항목입니다. 각 스킬의 필요 조건을 확인하세요. `humanize-korean` 연동은 설치된 버전에 `references/ui-copy-review.md`가 있는지도 확인해야 합니다. 이 저장소만 복제하면 외부 스킬·브라우저·이미지 생성 도구까지 설치되지는 않습니다.

## 수록 범위

직접 관리 대상으로 선정한 위 15개를 보관합니다. `notion-work-sync`와 `magic-ui`는 외부 스킬이므로 수록하지 않습니다. 외부 스킬에 로컬 연동을 추가한 `humanize-korean`, OMD·ui-craft 계열도 포함하지 않습니다.

개인 경로, 회사 계정 매핑, 프로젝트 전용 어댑터와 작업 화면은 공개본에서 제외했습니다. 프로젝트별 정책과 비공개 자료는 각 프로젝트의 지침·설정에서 관리하세요. 공개본은 이전 비공개 이력과 분리된 첫 커밋으로 시작합니다.

## 참조 자료와 라이선스

번들에 포함된 폰트·라이브러리의 기존 라이선스와 출처 문서를 유지합니다. 외부 서비스 화면과 관련 메모는 출처가 표시된 디자인 참고 자료이며, 해당 서비스의 공식 스킬이나 제휴를 뜻하지 않습니다. 스킬에 포함된 모든 자료가 저장소 작성자의 창작물이라는 의미는 아닙니다.
