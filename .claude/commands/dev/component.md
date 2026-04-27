---
description: '프로젝트 컨벤션에 맞는 React 컴포넌트를 생성합니다'
allowed-tools:
  [
    'Read',
    'Write',
    'Bash(ls:*)',
    'Bash(npx shadcn add:*)',
  ]
---

# Claude 명령어: 컴포넌트 생성

Next.js 15 + React 19 + TypeScript 컨벤션에 맞는 컴포넌트를 생성합니다.

## 사용법

```
/component [컴포넌트명] [타입] [설명]
```

예시:
- `/component UserCard ui 사용자 정보를 표시하는 카드`
- `/component DashboardLayout layout 대시보드 전용 레이아웃`
- `/component HeroSection sections 랜딩페이지 히어로 섹션`

## 타입별 위치

| 타입 | 위치 | 용도 |
|------|------|------|
| `ui` | `src/components/ui/` | 기본 UI 요소 (shadcn 확장) |
| `layout` | `src/components/layout/` | 페이지 구조 컴포넌트 |
| `sections` | `src/components/sections/` | 특정 페이지 섹션 |

## 생성 프로세스

1. **기존 패턴 분석**
   - 동일 타입의 기존 파일 구조 확인
   - 사용 중인 import 패턴 파악

2. **컴포넌트 생성 규칙**
   - `"use client"` 지시문: 상태/이벤트 핸들러 있을 때만
   - Props 인터페이스 필수 정의 (any 타입 금지)
   - `className?: string` prop 항상 포함
   - `cn()` 유틸리티로 클래스 병합
   - 한국어 주석 필수
   - Tailwind CSS만 사용 (인라인 스타일 금지)
   - 반응형 클래스 필수 (sm:/md:/lg: prefix)

3. **코드 템플릿 패턴**
   ```typescript
   // [컴포넌트 설명] 컴포넌트
   import { cn } from "@/lib/utils";
   
   interface [Name]Props {
     className?: string;
     // 추가 props
   }
   
   export function [Name]({ className, ...props }: [Name]Props) {
     return (
       <div className={cn("기본-클래스", className)}>
         {/* 내용 */}
       </div>
     );
   }
   ```

4. **후처리**
   - 생성 후 파일 경로 출력
   - 필요한 import 안내
   - shadcn/ui 컴포넌트 추가 필요 시 `npx shadcn add [name]` 명령어 안내

## 규칙

- TypeScript strict 모드 준수
- `any` 타입 절대 금지
- 모든 주석 한국어
- Server Component 기본, 필요시만 Client Component
- 유닛 테스트는 선택사항

## 참고

- 기존 컴포넌트 패턴: `src/components/sections/ShowcaseForms.tsx`, `src/components/layout/Header.tsx`
- 유틸리티 함수: `cn()` 사용 (src/lib/utils.ts)
