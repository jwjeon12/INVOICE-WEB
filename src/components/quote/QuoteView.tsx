// 견적서 조회 뷰 컴포넌트
// 서버에서 조회한 견적서 데이터를 화면에 렌더링하고 PDF 다운로드 버튼 제공
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { QuoteDownloadButton } from "./QuoteDownloadButton";
import type { Quote } from "@/lib/validations";
import { QUOTE_STATUS, CURRENCY_LOCALE, CURRENCY_CODE } from "@/lib/constants";

interface QuoteViewProps {
  quote: Quote;
}

// 견적서 상태 배지 색상 매핑
const STATUS_VARIANT = {
  [QUOTE_STATUS.DRAFT]: "secondary",
  [QUOTE_STATUS.SENT]: "default",
  [QUOTE_STATUS.ACCEPTED]: "outline",
  [QUOTE_STATUS.REJECTED]: "destructive",
} as const;

// 견적서 상태 한국어 표시
const STATUS_LABEL = {
  [QUOTE_STATUS.DRAFT]: "초안",
  [QUOTE_STATUS.SENT]: "발송됨",
  [QUOTE_STATUS.ACCEPTED]: "승인됨",
  [QUOTE_STATUS.REJECTED]: "거절됨",
} as const;

// 금액을 한국 원화 형식으로 포맷
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: "currency",
    currency: CURRENCY_CODE,
  }).format(amount);
}

// 날짜 문자열을 한국어 형식으로 포맷
function formatDate(dateStr: string): string {
  if (!dateStr) return "-";
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateStr));
}

export function QuoteView({ quote }: QuoteViewProps) {
  const statusVariant = STATUS_VARIANT[quote.status] ?? "secondary";
  const statusLabel = STATUS_LABEL[quote.status] ?? quote.status;

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-8 px-4">
      {/* 헤더: 제목 + 상태 + PDF 다운로드 버튼 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{quote.title}</h1>
            <Badge variant={statusVariant}>{statusLabel}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            발행일: {formatDate(quote.issuedAt)}
            {quote.validUntil && ` · 유효기간: ${formatDate(quote.validUntil)}`}
          </p>
        </div>
        {/* PDF 다운로드 버튼 (클라이언트 컴포넌트) */}
        <QuoteDownloadButton quote={quote} />
      </div>

      {/* 발신처 / 수신처 정보 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              발행사
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{quote.issuerName}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              수신처
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{quote.clientName}</p>
          </CardContent>
        </Card>
      </div>

      {/* 견적 항목 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle>견적 항목</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">항목명</th>
                  <th className="px-4 py-3 text-right font-medium">수량</th>
                  <th className="px-4 py-3 text-right font-medium">단가</th>
                  <th className="px-4 py-3 text-right font-medium">소계</th>
                </tr>
              </thead>
              <tbody>
                {quote.items.map((item, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3 text-right">{item.quantity}</td>
                    <td className="px-4 py-3 text-right">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {formatCurrency(item.subtotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 합계 */}
      <div className="flex justify-end">
        <div className="w-full max-w-xs space-y-2">
          <Separator />
          <div className="flex justify-between items-center font-semibold text-lg">
            <span>합계</span>
            <span>{formatCurrency(quote.totalAmount)}</span>
          </div>
        </div>
      </div>

      {/* 비고 */}
      {quote.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">비고</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {quote.notes}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
