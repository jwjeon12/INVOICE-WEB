// 견적서 시스템 Zod 스키마 정의
// 런타임 데이터 검증 및 TypeScript 타입 추론에 사용
import { z } from "zod";
import { QUOTE_STATUS, QUOTE_TOKEN_LENGTH } from "./constants";

// 견적서 토큰 스키마 (URL 경로 파라미터 검증)
export const quoteTokenSchema = z
  .string()
  .length(QUOTE_TOKEN_LENGTH, `토큰은 ${QUOTE_TOKEN_LENGTH}자여야 합니다`)
  .regex(/^[a-zA-Z0-9_-]+$/, "토큰은 영문, 숫자, _, - 만 허용됩니다");

// 견적서 항목(line item) 스키마
export const quoteItemSchema = z.object({
  // 항목 이름
  name: z.string().min(1, "항목명은 필수입니다"),
  // 수량
  quantity: z.number().int().positive("수량은 1 이상이어야 합니다"),
  // 단가
  unitPrice: z.number().nonnegative("단가는 0 이상이어야 합니다"),
  // 소계 (quantity * unitPrice)
  subtotal: z.number().nonnegative(),
});

// 견적서 전체 스키마 (Notion 데이터베이스에서 조회한 데이터 구조)
export const quoteSchema = z.object({
  // 견적서 고유 ID (Notion 페이지 ID)
  id: z.string(),
  // 공개 URL 토큰
  token: z.string(),
  // 견적서 제목
  title: z.string().min(1, "견적서 제목은 필수입니다"),
  // 수신처 (고객사명)
  clientName: z.string().min(1, "고객사명은 필수입니다"),
  // 발신처 (발행사명)
  issuerName: z.string().min(1, "발행사명은 필수입니다"),
  // 발행일 (ISO 날짜 문자열)
  issuedAt: z.string(),
  // 유효기간 (ISO 날짜 문자열, 선택사항)
  validUntil: z.string().optional(),
  // 견적서 상태
  status: z.enum([
    QUOTE_STATUS.DRAFT,
    QUOTE_STATUS.SENT,
    QUOTE_STATUS.ACCEPTED,
    QUOTE_STATUS.REJECTED,
  ]),
  // 견적서 항목 목록
  items: z.array(quoteItemSchema),
  // 총액 (세금 포함 여부)
  totalAmount: z.number().nonnegative(),
  // 비고 (선택사항)
  notes: z.string().optional(),
});

// 타입 추론 export
export type QuoteToken = z.infer<typeof quoteTokenSchema>;
export type QuoteItem = z.infer<typeof quoteItemSchema>;
export type Quote = z.infer<typeof quoteSchema>;
