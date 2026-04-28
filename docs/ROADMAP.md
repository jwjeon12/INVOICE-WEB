# ROADMAP.md

> **작성일**: 2026-04-28
> **기준 PRD**: docs/PRD.md (MVP 명세 확정 버전)
> **현재 상태**: Phase 1 완료, Phase 2 진행 중

---

## 프로젝트 개요

### 목표

Notion에 입력된 견적서 데이터를 클라이언트가 웹으로 확인하고 PDF로 다운로드할 수 있는 공개 플랫폼을 구축한다. 프리랜서/소상공인이 Notion을 CMS로 활용하면서 별도 관리 도구 없이 견적서를 고객과 공유할 수 있도록 한다.

### 핵심 요구사항 요약

| ID | 기능 | 상태 |
|----|------|------|
| F001 | Notion 데이터 연동 (`@notionhq/client` 기반 실시간 조회) | 초기 구현 완료 |
| F002 | 공개 견적서 조회 (토큰 기반, 인증 불필요) | 초기 구현 완료 |
| F003 | PDF 생성 및 다운로드 (`@react-pdf/renderer` 동적 임포트) | 초기 구현 완료 |
| F004 | 유효성 검사 (만료/존재하지 않는 링크 처리) | 초기 구현 완료 |

### 성공 기준

- 고객이 공유 URL을 열었을 때 3초 이내에 견적서 내용이 로딩된다
- PDF 다운로드가 5초 이내에 완료된다
- 유효하지 않은 토큰 접근 시 명확한 안내 메시지가 표시된다
- 모바일/태블릿/데스크톱 모든 화면에서 정상적으로 표시된다
- Vercel 배포 후 프로덕션 환경에서 전체 플로우가 동작한다

---

## 개발 워크플로우

1. **작업 계획**: 현재 코드베이스 상태 파악 → `ROADMAP.md` 업데이트 → 우선순위 Task 확인
2. **작업 생성**: `/tasks` 디렉토리에 `XXX-description.md` 형식으로 Task 파일 생성
   (API/비즈니스 로직 Task는 "## 테스트 체크리스트" 섹션 필수)
3. **작업 구현**: Task 파일 명세 따라 구현 → 각 단계 완료 후 진행 상황 업데이트 →
   API 연동 시 Playwright MCP E2E 테스트 실행
4. **로드맵 업데이트**: 완료 Task에 ✅ 표시 → Phase 완료 시 Phase 제목에 ✅ 추가

---

## Phase 1: 애플리케이션 골격 구축 ✅

**목표**: 프로젝트의 기반 구조(라우팅, 타입 시스템, 상수, 환경 설정)를 확립하여 이후 모든 개발이 의존할 수 있는 안정적인 스캐폴딩을 완성한다.

**기간**: 1~2일 (완료)

**상태**: **완료**

**이 순서인 이유**: 타입 시스템, 라우팅, 환경 설정은 이후 모든 Task가 공통으로 의존하는 기반이다.
이 Phase 없이는 UI를 만들어도 타입 불일치로 인한 재작업이 발생하고, API 연동을 먼저 시작해도
데이터 형식이 확정되지 않아 반복 수정이 생긴다. 골격을 먼저 완성해야 Phase 2(UI)와 Phase 3(API)가
독립적으로 병렬 진행 가능하다.

### Task 101: 프로젝트 초기화 및 환경 설정 ✅ - 완료

See: /tasks/101-project-init.md

**목표**: Next.js 15 기반 프로젝트 구조와 필수 의존성을 설치하고 개발 환경을 구성한다.

**구현 사항**:
- [x] Next.js 15 App Router 프로젝트 초기화 (`create-next-app`)
- [x] 필수 패키지 설치: `@notionhq/client`, `@react-pdf/renderer`, `zod`, `sonner`, `lucide-react`
- [x] shadcn/ui 초기화 및 컴포넌트 설치 (`button`, `card`, `badge`, `separator`)
- [x] `next.config.ts` 설정 (서버 사이드 전용 패키지 번들링 제외)
- [x] `.env.local` 환경변수 템플릿 작성 (`NOTION_API_KEY`, `NOTION_DATABASE_ID`)
- [x] `tsconfig.json` 경로 alias `@/` 설정 확인

**완료 기준**: `npm run dev`로 개발 서버가 정상 실행되고 TypeScript 오류가 없어야 한다.

---

### Task 102: 타입 시스템 및 상수 정의 ✅ - 완료

See: /tasks/102-type-system.md

**목표**: Notion 데이터 모델을 TypeScript 타입과 Zod 스키마로 정의하고 전역 상수를 집중 관리한다.

**구현 사항**:
- [x] `src/lib/constants.ts`: 전역 상수 정의 (`QUOTE_STATUS`, `QUOTE_TOKEN_LENGTH`, `CURRENCY_LOCALE`, `PDF_FILENAME_PREFIX` 등)
- [x] `src/lib/validations.ts`: Zod 스키마 작성 (`quoteTokenSchema`, `quoteItemSchema`, `quoteSchema`)
- [x] `Quote`, `QuoteItem`, `QuoteToken` 타입 추론 및 export
- [x] 견적서 상태 enum (`draft | sent | accepted | rejected`) 타입 정의

**완료 기준**: 모든 타입이 `any` 없이 정의되고, Zod 파싱이 잘못된 데이터에서 에러를 올바르게 반환한다.

---

### Task 103: 라우팅 구조 및 레이아웃 설정 ✅ - 완료

See: /tasks/103-routing-layout.md

**목표**: App Router 기반 페이지 라우팅과 공통 레이아웃(Header, Footer, ThemeProvider)을 구성한다.

**구현 사항**:
- [x] `src/app/layout.tsx`: 루트 레이아웃 (ThemeProvider, Toaster 포함)
- [x] `src/app/page.tsx`: 홈 페이지 (견적서 조회 안내 메시지)
- [x] `src/app/not-found.tsx`: 전역 404 페이지
- [x] `src/app/quote/[token]/page.tsx`: 동적 라우트 (서버 컴포넌트)
- [x] `src/components/layout/Header.tsx`, `Footer.tsx`, `PageLayout.tsx` 구성
- [x] `src/components/theme/ThemeProvider.tsx`, `ThemeToggle.tsx` 설정

**완료 기준**: `/quote/[임의토큰]` URL로 접근 시 페이지가 렌더링되고, 존재하지 않는 경로는 404 페이지로 이동한다.

---

## Phase 2: UI/UX 완성

**목표**: 더미 데이터를 기반으로 견적서 조회 페이지와 PDF 문서의 UI를 완성한다. Notion API 연동과 독립적으로 UI 개발을 진행하여 병렬 개발을 가능하게 한다.

**기간**: 2~3일

**상태**: **진행 중** (컴포넌트 초기 구현 완료, 고도화 필요)

**이 순서인 이유**: API 응답 형식 확정 전에 UI를 더미 데이터로 완성하면, API 연동 시
데이터 바인딩만 교체하면 된다. PDF 레이아웃(Task 202)은 웹 UI(Task 201)와 동일한 정보 구조를
재현해야 하므로 Task 201 다음에 배치한다. 공통 컴포넌트(Task 200)를 먼저 정의해야
Task 201~204에서 중복 구현을 방지할 수 있다.

### Task 200: 공통 컴포넌트 기반 구축 - 우선순위

**목표**: Task 201~204에서 공통으로 사용하는 Skeleton, Empty State, 더미 데이터를 사전 정의하여 중복 구현 방지

**예상 소요 시간**: 2~3시간

**구현 사항**:
- [ ] `src/lib/dummy-data.ts`: 개발용 더미 Quote 데이터 (Task 201~204 공통 사용)
- [ ] `src/components/quote/QuoteViewSkeleton.tsx`: 견적서 조회 전용 Skeleton 컴포넌트
- [ ] `src/components/common/EmptyState.tsx`: 항목 없음 상태 공통 컴포넌트

**완료 기준**: `QuoteViewSkeleton`이 `QuoteView`와 동일한 레이아웃 영역을 점유하고,
더미 데이터로 모든 필드가 정상 표시된다.

---

### Task 201: 견적서 조회 뷰 컴포넌트 완성 - 우선순위

**목표**: `QuoteView.tsx`를 완성하여 견적서 모든 필드를 명확하고 아름답게 표시한다.

**구현 사항**:
- [x] `src/components/quote/QuoteView.tsx` 기본 구현 (헤더, 발행사/수신처, 항목 테이블, 합계, 비고)
- [ ] 반응형 레이아웃 검증 (모바일 375px ~ 데스크톱 1440px 기준)
- [ ] 만료일 표시: 유효기간이 지난 경우 `만료됨` 배지 강조 표시
- [ ] 견적서 상태별 배지 색상 일관성 검토 (`draft: 회색`, `sent: 파란색`, `accepted: 초록색`, `rejected: 빨간색`)
- [ ] 항목이 0개일 때 빈 상태(Empty State) 처리
- [ ] 로딩 중 Skeleton UI 구현 (`src/components/quote/QuoteViewSkeleton.tsx`)

**기술 스택**: React 19, Tailwind CSS v4, shadcn/ui (Card, Badge, Separator)

**예상 소요 시간**: 4~6시간

**완료 기준**: 더미 데이터로 모든 필드가 정상 표시되고, 모바일/데스크톱에서 레이아웃이 깨지지 않는다.

---

### Task 202: PDF 문서 컴포넌트 완성

**목표**: `QuotePdfDocument.tsx`가 웹 UI와 동일한 정보를 A4 형식의 PDF로 출력하도록 완성한다.

**구현 사항**:
- [x] `src/components/quote/QuotePdfDocument.tsx` 기본 구현 (제목, 발행사/수신처, 항목 테이블, 합계, 비고)
- [ ] **한글 폰트 등록**: `@react-pdf/renderer`의 `Font.register()`로 Noto Sans KR 웹폰트 등록 (한글 깨짐 방지)
  ```typescript
  // 구현 예시
  Font.register({
    family: "NotoSansKR",
    src: "https://fonts.gstatic.com/...",
  });
  ```
- [ ] 페이지 하단 푸터: 발행 시스템명, 페이지 번호 추가
- [ ] PDF 문서 메타데이터 완성 (title, author, subject, keywords)
- [ ] 항목이 많아 페이지가 넘어갈 때 레이아웃 처리 검증

**기술 스택**: `@react-pdf/renderer` v4, React 19

**예상 소요 시간**: 3~5시간 (한글 폰트 이슈 대응 포함)

**완료 기준**: 한글 텍스트가 깨지지 않고, A4 규격으로 인쇄 가능한 PDF가 생성된다.

**위험 요소**: `@react-pdf/renderer`의 한글 폰트 지원은 웹폰트 URL을 직접 지정해야 하므로 CORS 정책과 폰트 로딩 시간을 고려해야 한다. 완화 전략: 폰트 파일을 `public/fonts/`에 직접 포함하여 외부 의존성 제거.

---

### Task 203: PDF 다운로드 버튼 UX 개선

**목표**: PDF 생성 중 사용자 피드백을 명확히 하고 오류 케이스를 친절하게 처리한다.

**구현 사항**:
- [x] `src/components/quote/QuoteDownloadButton.tsx` 기본 구현
- [ ] 로딩 스피너 + "PDF 생성 중..." 텍스트 표시
- [ ] 성공 Toast 메시지 (`sonner`)
- [ ] 실패 시 구체적인 오류 메시지 Toast ("PDF 생성에 실패했습니다. 잠시 후 다시 시도해주세요.")
- [ ] 버튼 비활성화 상태 스타일 일관성 확인

**기술 스택**: React 19 (`useState`), Lucide React (`Download`, `Loader2`), Sonner

**예상 소요 시간**: 1~2시간

**완료 기준**: PDF 생성 시작부터 완료까지 사용자가 진행 상황을 명확히 인지할 수 있다.

---

### Task 204: 오류 페이지 UI 구성

**목표**: 유효하지 않은 토큰으로 접근했을 때 표시되는 404/오류 페이지를 친절하게 구성한다.

**구현 사항**:
- [x] `src/app/not-found.tsx` 기본 구현
- [ ] 오류 메시지 구체화: "요청하신 견적서를 찾을 수 없습니다", "링크가 만료되었거나 올바르지 않습니다"
- [ ] 발급자에게 다시 요청 안내 문구
- [ ] 홈으로 돌아가기 버튼 (`/` 경로)
- [ ] 아이콘 추가 (Lucide `FileX` 또는 `AlertCircle`)
- [ ] 반응형 레이아웃

**기술 스택**: Next.js App Router (`not-found.tsx`), Tailwind CSS, Lucide React

**예상 소요 시간**: 1~2시간

**완료 기준**: 404 페이지가 명확한 안내와 함께 표시되고 "홈으로" 버튼이 동작한다.

---

## Phase 3: 핵심 기능 구현 및 검증 (4~6일)

**목표**: Notion API 실제 연동을 완성하고, 전체 사용자 플로우를 E2E로 검증한다.

**기간**: 4~6일

**상태**: 미시작 (기반 구현만 존재)

**이 순서인 이유**: Phase 2에서 UI가 더미 데이터로 검증된 후 실제 API를 연동한다.
Notion API 연동(Task 301)이 기반이 되어야 공개 조회 플로우(Task 302)와 PDF 생성(Task 303)에
실제 데이터가 흐를 수 있다. 오류 처리(Task 304)는 실제 API 오류 케이스를 경험한 후
처리하는 것이 가장 효율적이어서 마지막에 배치한다.

### Task 301: Notion API 연동 완성 및 검증 (F001) - 우선순위

**목표**: `getQuoteByToken()` 함수가 실제 Notion 데이터베이스에서 올바르게 데이터를 조회하도록 완성하고 검증한다.

**예상 소요 시간**: 4~6시간

**구현 사항**:
- [x] `src/lib/notion.ts`: Notion 클라이언트 싱글톤 초기화
- [x] `src/lib/quote.ts`: `getQuoteByToken()` 기본 구현 (search API 기반)
- [ ] **Notion 데이터베이스 스키마 확정**: 실제 DB의 프로퍼티명과 `mapNotionPageToQuote()` 매핑 검증
  - `token` (rich_text), `title` (title), `clientName` (rich_text), `issuerName` (rich_text)
  - `issuedAt` (date), `validUntil` (date), `status` (select), `items` (rich_text/JSON), `totalAmount` (number), `notes` (rich_text)
- [ ] `items` 필드 파싱 전략 결정 및 구현 (현재 JSON 문자열 방식, Notion Relation 방식 비교 후 선택)
- [ ] **만료일 검증 로직 추가**: `validUntil`이 오늘 이전이면 만료 처리
  ```typescript
  // quote.ts에 추가
  export function isQuoteExpired(quote: Quote): boolean {
    if (!quote.validUntil) return false;
    return new Date(quote.validUntil) < new Date();
  }
  ```
- [ ] Notion API 오류 핸들링 강화 (Rate Limit 429 대응, 타임아웃 처리)
- [ ] 환경변수 미설정 시 명확한 개발자 에러 메시지

**Playwright MCP 테스트 체크리스트**:
- [ ] 유효한 토큰으로 `/quote/[valid-token]` 접근 시 견적서 데이터가 표시된다
- [ ] 존재하지 않는 토큰으로 접근 시 404 페이지로 이동한다
- [ ] 만료된 견적서 토큰 접근 시 만료 안내가 표시된다
- [ ] Notion API 키가 잘못된 경우 서버 에러 없이 오류 페이지가 표시된다
- [ ] 토큰 형식이 잘못된 경우 (특수문자 포함 등) 404 처리된다

**기술 스택**: `@notionhq/client` v3, Zod, Next.js Server Component

**성공 메트릭**: 유효한 토큰으로 Notion 데이터를 3초 이내에 로드

**위험 요소**: Notion search API는 전체 workspace를 검색하므로 DB ID 필터링이 필요하다. `databases.query()`로 교체 검토.

---

### Task 302: 공개 견적서 조회 플로우 완성 (F002)

**목표**: 토큰 기반 공개 접근 전체 플로우를 완성하고 엣지 케이스를 처리한다.

**예상 소요 시간**: 3~4시간

**구현 사항**:
- [x] `src/app/quote/[token]/page.tsx` 기본 구현 (서버 컴포넌트, `generateMetadata`)
- [ ] **더미 데이터 → Notion API 교체**: `page.tsx`에서 더미 Quote 객체를 제거하고
      `getQuoteByToken(token)` 호출로 교체
- [ ] `QuoteView.tsx`가 실제 Notion 데이터를 props로 수신하는지 확인
- [ ] `quoteTokenSchema` 검증 통과 조건 재검토: 현재 `QUOTE_TOKEN_LENGTH=32` 고정, Notion 페이지 ID 형식(`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` 36자)과 불일치 확인 후 수정
- [ ] 만료된 견적서 접근 시 동작 방식 결정: 만료 안내 페이지 vs. 견적서 표시 + 만료 배지
- [ ] `Suspense` + Streaming을 활용한 서버 컴포넌트 로딩 최적화
- [ ] 동적 메타데이터 완성 (SEO 최적화, OG 태그)

**Playwright MCP 테스트 체크리스트**:
- [ ] `/quote/[valid-token]` 접근 시 견적서 제목이 `<title>` 태그에 포함된다
- [ ] 견적서 로딩 중 Skeleton UI가 표시된다
- [ ] 모바일(375px) 환경에서 견적서 항목 테이블이 가로 스크롤 가능하다
- [ ] 만료된 견적서 접근 시 적절한 안내가 표시된다

**기술 스택**: Next.js 15 App Router, React 19 Suspense

**성공 메트릭**: Core Web Vitals LCP < 2.5초

---

### Task 303: PDF 생성 기능 완성 (F003)

**목표**: 클라이언트 사이드 PDF 생성이 안정적으로 동작하도록 완성하고 성능을 검증한다.

**예상 소요 시간**: 2~3시간

**구현 사항**:
- [x] `QuoteDownloadButton.tsx` 동적 임포트 기반 PDF 생성 기본 구현
- [x] `QuotePdfDocument.tsx` PDF 레이아웃 기본 구현
- [ ] **더미 데이터 → 실제 데이터**: `QuotePdfDocument.tsx`가 실제 Notion Quote 데이터를
      받아 PDF를 생성하는지 확인
- [ ] 한글 폰트 등록 및 렌더링 검증 (Task 202 완료 전제)
- [ ] PDF 파일명 형식 확정: `quote-{token}-{YYYYMMDD}.pdf`
- [ ] Blob URL 생성/해제 메모리 관리 검증
- [ ] PDF 생성 소요 시간 측정 및 5초 이내 목표 달성 확인
- [ ] 대용량 항목(30개 이상)에서 PDF 생성 성능 검증

**Playwright MCP 테스트 체크리스트**:
- [ ] "PDF 다운로드" 버튼 클릭 시 파일 다운로드가 시작된다
- [ ] 다운로드된 파일명이 `quote-{token}.pdf` 형식이다
- [ ] 생성된 PDF에 한글이 정상적으로 표시된다
- [ ] PDF 생성 중 버튼이 비활성화되고 로딩 상태가 표시된다
- [ ] PDF 생성 완료 후 성공 Toast 메시지가 표시된다
- [ ] PDF 생성 실패 시 오류 Toast 메시지가 표시된다

**기술 스택**: `@react-pdf/renderer` v4, React 19 동적 임포트

**성공 메트릭**: PDF 다운로드 버튼 클릭부터 파일 저장까지 5초 이내

---

### Task 304: 유효성 검사 및 오류 처리 완성 (F004)

**목표**: 모든 오류 케이스에서 사용자가 명확한 안내를 받을 수 있도록 오류 처리를 완성한다.

**예상 소요 시간**: 2~3시간

**구현 사항**:
- [ ] 전역 `error.tsx` 컴포넌트 생성 (`src/app/error.tsx`): 서버 컴포넌트 오류 처리
- [ ] 견적서 조회 페이지 `error.tsx` 생성 (`src/app/quote/[token]/error.tsx`): Notion API 오류 등
- [ ] 오류 유형별 메시지 분기:
  - 토큰 형식 오류 → 404
  - 견적서 없음 → 404
  - 견적서 만료 → 만료 안내 페이지
  - Notion API 오류 → 서버 오류 안내
- [ ] `not-found.tsx` UI 개선 (Task 204 완료 전제)
- [ ] 오류 페이지에서 "홈으로 돌아가기" 버튼 동작 확인

**Playwright MCP 테스트 체크리스트**:
- [ ] 잘못된 토큰으로 접근 시 not-found 페이지가 표시된다
- [ ] 오류 페이지의 "홈으로 돌아가기" 버튼이 `/` 경로로 이동한다
- [ ] 서버 오류 발생 시 전역 error.tsx가 표시된다
- [ ] 오류 페이지에 발급자 연락 안내 문구가 포함된다

**기술 스택**: Next.js App Router (`error.tsx`, `not-found.tsx`)

**성공 메트릭**: 모든 오류 케이스에서 빈 화면 또는 기술적 오류 메시지가 노출되지 않는다.

---

### Task 305: 전체 사용자 플로우 통합 테스트

**목표**: Task 301~304 개별 기능들이 실제 사용자 시나리오에서 E2E로 정상 동작하는지 통합 검증

**예상 소요 시간**: 3~4시간

**이 Task가 마지막인 이유**: 개별 기능이 완성된 후 통합 테스트를 실행해야 의미 있는 검증 가능.
기능 구현 중 통합 테스트 실행은 불필요한 실패로 노이즈 발생.

**Playwright MCP 통합 테스트 시나리오**:
- [ ] 정상 플로우: 유효한 토큰 → Skeleton 표시 → 견적서 데이터 표시 → PDF 다운로드 파일 저장 확인
- [ ] 만료 토큰 플로우: 만료된 토큰 접근 → 만료 안내 표시
- [ ] 잘못된 토큰 플로우: 존재하지 않는 토큰 → 404 페이지 → "홈으로" 버튼 동작
- [ ] API 장애 플로우: Notion API 오류 시 error.tsx 표시
- [ ] 모바일 플로우: 375px 뷰포트에서 정상 플로우 전체 재현

**더미→실제 API 교체 최종 확인**:
- [ ] 프로덕션 코드에 더미 데이터 import가 남아있지 않은지 확인

**완료 기준**: 모든 Playwright 시나리오 통과 + 더미 데이터 참조 완전 제거

---

## Phase 4: 고급 기능 및 최적화

**목표**: 성능 최적화, 안정성 강화, Vercel 프로덕션 배포를 완료한다.

**기간**: 2~3일

**상태**: 미시작

**이 순서인 이유**: 성능 최적화(Task 401)는 기능이 정확히 동작함을 확인한 후 진행한다.
동작하지 않는 코드를 최적화하는 것은 의미가 없다. 배포(Task 402)는 로컬 전체 기능 검증 후
마지막에 진행해야 프로덕션 디버깅 비용을 최소화한다.

### Task 401: Notion API 성능 최적화

**목표**: Notion API 응답 속도를 개선하고 불필요한 호출을 줄인다.

**구현 사항**:
- [ ] `databases.query()` API로 전환: `search()` API 대신 특정 DB에서 `filter` 조건으로 직접 조회
  ```typescript
  // 현재: notion.search({ filter: ... }) → 전체 workspace 검색
  // 개선: notion.databases.query({ database_id, filter: { property: "token", rich_text: { equals: token } } })
  ```
- [ ] Next.js `unstable_cache` 또는 `revalidate` 태그 기반 ISR 적용 (견적서 데이터 캐싱)
- [ ] Notion API Rate Limit(3 req/s) 대응: 요청 실패 시 재시도 로직 (최대 2회)
- [ ] 불필요한 Notion 프로퍼티 조회 최소화

**예상 소요 시간**: 3~4시간

**성공 메트릭**: 동일 토큰의 반복 요청에서 응답 시간 50% 단축

**위험 요소**: `unstable_cache`는 실험적 API이므로 Next.js 버전 업데이트 시 변경될 수 있다. 완화 전략: React 19의 `cache()` 함수를 우선 검토.

---

### Task 402: 프로덕션 빌드 검증 및 Vercel 배포

**목표**: 프로덕션 빌드가 오류 없이 완료되고 Vercel에서 정상 동작하는지 확인한다.

**예상 소요 시간**: 2~4시간

**구현 사항**:
- [ ] `npm run build` 오류 없이 완료 확인
- [ ] `@react-pdf/renderer` 서버 사이드 번들링 이슈 해결 (`next.config.ts` 설정)
- [ ] Vercel 프로젝트 생성 및 환경변수 설정 (`NOTION_API_KEY`, `NOTION_DATABASE_ID`)
- [ ] 배포 후 프로덕션 URL로 전체 플로우 검증 (견적서 조회 → PDF 다운로드)
- [ ] Vercel Analytics 또는 Speed Insights 연동 (선택사항)

**Playwright MCP 테스트 체크리스트**:
- [ ] 프로덕션 URL에서 유효한 토큰으로 견적서가 표시된다
- [ ] 프로덕션 환경에서 PDF 다운로드가 정상 동작한다
- [ ] Vercel Edge Network에서 HTTPS로 제공된다

**성공 메트릭**: 프로덕션 빌드 성공, Vercel 배포 후 전체 플로우 동작 확인

---

### Task 403: 접근성 및 반응형 최종 검증

**목표**: WCAG 2.1 기본 접근성 요구사항을 충족하고 모든 디바이스에서 정상 동작을 확인한다.

**예상 소요 시간**: 2~3시간

**구현 사항**:
- [ ] 키보드 네비게이션 확인 (Tab 포커스, Enter로 버튼 실행)
- [ ] 색상 대비비 확인 (텍스트 vs 배경 4.5:1 이상)
- [ ] `alt` 텍스트, `aria-label` 적용 확인
- [ ] 모바일 375px, 태블릿 768px, 데스크톱 1280px 스크린샷 검토
- [ ] Light/Dark 모드 전환 시 견적서 뷰 정상 표시 확인

**Playwright MCP 테스트 체크리스트**:
- [ ] 375px(모바일) 뷰포트에서 견적서 항목 테이블이 가로 스크롤로 표시된다
- [ ] 768px(태블릿) 뷰포트에서 발행사/수신처 카드가 2열로 표시된다
- [ ] Dark 모드에서 모든 텍스트가 배경과 충분한 대비를 가진다

**기술 스택**: Playwright MCP, Tailwind CSS v4 반응형 유틸리티

---

## 기술 의존성 및 제약사항

### 외부 의존성

| 의존성 | 용도 | 위험도 | 완화 전략 |
|--------|------|--------|-----------|
| Notion API | 견적서 데이터 소스 | 높음 | API 오류 시 명확한 오류 메시지 표시, Rate Limit 대응 재시도 로직 |
| `@react-pdf/renderer` | PDF 생성 | 중간 | 동적 임포트로 초기 번들 최적화, 한글 폰트 `public/` 디렉토리에 포함 |
| Vercel | 배포 플랫폼 | 낮음 | `next.config.ts`에 서버 사이드 패키지 외부화 설정 |

### 기술 제약사항

- **Notion API Rate Limit**: 3 req/s 제한 → 캐싱 전략 필수
- **`@react-pdf/renderer`**: 서버 컴포넌트에서 직접 사용 불가 → 클라이언트 사이드 동적 임포트 필수
- **한글 폰트**: `@react-pdf/renderer`의 기본 폰트(Helvetica)는 한글 미지원 → 별도 폰트 등록 필수
- **Notion `search()` API**: 전체 workspace 검색으로 성능 저하 우려 → `databases.query()` 전환 권장
- **`quoteTokenSchema`의 토큰 길이**: 현재 32자 고정인데 Notion 페이지 ID는 36자(하이픈 포함) 또는 32자(하이픈 제거) → 실제 토큰 형식에 맞게 수정 필요

---

## 리소스 배분

| 역할 | 담당 작업 |
|------|-----------|
| 풀스택 개발자 (1인) | 전체 Phase 순차 진행 |

> 1인 개발 기준: Phase 2의 UI 작업(Task 201~204)과 Phase 3의 Notion 연동(Task 301~302)은 UI가 더미 데이터 기반으로 독립 개발 가능하므로, UI 완성 → API 연동 순서로 진행한다.

---

## 성공 메트릭 및 KPI

| 항목 | 목표값 | 측정 방법 |
|------|--------|-----------|
| 견적서 로딩 시간 | < 3초 | Chrome DevTools Network 탭 |
| PDF 생성 시간 | < 5초 | `console.time()` + 사용자 체감 |
| Core Web Vitals LCP | < 2.5초 | Vercel Speed Insights |
| 빌드 오류 | 0건 | `npm run build` 결과 |
| TypeScript 오류 | 0건 | `npx tsc --noEmit` 결과 |
| ESLint 경고 | 0건 | `npm run lint` 결과 |

---

## 위험 관리

### 위험 1: Notion `items` 필드 파싱 실패

**상황**: 현재 구현은 `items` 필드를 JSON 문자열로 파싱하는데, 실제 Notion DB 구조가 다를 경우 빈 배열이 반환된다.

**완화**: Notion DB 스키마를 확정하기 전에 실제 데이터로 `mapNotionPageToQuote()` 출력을 검증한다. 필요 시 `items`를 Notion Relation으로 구현하는 방안을 검토한다.

### 위험 2: `@react-pdf/renderer` 한글 깨짐

**상황**: 기본 Helvetica 폰트는 한글을 지원하지 않아 PDF에서 한글이 빈 박스로 표시될 수 있다.

**완화**: Task 202에서 Noto Sans KR 폰트를 `public/fonts/`에 포함하고 `Font.register()`로 등록한다. 폰트 파일 크기(약 4~8MB)가 초기 PDF 생성 시간에 영향을 주므로 서브셋 폰트 사용을 검토한다.

### 위험 3: Notion API 토큰/DB ID 환경변수 미설정

**상황**: 개발/프로덕션 환경에서 환경변수가 누락되면 런타임 오류가 발생한다.

**완화**: `notion.ts`의 조기 실패(fail-fast) 패턴이 이미 구현되어 있다. 추가로 `npm run dev` 시작 시 환경변수 존재 여부를 체크하는 스크립트를 `package.json`에 추가하는 것을 검토한다.

---

## 부록: 단계별 상세 작업 목록

### Phase 2 남은 작업 (즉시 시작 가능)

```
[ ] Task 201-1: QuoteViewSkeleton.tsx 컴포넌트 작성
[ ] Task 201-2: 만료일 경과 시 배지 UI 추가 (QuoteView.tsx)
[ ] Task 202-1: public/fonts/NotoSansKR-Regular.ttf 추가
[ ] Task 202-2: Font.register() 호출로 한글 폰트 등록
[ ] Task 203-1: QuoteDownloadButton에 Loader2 아이콘 + 로딩 텍스트 개선
[ ] Task 204-1: not-found.tsx 오류 메시지 및 UI 개선
```

### Phase 3 시작 전 체크리스트

```
[ ] 실제 Notion 데이터베이스 생성 및 테스트 데이터 입력
[ ] .env.local에 NOTION_API_KEY, NOTION_DATABASE_ID 설정
[ ] Notion Integration 생성 및 DB에 권한 부여
[ ] 토큰 형식 확정 (32자 vs 36자 Notion 페이지 ID)
```

### 알려진 기술 부채

| 항목 | 설명 | 우선순위 |
|------|------|--------|
| `notion.search()` → `databases.query()` | 검색 범위 최소화로 성능 및 보안 개선 | 높음 |
| `quoteTokenSchema` 토큰 길이 | Notion 페이지 ID 실제 형식과 불일치 가능성 | 높음 |
| `items` JSON 파싱 방식 | Notion 실제 DB 구조에 따라 변경 필요 | 중간 |
| `@react-pdf/renderer` 타입 캐스팅 | `unknown` 경유 캐스팅 제거 및 공식 타입 활용 | 낮음 |
