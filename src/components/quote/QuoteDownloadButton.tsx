// PDF 다운로드 버튼 컴포넌트
// @react-pdf/renderer를 사용하여 견적서 PDF를 생성하고 다운로드
// 클라이언트 사이드에서만 실행 (브라우저 API 필요)
"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Quote } from "@/lib/validations";
import { PDF_FILENAME_PREFIX } from "@/lib/constants";

interface QuoteDownloadButtonProps {
  quote: Quote;
}

export function QuoteDownloadButton({ quote }: QuoteDownloadButtonProps) {
  // PDF 생성 중 로딩 상태 관리
  const [isGenerating, setIsGenerating] = useState(false);

  // PDF 생성 및 다운로드 핸들러
  const handleDownload = async () => {
    setIsGenerating(true);

    try {
      // react-pdf는 동적 임포트 사용 (초기 번들 크기 최적화)
      const { pdf } = await import("@react-pdf/renderer");
      const { QuotePdfDocument } = await import("./QuotePdfDocument");
      const { createElement } = await import("react");

      // PDF 바이너리 생성
      // react-pdf의 pdf() 함수는 DocumentProps 타입을 요구하지만
      // 커스텀 컴포넌트 props와 타입이 맞지 않아 unknown 경유 캐스팅 필요
      type PdfRenderer = (element: unknown) => { toBlob: () => Promise<Blob> };
      const blob = await (pdf as PdfRenderer)(
        createElement(QuotePdfDocument, { quote })
      ).toBlob();

      // 브라우저에서 파일 다운로드 트리거
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${PDF_FILENAME_PREFIX}-${quote.token}.pdf`;
      link.click();

      // 메모리 누수 방지를 위해 객체 URL 해제
      URL.revokeObjectURL(url);

      toast.success("PDF가 성공적으로 다운로드되었습니다.");
    } catch (error) {
      console.error("PDF 생성 실패:", error);
      toast.error("PDF 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isGenerating}
      className="shrink-0"
    >
      <Download className="mr-2 h-4 w-4" />
      {isGenerating ? "PDF 생성 중..." : "PDF 다운로드"}
    </Button>
  );
}
