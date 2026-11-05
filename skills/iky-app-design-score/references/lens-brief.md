# Shared lens brief — template

Copy this into one file per review and fill in the brackets. Every lens agent reads it first.

```markdown
# Shared brief — [App] screen review

Product: [one paragraph: what it is, who uses it, the main use contexts, any product principle that changes judgments
(for example "curation is personalised by interests; popularity is only a fallback")]. Theme shown: [dark/light].

Screens ([device, OS, build], captured via [tool]):
- [folder]/*.png — [state, e.g. signed in], [n] screens: [NN-route list]
- [folder]/*.png — [state, e.g. signed out], [n] screens: [...]
Ignore: [mirroring indicator, debug badges]. Known conditions: [e.g. a permission sheet appeared on top of screen X].

Rules: read-only. Open only the files named in your lens plus these screenshots. No sub-agents. Judge only what is visible;
anything that needs interaction (motion, press states, Dynamic Type) goes under "needs interaction" instead of being guessed.

Output (≤ 45 lines, Korean):
1. 영역 점수 (1–10, one line each with a ≤15-word reason): 시각 위계 / 레이아웃·간격 / 일관성(컴포넌트·아이콘·색) / 타이포그래피 /
   색·다크모드 / UX 카피 / 사용 흐름·내비게이션 / 빈 상태·피드백 / 브랜드 개성(AI 티 없음) / 접근성(보이는 범위)
2. 종합 점수 /100 (your lens's weighting, one line on how).
3. 발견 사항 표, severity-sorted, max 15 rows:
   `화면파일 | 문제 | 근거(규칙 ID 또는 스킬 규칙) | 심각도 1–5 | 신뢰도 high/med/low` (5 = 출시 전 반드시, 1 = 사소). Name the element and where it is.
4. 잘하고 있는 점 3개.
5. needs interaction: up to 5 items.
```

Lens-specific additions:
- Benchmark lens: quote the exact on-screen Korean text for every W* finding; for each AI-look tell A1–A16 say present/absent with the screen;
  end with "AI 티 지수 0–10" and its three biggest contributors.
- First-time user lens: start with the signed-out screens; one line per screen on "what is this for / what would I tap next";
  flag unknown words, hidden paths and pushy prompts. Up to 55 lines.
