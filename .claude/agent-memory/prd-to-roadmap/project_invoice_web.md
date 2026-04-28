---
name: invoice-web 프로젝트 상태
description: Notion 기반 견적서 조회/PDF 다운로드 MVP 프로젝트의 현재 구현 상태 및 주요 기술 결정
type: project
---

Phase 1(골격 구축) 완료 상태로 첫 대화 시작.
주요 파일: `src/lib/notion.ts`, `src/lib/quote.ts`, `src/lib/validations.ts`, `src/lib/constants.ts`,
`src/app/quote/[token]/page.tsx`, `src/components/quote/QuoteView.tsx`,
`src/components/quote/QuoteDownloadButton.tsx`, `src/components/quote/QuotePdfDocument.tsx`

**Why:** MVP 범위는 F001(Notion 연동), F002(공개 조회), F003(PDF 다운로드), F004(유효성 검사) 4가지이며 인증 불필요.

**How to apply:**
- 다음 우선 작업: 한글 폰트 등록(Task 202), notion.search→databases.query 전환(Task 401 우선 당김)
- 알려진 기술 부채: quoteTokenSchema 32자 고정이나 Notion 페이지 ID는 36자 가능성 있음
- items 필드를 JSON 문자열로 파싱하는 방식은 실제 Notion DB 구조 확정 후 변경 필요
- docs/PRD.md, docs/ROADMAP.md 존재
