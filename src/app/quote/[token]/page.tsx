// 공개 견적서 조회 페이지
// URL 토큰으로 Notion 데이터베이스에서 견적서를 조회하여 표시
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getQuoteByToken } from "@/lib/quote";
import { quoteTokenSchema } from "@/lib/validations";
import { QuoteView } from "@/components/quote/QuoteView";

// Next.js 15 App Router: params는 Promise로 전달됨
interface QuotePageProps {
  params: Promise<{ token: string }>;
}

// 동적 메타데이터 생성: 견적서 제목을 페이지 타이틀로 사용
export async function generateMetadata({
  params,
}: QuotePageProps): Promise<Metadata> {
  const { token } = await params;
  const quote = await getQuoteByToken(token);

  if (!quote) {
    return { title: "견적서를 찾을 수 없습니다" };
  }

  return {
    title: `${quote.title} | 견적서`,
    description: `${quote.clientName} 견적서`,
  };
}

// 견적서 조회 페이지 - 서버 컴포넌트
export default async function QuotePage({ params }: QuotePageProps) {
  const { token } = await params;

  // 토큰 형식 검증 (잘못된 형식이면 404 처리)
  const tokenResult = quoteTokenSchema.safeParse(token);
  if (!tokenResult.success) {
    notFound();
  }

  // Notion에서 견적서 데이터 조회
  const quote = await getQuoteByToken(token);

  // 존재하지 않는 견적서는 404 처리
  if (!quote) {
    notFound();
  }

  return <QuoteView quote={quote} />;
}
