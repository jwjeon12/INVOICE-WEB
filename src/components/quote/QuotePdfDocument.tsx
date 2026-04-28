// 견적서 PDF 문서 컴포넌트
// @react-pdf/renderer를 사용하여 견적서를 PDF 형식으로 렌더링
// 이 컴포넌트는 브라우저에서 동적으로 임포트됨 (서버 사이드 렌더링 불가)
"use client";

// Font는 한글 폰트 등록 시 사용 예정 (현재는 미사용)
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { Quote } from "@/lib/validations";
import { QUOTE_STATUS, CURRENCY_LOCALE, CURRENCY_CODE } from "@/lib/constants";

interface QuotePdfDocumentProps {
  quote: Quote;
}

// 견적서 상태 한국어 표시 (PDF용)
const STATUS_LABEL_KO: Record<string, string> = {
  [QUOTE_STATUS.DRAFT]: "초안",
  [QUOTE_STATUS.SENT]: "발송됨",
  [QUOTE_STATUS.ACCEPTED]: "승인됨",
  [QUOTE_STATUS.REJECTED]: "거절됨",
};

// 금액 포맷 함수
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: "currency",
    currency: CURRENCY_CODE,
  }).format(amount);
}

// 날짜 포맷 함수
function formatDate(dateStr: string): string {
  if (!dateStr) return "-";
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateStr));
}

// PDF 스타일 정의 (react-pdf는 Flexbox 기반 레이아웃 사용)
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1a1a1a",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: "#666",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoBox: {
    flex: 1,
    marginRight: 8,
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 4,
  },
  infoLabel: {
    fontSize: 8,
    color: "#888",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  infoValue: {
    fontSize: 11,
    fontWeight: "bold",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 4,
    marginBottom: 4,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderBottom: "1 solid #e0e0e0",
  },
  colName: { flex: 3 },
  colQty: { flex: 1, textAlign: "right" },
  colPrice: { flex: 2, textAlign: "right" },
  colSubtotal: { flex: 2, textAlign: "right" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    paddingTop: 8,
    borderTop: "2 solid #1a1a1a",
  },
  totalLabel: { fontSize: 12, fontWeight: "bold", marginRight: 16 },
  totalValue: { fontSize: 12, fontWeight: "bold" },
  notesBox: {
    marginTop: 24,
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 4,
  },
  notesTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 6,
  },
  notesText: {
    fontSize: 9,
    color: "#444",
    lineHeight: 1.5,
  },
});

// 견적서 PDF 문서 컴포넌트
export function QuotePdfDocument({ quote }: QuotePdfDocumentProps) {
  return (
    <Document
      title={quote.title}
      author={quote.issuerName}
      subject="견적서"
    >
      <Page size="A4" style={styles.page}>
        {/* 문서 제목 */}
        <Text style={styles.title}>{quote.title}</Text>
        <Text style={styles.subtitle}>
          발행일: {formatDate(quote.issuedAt)}
          {quote.validUntil ? ` · 유효기간: ${formatDate(quote.validUntil)}` : ""}
          {" · 상태: "}
          {STATUS_LABEL_KO[quote.status] ?? quote.status}
        </Text>

        {/* 발행사 / 수신처 정보 */}
        <View style={styles.row}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>발행사</Text>
            <Text style={styles.infoValue}>{quote.issuerName}</Text>
          </View>
          <View style={[styles.infoBox, { marginRight: 0 }]}>
            <Text style={styles.infoLabel}>수신처</Text>
            <Text style={styles.infoValue}>{quote.clientName}</Text>
          </View>
        </View>

        {/* 견적 항목 헤더 */}
        <View style={styles.tableHeader}>
          <Text style={styles.colName}>항목명</Text>
          <Text style={styles.colQty}>수량</Text>
          <Text style={styles.colPrice}>단가</Text>
          <Text style={styles.colSubtotal}>소계</Text>
        </View>

        {/* 견적 항목 목록 */}
        {quote.items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.colName}>{item.name}</Text>
            <Text style={styles.colQty}>{item.quantity}</Text>
            <Text style={styles.colPrice}>{formatCurrency(item.unitPrice)}</Text>
            <Text style={styles.colSubtotal}>{formatCurrency(item.subtotal)}</Text>
          </View>
        ))}

        {/* 합계 */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>합계</Text>
          <Text style={styles.totalValue}>{formatCurrency(quote.totalAmount)}</Text>
        </View>

        {/* 비고 */}
        {quote.notes && (
          <View style={styles.notesBox}>
            <Text style={styles.notesTitle}>비고</Text>
            <Text style={styles.notesText}>{quote.notes}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
