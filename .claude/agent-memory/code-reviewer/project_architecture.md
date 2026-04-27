---
name: Project Architecture
description: 프로젝트 구조, 컨벤션, 컴포넌트 패턴 메모
type: project
---

# 프로젝트 구조 (claude-next.js-starters)

## 기술 스택
- Next.js 16.2.4 (App Router), React 19.2.4, TypeScript 5 (strict)
- Tailwind CSS v4 (@tailwindcss/postcss), shadcn/ui (radix-ui ^1.4.3)
- React Hook Form + @hookform/resolvers + Zod
- usehooks-ts (useMediaQuery, useLocalStorage 래퍼)
- next-themes (light/dark), Sonner (toast), lucide-react

## 디렉토리 규칙
- src/components/ui/        → shadcn/ui 원본 컴포넌트 (25개)
- src/components/layout/    → Header, Footer, Sidebar, PageLayout, MobileMenu
- src/components/sections/  → ShowcaseHero, ShowcaseButtons, ShowcaseForms, ShowcaseCards, ShowcaseOverlays, ShowcaseFeedback, Heading
- src/components/theme/     → ThemeProvider, ThemeToggle
- src/hooks/                → useMediaQuery, useIsMobile, useIsTablet, useIsDesktop, useLocalStorage
- src/lib/                  → constants.ts (NAV_LINKS, SIDEBAR_LINKS, SITE_NAME, BREAKPOINTS), utils.ts (cn()), validations.ts (loginSchema, registerSchema, contactSchema)
- src/app/                  → layout.tsx, page.tsx, about, examples, privacy, terms

## 확립된 패턴
- "use client" 필요시 파일 상단에 명시 (훅/상태/이벤트 핸들러 포함 컴포넌트)
- Server Component 기본, Client Component 필요 최소화
- Props 인터페이스 명시적 정의 (className?: string 포함)
- cn() 사용하여 클래스 병합 (레이아웃 컴포넌트는 일부 미사용)
- NAV_LINKS, SIDEBAR_LINKS, BREAKPOINTS 상수 src/lib/constants.ts에 중앙화
- Zod 스키마 src/lib/validations.ts에 집중 관리
- 폼 에러 표시: aria-invalid + p.text-destructive 패턴
- 아이콘: lucide-react 일관 사용
- 데이터 페칭: 클라이언트 컴포넌트에서 직접 fetch (SWR/React Query 미사용)

## 주의 사항
- SIDEBAR_LINKS의 icon 필드가 문자열("LayoutDashboard")로 정의되어 실제 아이콘 컴포넌트로 렌더링되지 않음
- privacy/terms 페이지가 Server Component에서 new Date() 호출 → 빌드 시점 날짜 고정
- prose 클래스 사용 중이나 @tailwindcss/typography 미설치
