---
name: @react-pdf/renderer 설정 패턴
description: Next.js에서 react-pdf 사용 시 서버 번들 제외 및 타입 캐스팅 필요
type: feedback
---

**Why:** @react-pdf/renderer는 브라우저 전용 패키지로, 서버 사이드 렌더링 시 Canvas 관련 오류 발생

**How to apply:**

1. `next.config.ts`에 반드시 추가:
   ```ts
   serverExternalPackages: ["@react-pdf/renderer"]
   ```

2. PDF 생성은 클라이언트 컴포넌트에서 동적 임포트 사용:
   ```ts
   const { pdf } = await import("@react-pdf/renderer");
   ```

3. `pdf()` 함수 타입 문제: DocumentProps와 커스텀 컴포넌트 props 불일치 → 래퍼 타입으로 캐스팅:
   ```ts
   type PdfRenderer = (element: unknown) => { toBlob: () => Promise<Blob> };
   const blob = await (pdf as PdfRenderer)(createElement(Component, props)).toBlob();
   ```

4. `@types/react-pdf`는 `pdfjs-dist` 취약점(GHSA-wgrm-67xf-hhpq) 포함 → 설치 불필요, `@react-pdf/renderer`는 자체 타입 내장
