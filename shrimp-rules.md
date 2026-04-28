# AI 에이전트 개발 규칙 (invoice-web)

> **작성일**: 2026-04-28  
> **프로젝트**: Notion 기반 견적서 웹 조회 & PDF 다운로드 시스템  
> **목적**: AI 에이전트가 프로젝트 특화 규칙을 즉시 이해하고 일관성 있게 구현하도록 안내

---

## 프로젝트 개요

**기술 스택**: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui

**핵심 기능**:
- Notion API 기반 실시간 견적서 조회 (공개 URL, 토큰 인증)
- PDF 생성 및 다운로드
- 반응형 디자인 (모바일~데스크톱)
- Dark 모드 지원

**개발 단계**: Phase 1 완료 (구조 설정) → **Phase 2 진행 중** (UI 개발) → Phase 3 (API 연동) → Phase 4 (배포)

---

## 파일 구조 및 역할

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # 루트 레이아웃 (ThemeProvider, Toaster)
│   ├── page.tsx                # 홈페이지
│   ├── not-found.tsx           # 404 페이지
│   ├── globals.css             # Tailwind 지시문
│   ├── quote/[token]/
│   │   └── page.tsx            # 견적서 조회 페이지 (동적 라우트, 서버 컴포넌트)
│   └── error.tsx               # 서버 오류 핸들러 (선택)
├── components/
│   ├── ui/                     # shadcn/ui 컴포넌트 (Button, Card, Badge 등)
│   ├── layout/                 # 페이지 레이아웃 (Header, Footer, PageLayout)
│   ├── quote/                  # 견적서 도메인 컴포넌트
│   │   ├── QuoteView.tsx       # 견적서 표시 (메인 UI)
│   │   ├── QuoteViewSkeleton.tsx # 로딩 Skeleton
│   │   ├── QuotePdfDocument.tsx  # PDF 렌더링 (@react-pdf/renderer)
│   │   └── QuoteDownloadButton.tsx # PDF 다운로드 버튼 (클라이언트)
│   └── theme/                  # 테마 제공자 및 토글
├── lib/
│   ├── utils.ts                # cn() 함수 (Tailwind 클래스 병합)
│   ├── constants.ts            # 전역 상수 (QUOTE_STATUS, SITE_NAME 등)
│   ├── validations.ts          # Zod 검증 스키마
│   ├── notion.ts               # Notion 클라이언트 싱글톤
│   ├── quote.ts                # 견적서 데이터 조회 함수
│   └── dummy-data.ts           # 개발용 더미 데이터 (프로덕션 제외)
└── hooks/                      # 커스텀 훅 (useMediaQuery, useLocalStorage)
```

---

## 코드 스타일 및 네이밍

| 항목 | 규칙 | 예시 |
|------|------|------|
| **컴포넌트 파일** | PascalCase, `.tsx` 확장자 | `QuoteView.tsx`, `Header.tsx` |
| **컴포넌트 함수** | PascalCase | `export function QuoteView() {}` |
| **Props 타입** | `ComponentName + "Props"` | `interface QuoteViewProps {}` |
| **유틸 함수** | camelCase, `.ts` 확장자 | `getQuoteByToken()`, `isQuoteExpired()` |
| **상수** | UPPER_SNAKE_CASE | `QUOTE_STATUS`, `SITE_NAME` |
| **변수/훅** | camelCase | `const [isLoading, setIsLoading]` |
| **들여쓰기** | 2칸 스페이스 | 모든 파일 |

---

## 타입 시스템

### 핵심 원칙

- ✅ **모든 타입은 TypeScript로 명시** (any 타입 절대 금지)
- ✅ **데이터 모델은 Zod 스키마로 정의** (src/lib/validations.ts)
- ✅ **타입은 `z.infer<typeof schema>`로 추론**
- ❌ 인터페이스 중복 정의 금지 (Zod 스키마가 유일한 출처)

### 예시

```typescript
// src/lib/validations.ts
import { z } from "zod";

export const quoteTokenSchema = z.string().length(32);
export const quoteItemSchema = z.object({
  name: z.string(),
  quantity: z.number().positive(),
  unitPrice: z.number().nonnegative(),
  amount: z.number().nonnegative(),
});

export const quoteSchema = z.object({
  token: quoteTokenSchema,
  title: z.string(),
  clientName: z.string(),
  items: z.array(quoteItemSchema),
  totalAmount: z.number().nonnegative(),
  validUntil: z.string().datetime().optional(),
  status: z.enum(["draft", "sent", "accepted", "rejected"]),
});

// 타입 추론
export type Quote = z.infer<typeof quoteSchema>;
export type QuoteItem = z.infer<typeof quoteItemSchema>;
```

### Props 타입 정의

```typescript
// src/components/quote/QuoteView.tsx
import { Quote } from "@/lib/validations";

interface QuoteViewProps {
  quote: Quote;
  isLoading?: boolean;
  className?: string;
}

export function QuoteView({ quote, isLoading = false, className }: QuoteViewProps) {
  // ...
}
```

---

## 컴포넌트 개발 규칙

### 1. 파일 크기 및 복잡도

- ✅ **한 파일 = 하나의 컴포넌트** (Index export 제외)
- ✅ **함수 길이 30줄 이하** (초과 시 유틸 함수로 분리)
- ✅ **Props 수 5개 이상 시 객체로 그룹화**

**예: 30줄 초과 시 분리**

```typescript
// ❌ 분리 전: QuoteViewHeader가 너무 길다
export function QuoteView({ quote }: Props) {
  return (
    <div>
      {/* Header 로직 20줄 */}
      {/* Items 로직 20줄 */}
      {/* Footer 로직 20줄 */}
    </div>
  );
}

// ✅ 분리 후
function QuoteViewHeader({ quote }: { quote: Quote }) {
  // Header 로직 (< 30줄)
}

function QuoteViewItems({ items }: { items: Quote["items"] }) {
  // Items 로직 (< 30줄)
}

export function QuoteView({ quote }: Props) {
  return (
    <div>
      <QuoteViewHeader quote={quote} />
      <QuoteViewItems items={quote.items} />
    </div>
  );
}
```

### 2. 서버 vs 클라이언트 컴포넌트

**기본값: 서버 컴포넌트** (성능, SSR 최적화)

| 조건 | 유형 |
|------|------|
| 상태 없음, Notion 데이터 표시만 | 서버 컴포넌트 |
| `useState`, `useRef`, `useCallback` 필요 | `'use client'` 클라이언트 컴포넌트 |
| 이벤트 핸들러 (`onClick`, `onChange`) | `'use client'` 클라이언트 컴포넌트 |
| `useRouter()`, `useSearchParams()` | `'use client'` 클라이언트 컴포넌트 |

**예시**

```typescript
// ✅ 서버 컴포넌트 (더미 데이터로 개발)
export function QuoteView({ quote }: Props) {
  return (
    <div className="space-y-4">
      <h1>{quote.title}</h1>
      <p>{quote.clientName}</p>
      {/* 상태 없이 데이터 표시만 */}
    </div>
  );
}

// ✅ 클라이언트 컴포넌트 (상태 + 이벤트)
'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export function QuoteDownloadButton({ quote }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      // PDF 생성 로직
      toast.success('PDF가 다운로드되었습니다');
    } catch {
      toast.error('PDF 생성 실패. 다시 시도해주세요');
    } finally {
      setIsLoading(false);
    }
  };

  return <button onClick={handleDownload}>{isLoading ? '...' : 'PDF 다운로드'}</button>;
}
```

### 3. Tailwind CSS + cn() 함수

**필수**: 모든 조건부 클래스는 `cn()` 함수로 병합

```typescript
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function Button({ variant = 'primary', className }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded font-medium',
        variant === 'primary' && 'bg-blue-500 text-white',
        variant === 'secondary' && 'bg-gray-200 text-gray-900',
        className, // 사용자 커스텀 클래스 (덮어쓰기 방지)
      )}
    >
      Button
    </button>
  );
}
```

### 4. 주석 규칙

- ✅ **비자명한 로직에만 주석** (이유 + 동작 설명)
- ✅ **한국어로 작성**
- ❌ 명백한 코드 설명 금지

```typescript
// ✅ Good - 왜 이렇게 했는지 설명
// validUntil이 현재 날짜보다 이전이면 만료됨 배지 표시
const isExpired = new Date(quote.validUntil) < new Date();

// ❌ Bad - 명백한 설명
const isExpired = quote.validUntil < new Date(); // validUntil이 현재 날짜보다 작으면 true
```

### 5. 접근성 및 반응형

**모든 새로운 컴포넌트 체크리스트**:

- [ ] 모바일 375px, 태블릿 768px, 데스크톱 1280px에서 테스트
- [ ] Dark 모드에서 배경색과 텍스트 대비 확인
- [ ] 키보드 포커스 (Tab) 테스트
- [ ] 이미지/아이콘에 `alt` 또는 `aria-label` 추가

**반응형 클래스 예시**

```typescript
export function QuoteItemsTable({ items }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm md:text-base">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2 md:p-4">상품명</th>
            <th className="text-right p-2 md:p-4 hidden sm:table-cell">수량</th>
            <th className="text-right p-2 md:p-4">금액</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.name} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
              <td className="p-2 md:p-4">{item.name}</td>
              <td className="text-right p-2 md:p-4 hidden sm:table-cell">{item.quantity}</td>
              <td className="text-right p-2 md:p-4">{item.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 핵심 모듈별 개발 규칙

### src/lib/constants.ts

**원칙**: 모든 상수를 한 곳에 집중 관리

```typescript
// ❌ 컴포넌트에 하드코딩
export function QuoteStatus({ status }: Props) {
  return status === 'draft' ? '초안' : '발송됨';
}

// ✅ 상수로 정의
export const QUOTE_STATUS = {
  draft: { label: '초안', color: 'bg-gray-500' },
  sent: { label: '발송됨', color: 'bg-blue-500' },
  accepted: { label: '수락', color: 'bg-green-500' },
  rejected: { label: '거절', color: 'bg-red-500' },
} as const;

// 컴포넌트에서 사용
export function QuoteStatus({ status }: Props) {
  const config = QUOTE_STATUS[status];
  return <span className={config.color}>{config.label}</span>;
}
```

**파일 수정 시 동시 업데이트**:
- `ROADMAP.md` "기술 제약사항" 섹션 (새로운 제약사항 추가 시)
- 해당 상수를 사용하는 모든 컴포넌트 검증

### src/lib/validations.ts

**원칙**: Zod 스키마가 타입의 유일한 출처

- 런타임 검증 + 타입 추론
- 에러 메시지는 사용자 친화적 한국어로

```typescript
export const quoteTokenSchema = z
  .string()
  .length(32)
  .regex(/^[a-f0-9]{32}$/, '유효하지 않은 토큰 형식입니다');

export const quoteSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다'),
  clientName: z.string().min(1, '고객명은 필수입니다'),
  items: z.array(quoteItemSchema).min(1, '최소 1개 이상의 항목이 필요합니다'),
});
```

**파일 수정 시 동시 업데이트**:
- `src/lib/quote.ts` (타입 import 확인)
- 해당 타입을 사용하는 모든 컴포넌트

### src/lib/notion.ts & src/lib/quote.ts

**원칙**: Notion API 호출은 이 함수들에만 집중

```typescript
// src/lib/notion.ts
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export { notion };

// src/lib/quote.ts
import { notion } from './notion';
import { quoteSchema } from './validations';

export async function getQuoteByToken(token: string): Promise<Quote | null> {
  try {
    // Notion API 호출
    // 응답을 quoteSchema로 검증
    // Quote 객체 반환
  } catch (error) {
    console.error('Notion API error:', error);
    return null; // 또는 throw
  }
}

export function isQuoteExpired(quote: Quote): boolean {
  if (!quote.validUntil) return false;
  return new Date(quote.validUntil) < new Date();
}
```

**파일 수정 시 동시 업데이트**:
- `ROADMAP.md` Task 301 "Playwright MCP 테스트 체크리스트"
- `.env.local.example` (새로운 환경변수 추가 시)

### src/app/quote/[token]/page.tsx

**원칙**: 서버 컴포넌트, API 호출은 최소한, 동적 메타데이터 포함

```typescript
import { notFound } from 'next/navigation';
import { getQuoteByToken } from '@/lib/quote';
import { quoteTokenSchema } from '@/lib/validations';

interface PageProps {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { token } = await params;
  const quote = await getQuoteByToken(token);
  return {
    title: quote?.title || '견적서',
    description: `${quote?.clientName}님의 견적서입니다`,
  };
}

export default async function Page({ params }: PageProps) {
  const { token } = await params;

  // 토큰 검증
  const validation = quoteTokenSchema.safeParse(token);
  if (!validation.success) {
    notFound();
  }

  // 데이터 조회
  const quote = await getQuoteByToken(token);
  if (!quote) {
    notFound();
  }

  return (
    <PageLayout>
      <QuoteView quote={quote} />
      <QuoteDownloadButton quote={quote} />
    </PageLayout>
  );
}
```

---

## 더미 데이터 관리

**용도**: Phase 2 (UI 개발) 중 Notion API 연동 전에 UI 검증

**규칙**:
- ✅ `src/lib/dummy-data.ts`에서만 정의
- ✅ 로컬 개발 시에만 import 허용
- ❌ 프로덕션 코드(`page.tsx`, 컴포넌트)에 하드코딩 금지

```typescript
// src/lib/dummy-data.ts
import { Quote } from '@/lib/validations';

export const DUMMY_QUOTE: Quote = {
  token: '12345678901234567890123456789012',
  title: '웹 개발 프로젝트 견적서',
  clientName: 'ABC 회사',
  items: [
    { name: '웹사이트 개발', quantity: 1, unitPrice: 1000000, amount: 1000000 },
    { name: '로고 디자인', quantity: 1, unitPrice: 500000, amount: 500000 },
  ],
  totalAmount: 1500000,
  validUntil: '2026-05-28',
  status: 'sent',
};

// 개발 중: Task 201-204에서 사용
// import { DUMMY_QUOTE } from '@/lib/dummy-data';
// const quote = DUMMY_QUOTE; // 또는 props로 전달

// Phase 3에서: getQuoteByToken(token)으로 교체
```

---

## Phase별 개발 체크리스트

### Phase 2 (UI/UX 개발 - 현재)

**Task 201-204 구현 시**:

- [ ] 더미 데이터로 UI 검증 (`src/lib/dummy-data.ts` 사용)
- [ ] 모든 컴포넌트가 TypeScript 오류 없음
- [ ] 모바일(375px) ~ 데스크톱(1440px)에서 반응형 확인
- [ ] Dark 모드에서 배경색/텍스트 대비 확인
- [ ] 만료일 검증: `validUntil < new Date()` → "만료됨" 배지
- [ ] Skeleton UI가 QuoteView와 동일한 높이 점유 (CLS 방지)
- [ ] PDF 한글 폰트 등록 (@react-pdf/renderer의 Font.register())
- [ ] 오류 메시지는 모두 사용자 친화적 한국어

### Phase 3 (Notion API 연동 - 향후)

**Task 301-304 구현 시**:

- [ ] getQuoteByToken()이 실제 Notion 데이터 반환 확인
- [ ] token 형식 검증: quoteTokenSchema로 먼저 검증
- [ ] 존재하지 않는 토큰 → notFound() 함수로 404 처리
- [ ] 만료된 견적서 → 페이지 표시 또는 에러 페이지 (ROADMAP 확인)
- [ ] Notion API 오류 → try-catch + 사용자 메시지
- [ ] 더미 데이터 import 완전 제거 (프로덕션 코드에 미포함)
- [ ] Playwright MCP E2E 테스트: 유효한 토큰 → 데이터 표시 → PDF 다운로드

---

## 오류 처리 및 사용자 피드백

### Toast 메시지 (Sonner)

```typescript
import { toast } from 'sonner';

// PDF 생성 중
toast('PDF 생성 중...');

// 성공
toast.success('PDF가 다운로드되었습니다');

// 오류
toast.error('PDF 생성에 실패했습니다. 잠시 후 다시 시도해주세요');

// 정보
toast.info('링크가 만료되었거나 올바르지 않습니다');
```

### 페이지 레벨 오류

```typescript
import { notFound } from 'next/navigation';

// 유효하지 않은 토큰
if (!validation.success) {
  notFound(); // → /not-found.tsx로 이동
}

// 존재하지 않는 견적서
const quote = await getQuoteByToken(token);
if (!quote) {
  notFound();
}

// API 오류 처리
try {
  // API 호출
} catch (error) {
  console.error(error);
  // error.tsx 컴포넌트로 처리되거나 사용자 친화적 메시지 표시
}
```

### 메시지 작성 규칙

- ✅ "요청하신 견적서를 찾을 수 없습니다"
- ✅ "링크가 만료되었거나 올바르지 않습니다"
- ✅ "발급자에게 다시 요청해주세요"
- ❌ "404 Not Found"
- ❌ "API error: Connection timeout"

---

## 금지 사항 (위반 시 재작업)

| 항목 | 내용 | 이유 |
|------|------|------|
| **any 타입** | 사용 금지 | 타입 안전성 위반 |
| **매직 넘버** | 상수로 정의 필수 | 유지보수성 저하 |
| **30줄 초과 함수** | 분리 필수 | 가독성 저하 |
| **더미 데이터 하드코딩** | src/lib/dummy-data.ts에서만 | 프로덕션 오염 |
| **주석 없는 복잡 로직** | 주석 필수 | 의도 파악 어려움 |
| **상수를 컴포넌트에** | 함수 호출 또는 import | 중복 관리 |
| **Notion API를 컴포넌트에서** | src/lib/quote.ts 함수 호출만 | 계층 분리 |
| **환경변수 평문 노출** | .env.local에서만 로드 | 보안 위험 |

---

## 필수 사항 (확인 후 진행)

| 항목 | 내용 | 확인 |
|------|------|------|
| **TypeScript** | 모든 타입 명시 (any 제외) | 실행 전 `npx tsc --noEmit` |
| **Zod 검증** | 모든 외부 데이터는 스키마로 검증 | 예: quoteTokenSchema.parse(token) |
| **React Hook Form** | 폼 구현 시 RHF + Zod 조합 | src/lib/validations.ts 참고 |
| **Tailwind + cn()** | 조건부 클래스는 cn() 함수 | 예: cn('base-class', condition && 'conditional') |
| **shadcn/ui** | UI 컴포넌트는 shadcn/ui 우선 | 없으면 Tailwind로 커스텀 |
| **서버 컴포넌트 우선** | Next.js 13+ 권장 | 필요한 경우만 'use client' |
| **한국어 커밋** | 모든 커밋 메시지는 한국어 | 형식: "기능: 설명" 또는 "수정: 버그명" |
| **한국어 주석** | 코딩 이유 + 동작 설명 | 비자명한 로직에만 |

---

## 파일 수정 시 다중 파일 조정

### 상수 추가 (src/lib/constants.ts)

**동시 확인 사항**:
1. 해당 상수를 사용하는 모든 파일에서 import 확인
2. ROADMAP.md "기술 제약사항" 업데이트 필요 여부
3. .env.local.example 환경변수 추가 필요 여부

**예**: `QUOTE_TOKEN_LENGTH = 36` (Notion UUID 형식) 변경 시
- `src/lib/validations.ts`의 `quoteTokenSchema` 수정
- ROADMAP.md의 "기술 제약사항" 섹션 업데이트
- Phase 3 Task 301 "테스트 체크리스트" 수정

### 타입 추가/수정 (src/lib/validations.ts)

**동시 확인 사항**:
1. 해당 타입을 사용하는 모든 컴포넌트 props 타입 검증
2. src/app/quote/[token]/page.tsx의 params 검증 로직
3. src/lib/quote.ts의 getQuoteByToken() 반환 타입

**예**: `Quote` 타입에 `issuerName` 필드 추가 시
- `quoteSchema`에 `issuerName: z.string()` 추가
- `QuoteView.tsx`에서 `quote.issuerName` 표시 로직 추가
- 더미 데이터 업데이트 (src/lib/dummy-data.ts)
- Notion API 응답 맵핑 확인 (src/lib/quote.ts)

### API 함수 추가/수정 (src/lib/quote.ts)

**동시 확인 사항**:
1. ROADMAP.md의 Task 301 "Playwright MCP 테스트 체크리스트" 수정
2. src/app/quote/[token]/page.tsx에서 함수 호출 확인
3. 새로운 환경변수 → .env.local.example 추가

**예**: `isQuoteExpired(quote)` 함수 추가 시
- ROADMAP.md Task 301에 "만료된 견적서 접근 테스트" 추가
- QuoteView에서 호출 확인 (만료 배지 표시)
- 단위 테스트 고려 (날짜 경계 케이스)

---

## 성능 목표

| 항목 | 목표값 | 측정 방법 |
|------|--------|-----------|
| 견적서 로딩 | < 3초 | Chrome DevTools Network |
| PDF 생성 | < 5초 | console.time() 또는 체감 |
| Core Web Vitals LCP | < 2.5초 | Vercel Speed Insights (Phase 4) |
| TypeScript 컴파일 | 0 오류 | `npx tsc --noEmit` |
| ESLint | 0 경고 | `npm run lint` |

---

## 의사결정 트리

새 기능/파일을 추가할 때 다음 순서로 결정:

```
1. 새로운 상수가 필요한가?
   → YES: src/lib/constants.ts에 추가

2. 새로운 타입/검증이 필요한가?
   → YES: src/lib/validations.ts에 Zod 스키마 추가

3. 데이터 조회/API 호출인가?
   → YES: src/lib/quote.ts 함수 추가

4. 재사용 가능한 UI 요소인가?
   → YES: shadcn/ui 우선, 없으면 src/components/ui/에 커스텀
   → NO: 특정 페이지/도메인용 컴포넌트

5. 레이아웃 관련인가?
   → YES: src/components/layout/에 추가

6. 견적서 도메인 로직인가?
   → YES: src/components/quote/에 추가

7. 클라이언트 상태 관리 필요한가?
   → YES: src/hooks/에 커스텀 훅 또는 Zustand 스토어
   → NO: 완료
```

---

## 커밋 메시지 형식

- ✅ "기능: QuoteView 컴포넌트 기본 구현"
- ✅ "수정: 만료일 배지 색상 수정"
- ✅ "리팩토: QuoteViewSkeleton 분리"
- ✅ "문서: ROADMAP Task 201 진행 상황 업데이트"
- ❌ "Fix bug"
- ❌ "Update"

---

## 자주 사용되는 명령어

```bash
# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# 타입 검사 (IDE 외부)
npx tsc --noEmit

# ESLint 확인
npm run lint

# 더미 데이터로 개발 중일 때 (로컬)
# import { DUMMY_QUOTE } from '@/lib/dummy-data';
```

---

**마지막 업데이트**: 2026-04-28  
**다음 리뷰**: Phase 2 완료 후 (예상: 2026-05-05)
