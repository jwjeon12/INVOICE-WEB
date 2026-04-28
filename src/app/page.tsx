// 홈 페이지 - 견적서 토큰 입력 안내 페이지
// 직접 접속 시 견적서 조회 방법을 안내
import { PageLayout } from "@/components/layout/PageLayout";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { FileText } from "lucide-react";

export default function HomePage() {
  return (
    <PageLayout>
      {/* 메인 콘텐츠: 서비스 안내 */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        {/* 서비스 아이콘 */}
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <FileText className="h-10 w-10 text-primary" />
        </div>

        {/* 서비스 제목 및 설명 */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {SITE_NAME}
          </h1>
          <p className="max-w-md text-muted-foreground">
            {SITE_DESCRIPTION}
          </p>
        </div>

        {/* 사용 방법 안내 */}
        <div className="rounded-lg border bg-muted/50 px-6 py-4 max-w-md w-full text-left">
          <p className="text-sm font-medium mb-2">견적서 조회 방법</p>
          <p className="text-sm text-muted-foreground">
            담당자로부터 받은 견적서 URL로 접속하면 견적서를 조회할 수 있습니다.
          </p>
          <code className="mt-2 block text-xs text-muted-foreground">
            예: /quote/&#123;토큰&#125;
          </code>
        </div>
      </div>
    </PageLayout>
  );
}
