---
description: 'Next.js App Router 컨벤션에 맞는 페이지를 생성합니다'
allowed-tools:
  [
    'Read',
    'Write',
    'Bash(ls:*)',
  ]
---

# Claude 명령어: 페이지 생성

Next.js 15 App Router 컨벤션에 따라 페이지와 관련 파일을 생성합니다.

## 사용법

```
/page [라우트경로] [설명]
```

예시:
- `/page /dashboard 대시보드 메인 페이지`
- `/page /blog/[slug] 블로그 상세 포스트 페이지`
- `/page /settings/profile 사용자 프로필 설정 페이지`

## 생성 프로세스

1. **라우트 분석**
   - 정적/동적/catch-all 라우트 판별
   - 기존 라우트와 충돌 확인

2. **생성 파일 목록**
   - `src/app/[경로]/page.tsx` (필수)
   - `src/app/[경로]/layout.tsx` (페이지별 레이아웃 필요 시)
   - `src/app/[경로]/loading.tsx` (로딩 상태 필요 시)
   - `src/app/[경로]/error.tsx` (에러 바운더리 필요 시)

3. **page.tsx 기본 구조**
   ```typescript
   // [페이지 설명] 페이지
   import { Metadata } from "next";
   import { PageLayout } from "@/components/layout/PageLayout";
   
   // SEO 메타데이터 정의
   export const metadata: Metadata = {
     title: "페이지 제목 | Next.js 스타터킷",
     description: "페이지 설명",
   };
   
   export default function [Name]Page() {
     return (
       <PageLayout>
         {/* 페이지 내용 */}
       </PageLayout>
     );
   }
   ```

4. **동적 라우트 처리**
   - `[slug]` → `params: { slug: string }`
   - `generateStaticParams()` 추가 여부 확인
   - 동적 메타데이터 `generateMetadata()` 패턴 적용

5. **네비게이션 업데이트 안내**
   - `src/lib/constants.ts`의 `NAV_LINKS` 추가 필요 여부 질문
   - 대시보드 하위면 `SIDEBAR_LINKS` 업데이트 안내

## 규칙

- Server Component 기본 (데이터 페칭 포함)
- 메타데이터 필수 정의
- `PageLayout` 사용으로 일관된 레이아웃 유지
- 한국어 주석 및 메타데이터
- 반응형 레이아웃 필수
- TypeScript strict 모드 준수

## 참고

- 라우트 구조: `src/app/` (예: about/, examples/, privacy/)
- 메타데이터 참고: Metadata 타입 (next.js 공식 문서)
- PageLayout 사용: `src/components/layout/PageLayout.tsx`
