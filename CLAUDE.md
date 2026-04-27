# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 15 + React 19 모던 웹 스타터킷 프로젝트입니다. Tailwind CSS v4와 shadcn/ui를 기반으로 하는 프로덕션-레디 스타터 템플릿입니다.

**Tech Stack:**
- Framework: Next.js 16.2.4 (App Router)
- UI Library: React 19.2.4
- CSS: Tailwind CSS v4 (@tailwindcss/postcss)
- UI Components: shadcn/ui (Radix UI + Tailwind)
- Form Handling: React Hook Form + Zod
- Icons: Lucide React
- Theme: next-themes (Light/Dark mode)
- Toast: Sonner
- Type Checking: TypeScript 5

## Project Structure

```
src/
├── app/                    # Next.js 앱 라우터 (페이지 + 레이아웃)
│   ├── layout.tsx          # 루트 레이아웃 (ThemeProvider, Toaster 포함)
│   ├── page.tsx            # 홈 페이지
│   ├── globals.css         # 전역 스타일 + Tailwind 지시문
│   └── [route]/            # 동적 라우트
├── components/             # 재사용 가능한 React 컴포넌트
│   ├── ui/                 # shadcn/ui 컴포넌트 라이브러리
│   ├── layout/             # 페이지 레이아웃 컴포넌트 (Header, Footer, Sidebar)
│   ├── sections/           # 홈페이지 섹션 (ShowcaseHero, ShowcaseCards 등)
│   └── theme/              # 테마 제공자 및 토글 (ThemeProvider, ThemeToggle)
├── hooks/                  # 커스텀 React 훅
│   ├── useMediaQuery.ts    # 반응형 디자인용 미디어 쿼리 훅
│   ├── useLocalStorage.ts  # 로컬스토리지 상태 관리 훅
│   └── index.ts            # 훅 export 중앙 관리
├── lib/
│   ├── utils.ts            # 유틸리티 함수 (cn() - Tailwind merge)
│   ├── constants.ts        # 전역 상수 (NAV_LINKS, BREAKPOINTS 등)
│   └── validations.ts      # Zod 스키마 정의
└── (config files)
```

## Commands

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 시작 (localhost:3000) |
| `npm run build` | 프로덕션 빌드 생성 |
| `npm run start` | 프로덕션 빌드 실행 |
| `npm run lint` | ESLint로 코드 린트 확인 |

**주요 파일:**
- `next.config.ts`: Next.js 설정
- `tsconfig.json`: TypeScript 설정 (경로 alias @/ 포함)
- `eslint.config.mjs`: ESLint 설정 (next/core-web-vitals + typescript)
- `postcss.config.mjs`: PostCSS 설정 (@tailwindcss/postcss 플러그인)
- `components.json`: shadcn/ui CLI 설정

## Key Architecture Patterns

### 1. **Theme Provider 패턴**
```
Root Layout (ThemeProvider)
└── next-themes로 light/dark 모드 관리
    └── attribute="class": globals.css의 .dark 클래스와 호환
```
- `src/components/theme/ThemeProvider.tsx`: 테마 제공자 설정
- `src/components/theme/ThemeToggle.tsx`: 테마 전환 버튼
- `globals.css`: CSS 변수로 색상 정의 (Tailwind v4)

### 2. **Path Aliases**
`@/`로 시작하는 import는 `src/` 디렉토리를 가리킵니다:
```typescript
import { cn } from "@/lib/utils"
import Button from "@/components/ui/button"
import { useMediaQuery } from "@/hooks"
```

### 3. **shadcn/ui Components**
- Radix UI 기반 헤드리스 컴포넌트
- `src/components/ui/` 디렉토리에 개별 파일로 관리
- Tailwind CSS로 스타일링
- `components.json`의 alias 설정으로 자동 import

### 4. **Form Validation Pattern**
React Hook Form + Zod를 조합하여 사용:
```typescript
// lib/validations.ts에 Zod 스키마 정의
const formSchema = z.object({...})

// 컴포넌트에서 사용
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema)
})
```

### 5. **Global Providers in Root Layout**
```
RootLayout
├── ThemeProvider (next-themes)
├── TooltipProvider (Radix UI)
├── {children}
└── Toaster (Sonner)
```

## Styling Guidelines

### Tailwind CSS v4
- **새로운 문법**: `@tailwindcss/postcss` 사용 (v3의 @tailwind 지시문 대체)
- **CSS 변수**: 색상 및 다른 토큰이 CSS 변수로 정의됨
- **Breakpoints** (src/lib/constants.ts):
  - sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px

### Class Merging
`cn()` 함수 사용 (src/lib/utils.ts):
```typescript
cn("px-4 py-2", condition && "bg-blue-500")
// clsx + tailwind-merge로 충돌 없는 클래스 병합
```

### Theme Colors
globals.css에 CSS 변수로 정의된 색상을 사용하며, light/dark 모드에서 자동으로 전환됩니다.

## Component Convention

### 1. **UI Components** (shadcn/ui)
- 위치: `src/components/ui/`
- 단순하고 조합 가능한 구성 요소
- 상태 관리 로직 최소화

### 2. **Layout Components**
- 위치: `src/components/layout/`
- Header, Footer, Sidebar, PageLayout 등
- 페이지 구조 담당

### 3. **Section Components** (홈페이지)
- 위치: `src/components/sections/`
- ShowcaseHero, ShowcaseCards, ShowcaseForms 등
- 특정 페이지에 맞춘 조합된 컴포넌트

### Props 타입 정의
```typescript
interface ComponentProps {
  className?: string
  // 다른 props
}

export function Component({ className, ...props }: ComponentProps) {
  return <div className={cn("base-classes", className)} {...props} />
}
```

## Navigation & Routing

- **NAV_LINKS** (src/lib/constants.ts): 헤더/네비게이션에 표시되는 링크
- **SIDEBAR_LINKS** (src/lib/constants.ts): 대시보드 사이드바 메뉴
- **동적 라우트**: `src/app/[route]/page.tsx` 형식

## Custom Hooks

- `useMediaQuery(query)`: 반응형 디자인 (src/hooks/useMediaQuery.ts)
- `useLocalStorage(key, initialValue)`: 로컬스토리지 (src/hooks/useLocalStorage.ts)

## Type Safety

- **TypeScript strict mode**: 모든 타입 명시 필수
- **any 타입 금지**: 특정 타입 지정
- **Zod 스키마**: 런타임 검증용 스키마 정의

## Common Development Scenarios

### 새 페이지 추가
1. `src/app/[route]/page.tsx` 파일 생성
2. `PageLayout` 또는 `RootLayout` 사용
3. `NAV_LINKS`에 링크 추가 (필요 시)

### 새 컴포넌트 추가
1. 위치 결정: ui (기본 요소) → layout (페이지 구조) → sections (조합)
2. TypeScript로 props 정의
3. Tailwind + cn() 사용하여 스타일링
4. export로 `components/` 인덱스에 추가

### 폼 추가
1. `lib/validations.ts`에 Zod 스키마 정의
2. React Hook Form + useForm 연동
3. shadcn/ui form 컴포넌트 사용 (또는 Input + Label)

### 전역 상수/설정
- `src/lib/constants.ts`에 집중 관리
- 매직 넘버 금지, 모두 상수로 정의

## Git & Commits

- **기본 브랜치**: main (PR 대상)
- **현재 브랜치**: master
- **언어**: 커밋 메시지는 한국어로 작성
- **패턴**: 변경 내용을 명확하게 설명

## Notes

- **Hydration 경고**: RootLayout의 `suppressHydrationWarning`은 next-themes로 인한 경고 억제 (정상)
- **Tailwind v4 문법**: 기존 v3와 다름 - `node_modules/next/dist/docs/` 참고
- **ESLint**: Next.js core web vitals + TypeScript 규칙 적용
