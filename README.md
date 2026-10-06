# My Skills

UI 설계, 기획, 이미지 제작, SNS 글쓰기, 배포와 업무보고에 사용하는 스킬 20개를 모은 공개 저장소입니다. `SKILL.md`와 실행에 필요한 스크립트, 참조 문서, 이미지·폰트, 원래의 라이선스 파일을 함께 보관합니다.

## 스킬 목록

| 스킬 | 용도 |
|---|---|
| [component-workbench](skills/component-workbench/SKILL.md) | 시안·기존 코드 기반 공통 컴포넌트 구현과 인터랙티브 문서 |
| [decision-report](skills/decision-report/SKILL.md) | 선택·승인이 가능한 HTML 보고서 |
| [find-partner](skills/find-partner/SKILL.md) | 파트너 후보 조사·최근 5개와 대표 3개 콘텐츠·사진 포함 HTML 보고서 |
| [deploy](skills/deploy/SKILL.md) | 배포 절차 실행·검증 |
| [deploy-branch-deploy](skills/deploy-branch-deploy/SKILL.md) | deploy 브랜치 통합·배포 |
| [develop-pr-review-merge](skills/develop-pr-review-merge/SKILL.md) | develop PR 생성·리뷰·수정·머지 |
| [iky-design](skills/iky-design/SKILL.md) | IKY 디자인 규칙 적용 |
| [iky-design-audit](skills/iky-design-audit/SKILL.md) | IKY 디자인 규칙 검수 |
| [image-assets](skills/image-assets/SKILL.md) | 이미지 스타일 가이드와 에셋 제작 |
| [instagram-korean-writing](skills/instagram-korean-writing/SKILL.md) | 인스타그램 이미지와 목적에 맞는 한국어 캡션·캐러셀 문구 |
| [interactive-landing](skills/interactive-landing/SKILL.md) | 유메잇 스타일의 인터랙티브 제품 랜딩과 반응형 모션 |
| [product-plan-html](skills/product-plan-html/SKILL.md) | 기획서를 HTML 문서로 제작 |
| [product-planner](skills/product-planner/SKILL.md) | 제품·기능·정책 기획 |
| [recommend-animate](skills/recommend-animate/SKILL.md) | 애니메이션 도구 선택·조합 |
| [screen-flow](skills/screen-flow/SKILL.md) | 화면 시안 갤러리·연결 지도 생성과 검증 |
| [standup](skills/standup/SKILL.md) | Git 기록 기반 한국어 업무보고 |
| [threads-korean-writing](skills/threads-korean-writing/SKILL.md) | 구체적인 생각과 대화를 중심으로 쓰는 한국어 Threads 게시물 |
| [ui-design](skills/ui-design/SKILL.md) | UI 설계·구현·시안 비교 |
| [website-launch-readiness](skills/website-launch-readiness/SKILL.md) | 출시 전 20개 항목 점검 |
| [x-korean-writing](skills/x-korean-writing/SKILL.md) | 목적에 따라 구성하는 한국어 X 게시물·모집 공지·답글 |

## 사용 방법

필요한 스킬 폴더 하나를 사용하는 에이전트 환경의 스킬 경로에 연결하거나 설치합니다. 필요한 연결 스킬과 참조 자료는 그 폴더의 `embedded/`에 포함되어 있습니다. `SKILL.md`만 가져오면 참조 문서나 실행 파일이 빠지므로 해당 폴더 전체를 사용하세요. 다른 스킬 폴더를 함께 설치할 필요는 없습니다.

```sh
git clone https://github.com/AustinKimDev/my-skills.git ~/Workspace/my-skills
```

이 저장소의 로컬 관리 구조는 다음과 같습니다.

- 원본: `~/Workspace/my-skills/skills/<스킬명>/`
- 공통 발견 경로: `~/.agents/skills/<스킬명>`에서 원본을 가리키는 심볼릭 링크
- Codex·Orca 계정별 경로: 공통 발견 경로로 연결

기존 설치가 있다면 덮어쓰지 말고 차이를 확인한 뒤 연결하세요. 다른 에이전트 환경에서는 해당 환경의 스킬 설치 방식을 따릅니다. 소스 수정은 원본에서 하고, 커밋과 원격 푸시는 별도로 수행합니다.

## 내장 스킬과 실행 도구

20개 중 연결 지침이 필요한 12개에는 의존 자료를 내장했고, 독립적인 8개에는 불필요한 의존성을 추가하지 않았습니다. [스킬별 연결 관계](DEPENDENCIES.md)에서 범위와 조건을 확인할 수 있습니다.

SNS 글쓰기 스킬 3개에는 한국어 사례 관찰, 공식 자료와 분석의 한계를 기록했습니다. 기존 계정 말투와 게시 목적을 우선하며, 글쓰기 스킬 자체가 게시나 계정 변경 권한을 부여하지는 않습니다.

`humanize-korean`, `better-*`, Apple·Emil 관련 지원 스킬 12개는 MIT 라이선스와 출처를 포함합니다. 한국어 제품 문구에는 내장된 UI 문구 검수 모드를 사용합니다. 내장 지침은 필요한 작업에서만 읽으며, 전체 스킬을 연쇄 실행하거나 새로운 권한을 부여하지 않습니다. 내장 진입 문서는 `GUIDE.md`로 저장해 최상위 스킬로 중복 등록되지 않게 했습니다.

브라우저, 이미지 생성 도구, 계정·로그인, 프로젝트의 컴포넌트 패키지는 실행 환경에서 제공해야 합니다. 이를 연결하는 안내는 내장되어 있지만 실행 도구 자체나 계정 권한을 설치·제공하지는 않습니다. 환경에 설치된 `imagegen` 같은 도구별 지침이 있다면 그 환경의 사용 규칙을 따릅니다.

## 내장본 갱신

원본은 `skills/<스킬명>/`에서 `embedded/`와 생성된 `references/dependencies.md`를 제외한 파일입니다. 외부 지원 스킬 원본은 `vendor/skills/`, 환경 연결 안내는 `resources/`에 있습니다. 연결 관계의 기준은 [skill-dependencies.json](skill-dependencies.json)입니다.

```sh
python3 scripts/bundle_skills.py build
python3 scripts/bundle_skills.py check
python3 -m unittest discover -s scripts -p 'test_*.py'
```

Python 3.10 이상 표준 라이브러리만 사용합니다. 변경된 원본을 모든 내장본에 반영하며, 생성 파일의 직접 수정이나 관리 대상 밖의 파일이 발견되면 덮어쓰지 않고 중단합니다. 유지보수 절차는 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요.

## 수록 범위

직접 관리 대상으로 선정한 위 20개를 최상위 스킬로 보관합니다. `notion-work-sync`, `magic-ui`, OMD·ui-craft 계열은 개인 제작 스킬 목록에 포함하지 않습니다. 2026-09-30 의존성 내장 요청에 따라 `humanize-korean` 등 재배포 가능한 지원 스킬은 출처가 구분된 내장 자료로 추가했습니다. 이는 외부 스킬을 직접 제작한 것으로 분류하는 변경이 아닙니다. 2026-10-02에는 X·인스타그램·Threads의 한국어 말투 분석과 각 플랫폼 글쓰기 스킬 제작 요청에 따라 독립 스킬 3개를 추가했습니다. 2026-10-03에는 유메잇 랜딩 페이지의 구성과 모션을 재사용하는 `interactive-landing`을 추가했습니다.

2026-10-06에는 프로젝트별 모집 조건을 입력받는 `find-partner`를 추가했습니다. 후보별 최근 게시물 5개와 대표 게시물 3개를 수집하고 출처와 사진을 포함한 HTML 보고서를 만듭니다.

개인 경로, 회사 계정 매핑, 프로젝트 전용 어댑터와 작업 화면은 공개본에서 제외했습니다. 프로젝트별 정책과 비공개 자료는 각 프로젝트의 지침·설정에서 관리하세요. 공개본은 이전 비공개 이력과 분리된 첫 커밋으로 시작합니다.

## 참조 자료와 라이선스

번들에 포함된 폰트·라이브러리의 기존 라이선스와 출처 문서를 유지합니다. 외부 서비스 화면과 관련 메모는 출처가 표시된 디자인 참고 자료이며, 해당 서비스의 공식 스킬이나 제휴를 뜻하지 않습니다. 스킬에 포함된 모든 자료가 저장소 작성자의 창작물이라는 의미는 아닙니다.

지원 스킬의 출처와 라이선스는 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md), 가져온 파일의 해시는 [vendor/sources.json](vendor/sources.json)에 기록합니다. 각 독립 스킬 폴더의 내장본에도 필요한 `LICENSE`와 `SOURCES.json`이 함께 들어갑니다.
