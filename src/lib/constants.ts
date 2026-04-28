// 앱 전체에서 사용하는 상수 정의 (매직 넘버 방지)

// 사이트 기본 정보
export const SITE_NAME = "견적서 조회 시스템";
export const SITE_DESCRIPTION = "Notion 기반 견적서 웹 조회 및 PDF 다운로드";

// 브레이크포인트 (Tailwind v4 기본값과 동일)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// 견적서 관련 상수
// Notion 데이터베이스 프로퍼티 키값 (환경 변수에서 설정)
export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID ?? "";
export const NOTION_API_KEY = process.env.NOTION_API_KEY ?? "";

// 견적서 상태값 정의
export const QUOTE_STATUS = {
  DRAFT: "draft",
  SENT: "sent",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
} as const;

export type QuoteStatus = (typeof QUOTE_STATUS)[keyof typeof QUOTE_STATUS];

// 견적서 토큰 길이 (URL 공개 키)
export const QUOTE_TOKEN_LENGTH = 32;

// PDF 파일명 접두사
export const PDF_FILENAME_PREFIX = "quote";

// 통화 형식 (한국 원화)
export const CURRENCY_LOCALE = "ko-KR";
export const CURRENCY_CODE = "KRW";
