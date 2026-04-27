---
description: '현재 브랜치의 변경사항을 분석하여 GitHub PR을 생성합니다'
allowed-tools:
  [
    'Bash(git log:*)',
    'Bash(git diff:*)',
    'Bash(git status:*)',
    'Bash(git branch:*)',
    'Bash(git push:*)',
    'Bash(gh pr create:*)',
    'Bash(gh pr view:*)',
  ]
---

# Claude 명령어: PR 생성

현재 브랜치의 변경사항을 분석하여 체계적인 GitHub Pull Request를 생성합니다.

## 사용법

```
/pr
```

## 프로세스

1. **브랜치 상태 확인**
   - 현재 브랜치명 확인
   - main 대비 변경된 커밋 목록 수집
   - 스테이지되지 않은 변경사항 경고

2. **변경사항 분석**
   - `git diff main...HEAD`로 전체 diff 분석
   - 변경 파일 목록 분류 (feat/fix/refactor/docs 등)
   - 스택(Next.js, React, TypeScript)별 컨텍스트 반영

3. **PR 초안 작성**
   아래 형식으로 한국어 PR 초안을 작성:
   ```
   제목: [타입] 기능/수정 내용 요약
   
   ## 개요
   변경사항의 목적과 맥락 설명
   
   ## 변경사항
   - 주요 변경 1
   - 주요 변경 2
   
   ## 스크린샷 (선택)
   UI 변경 시 스크린샷 섹션 포함
   
   ## 체크리스트
   - [ ] TypeScript 타입 에러 없음
   - [ ] ESLint 경고 없음
   - [ ] 반응형 동작 확인
   - [ ] 다크모드 확인
   ```

4. **사용자 확인**
   - 초안 출력 후 수정 여부 확인
   - 승인 시 `gh pr create` 실행

## 규칙

- PR 제목/본문은 한국어
- 타입 prefix 포함: [feat], [fix], [refactor], [docs], [chore]
- **Claude 서명 절대 추가하지 않음**
- PR 제목은 72자 이하 (git 컨벤션 준수)

## 커밋 타입 매핑

| 타입 | 설명 |
|------|------|
| `[feat]` | 새로운 기능 추가 |
| `[fix]` | 버그 수정 |
| `[refactor]` | 코드 리팩토링 |
| `[perf]` | 성능 개선 |
| `[docs]` | 문서화 |
| `[style]` | 스타일/포맷팅 |
| `[test]` | 테스트 추가 |
| `[chore]` | 빌드/도구 설정 |

## 참고

- PR은 feature 브랜치 → main으로 생성
- 리뷰 전 스스로 `/review` 커맨드로 코드 검토 권장
- PR 생성 후 `gh pr view --web`으로 브라우저 열기 가능
