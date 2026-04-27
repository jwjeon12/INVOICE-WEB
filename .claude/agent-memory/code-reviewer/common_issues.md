---
name: Common Issues
description: 전체 코드 리뷰에서 발견된 반복적 위반 패턴 및 주의 사항
type: project
---

# 자주 발견되는 이슈 패턴

## 규칙 위반

### 1. console.log 잔존
- 위치: ShowcaseForms.tsx:36
- 패턴: `console.log("Form submitted:", data)` — 폼 제출 핸들러에 남아있음
- 교훈: 프로덕션 빌드 전 제거 필요

### 2. 배열 인덱스를 key로 사용
- 위치: ShowcaseCards.tsx:22, ShowcaseFeedback.tsx:97
- 패턴: `key={index}` — 정렬/필터 변경 시 리렌더링 오류 유발
- 교훈: 고유한 식별자 사용 (title, id 등)

### 3. cn() 미사용 (레이아웃 컴포넌트)
- 위치: PageLayout.tsx, Sidebar.tsx
- 패턴: 템플릿 리터럴로 직접 클래스 병합 (`${className}`)
- 교훈: cn() 사용으로 Tailwind 충돌 방지

### 4. React Hook Form 내장 isSubmitting 미사용
- 위치: ShowcaseForms.tsx
- 패턴: 별도 `useState(false)`로 isSubmitting 관리
- 교훈: `form.formState.isSubmitting` 활용이 더 안전하고 간결함

### 5. SIDEBAR_LINKS icon 타입 불일치
- 위치: constants.ts, Sidebar.tsx
- 패턴: icon 필드가 string 타입이나 `<span>{link.icon}</span>`으로 렌더링
- 교훈: Lucide 아이콘 컴포넌트 타입으로 변경 필요

### 6. prose 클래스 의존성 누락
- 위치: privacy/page.tsx, terms/page.tsx
- 패턴: `prose prose-invert` 클래스 사용 중이나 @tailwindcss/typography 미설치
- 교훈: 의존성 설치 또는 클래스 제거

### 7. 날짜 하드코딩 방식
- 위치: privacy/page.tsx, terms/page.tsx
- 패턴: Server Component에서 `new Date()` → 빌드 시점 날짜로 고정됨
- 교훈: 정적 날짜 상수로 대체하거나 Client Component로 처리

### 8. 폼 에러 메시지 aria 연결 누락
- 위치: ShowcaseForms.tsx
- 패턴: aria-invalid는 있으나 aria-describedby로 에러 메시지 연결 없음
- 교훈: 스크린리더 접근성 향상을 위해 aria-describedby 추가

### 9. 매직 넘버 잔존
- 위치: useMediaQuery.ts (767px), MobileMenu.tsx (w-64)
- 패턴: BREAKPOINTS 상수 대신 직접 픽셀값 사용
- 교훈: BREAKPOINTS.md - 1 패턴으로 상수 참조

### 10. SheetContent 고정 너비 w-64
- 위치: MobileMenu.tsx:22
- 패턴: `className="w-64"` — 반응형 고려 없는 고정 너비
- 교훈: SheetContent 기본 스타일이 반응형이므로 w-64 제거 권장

## 잘 된 패턴 (긍정적 레퍼런스)
- Server/Client Component 분리 명확 ("use client" 적절 배치)
- TypeScript strict 모드 + any 타입 완전 배제
- Zod 스키마 중앙화 (validations.ts)
- 접근성: aria-label, aria-invalid 일관 사용
- ThemeProvider 얇은 래퍼 패턴 (Server → Client 경계 최소화)
- BREAKPOINTS 상수화 (constants.ts)
- 훅 배럴 export (hooks/index.ts)
