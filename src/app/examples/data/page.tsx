// 데이터 페칭 예제 페이지
import { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PostsDemo, ErrorHandlingDemo } from "./DataFetchingDemo";

export const metadata: Metadata = {
  title: "데이터 페칭 | 예제",
  description: "API 호출, 로딩 상태, 에러 처리 예제",
};

export default function DataExamplePage() {
  return (
    <PageLayout>
      <div className="space-y-8 py-8">
        {/* 뒤로 가기 + 헤더 */}
        <div className="space-y-4">
          <Button asChild variant="ghost" size="sm" className="-ml-2">
            <Link href="/examples">
              <ArrowLeft className="mr-2 h-4 w-4" />
              예제 목록으로
            </Link>
          </Button>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">데이터 페칭</h1>
            <p className="text-muted-foreground">
              실제 외부 API를 호출하는 예제입니다. 로딩, 성공, 에러 세 가지
              상태를 모두 직접 확인해보세요.
            </p>
          </div>
        </div>

        {/* 기본 fetch 예제 */}
        <PostsDemo />

        {/* 에러 처리 예제 */}
        <ErrorHandlingDemo />
      </div>
    </PageLayout>
  );
}
