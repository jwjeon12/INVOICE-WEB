---
name: invoice-web 프로젝트 현황
description: Notion 기반 견적서 조회 & PDF 다운로드 시스템의 초기화 결과 및 핵심 구조
type: project
---

이 프로젝트는 Next.js 스타터킷을 견적서 시스템 전용으로 초기화한 상태입니다.

**Why:** 스타터킷 데모 파일을 제거하고 Notion API 기반 견적서 조회 시스템 MVP로 구성했습니다.

**How to apply:** 신규 기능 추가 시 `src/components/quote/` 아래에 컴포넌트를 추가하고, Notion 데이터 매핑은 `src/lib/quote.ts`의 `mapNotionPageToQuote` 함수를 수정합니다.

## 핵심 구조

- `/quote/[token]` - 공개 견적서 조회 페이지 (서버 컴포넌트 + Notion API)
- `src/lib/notion.ts` - @notionhq/client v5 싱글톤 클라이언트
- `src/lib/quote.ts` - Notion search API로 token 필터링하여 견적서 조회
- `src/components/quote/QuoteView.tsx` - 서버 컴포넌트로 견적서 렌더링
- `src/components/quote/QuoteDownloadButton.tsx` - 클라이언트 컴포넌트, PDF 동적 임포트
- `src/components/quote/QuotePdfDocument.tsx` - @react-pdf/renderer 기반 PDF 문서

## 주요 기술적 결정사항

1. **@notionhq/client v5 사용**: v5에서는 `databases.query()`가 제거되어 `notion.search()` API를 사용함
2. **@react-pdf/renderer 서버 번들 제외**: `next.config.ts`에 `serverExternalPackages` 설정으로 Canvas 오류 방지
3. **PDF 동적 임포트**: 초기 번들 크기 최적화를 위해 `QuoteDownloadButton`에서 동적 임포트
4. **타입 캐스팅**: `pdf()` 함수는 DocumentProps를 요구하므로 `PdfRenderer` 타입으로 래핑

## 환경 변수 (필수)

- `NOTION_API_KEY` - Notion 인테그레이션 API 키
- `NOTION_DATABASE_ID` - 견적서 데이터베이스 ID

## 제거된 항목

- `src/app/about`, `privacy`, `terms`, `examples` 페이지
- `src/components/sections/` 전체 (ShowcaseHero, ShowcaseCards 등)
- `src/hooks/` 전체 (useMediaQuery, useLocalStorage)
- 13개 shadcn/ui 컴포넌트 (accordion, avatar, breadcrumb, checkbox, dropdown-menu 등)
- `usehooks-ts` 의존성
- `public/` SVG 데모 파일 5개
