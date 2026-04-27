---
description: '변경된 코드를 Next.js + TypeScript + React 관점에서 리뷰합니다'
allowed-tools:
  [
    'Bash(git diff:*)',
    'Bash(git status:*)',
    'Read',
  ]
---

# Claude 명령어: 코드 리뷰

변경된 파일을 프로젝트 기술 스택 기준으로 상세 리뷰합니다.

## 사용법

```
/review
/review [파일경로]
```

인자 없음: `git diff HEAD` (최신 커밋 vs 현재)
파일 경로 지정: 해당 파일만 리뷰

## 리뷰 체크리스트

### TypeScript 안전성
- [ ] `any` 타입 사용 여부
- [ ] 타입 단언(`as`) 남용 여부
- [ ] `undefined`/`null` 처리 누락
- [ ] 제네릭 타입 적절한 활용
- [ ] strict mode 위반 사항

### React / Next.js 패턴
- [ ] Server Component vs Client Component 적절한 구분
- [ ] 불필요한 `"use client"` 사용
- [ ] `useEffect` 의존성 배열 정확성
- [ ] 메모이제이션 필요 여부 (useMemo, useCallback)
- [ ] 컴포넌트 렌더링 최적화
- [ ] 동적 라우트 및 메타데이터 처리

### 성능
- [ ] 불필요한 리렌더링 발생 패턴
- [ ] 이미지 최적화 (`next/image` 사용)
- [ ] 번들 크기 영향 (동적 import 고려)
- [ ] 데이터 페칭 위치 적절성 (서버 vs 클라이언트)

### 접근성 (a11y)
- [ ] ARIA 속성 적절성
- [ ] 키보드 네비게이션 지원
- [ ] 색상 대비 (다크모드 포함)
- [ ] 의미론적 HTML 사용

### 스타일링
- [ ] Tailwind CSS 클래스 일관성
- [ ] `cn()` 함수 사용 여부
- [ ] 반응형 클래스 누락 여부 (sm:/md:/lg:/xl:/2xl:)
- [ ] 다크모드 스타일 처리

### 코드 품질
- [ ] 한국어 주석 작성
- [ ] 중복 코드 제거 가능성
- [ ] 매직 넘버 상수화 여부
- [ ] 에러 처리 적절성
- [ ] 함수 길이 (30줄 이하 권장)

## 출력 포맷

```
## 코드 리뷰 결과: [파일명]

### 🔴 Critical (수정 필수)
- 이슈 1
  ```typescript
  // 현재 코드
  ```
  **개선 방안:**
  ```typescript
  // 개선 코드
  ```

### 🟡 Warning (수정 권장)
- 이슈 1
  ```typescript
  // 현재 코드
  ```
  **개선 방안:**
  ```typescript
  // 개선 코드
  ```

### 🟢 Suggestion (선택적 개선)
- 제안 1

### 👍 잘된 부분
- 긍정적 피드백 1
- 긍정적 피드백 2

### 총평
전반적인 코드 품질 평가
```

## 규칙

- 각 이슈에 코드 스니펫 + 개선 예시 포함
- 긍정적 피드백도 포함 (잘된 부분 언급)
- 리뷰 결과는 한국어
- 모든 심각도 수준 포함 (Critical, Warning, Suggestion)
