// 레이아웃 예제 페이지
import { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "레이아웃 예제 | 예제",
  description: "반응형 레이아웃 패턴 예제",
};

export default function LayoutExamplePage() {
  return (
    <PageLayout>
      <div className="space-y-12 py-8">
        {/* 뒤로 가기 + 헤더 */}
        <div className="space-y-4">
          <Button asChild variant="ghost" size="sm" className="-ml-2">
            <Link href="/examples">
              <ArrowLeft className="mr-2 h-4 w-4" />
              예제 목록으로
            </Link>
          </Button>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">레이아웃 예제</h1>
            <p className="text-muted-foreground">
              Tailwind CSS의 그리드와 플렉스 시스템을 활용한 반응형 레이아웃
              패턴입니다. 브라우저 창 크기를 바꿔보세요.
            </p>
          </div>
        </div>

        {/* 1열 → 2열 → 3열 그리드 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">반응형 그리드</h2>
            <Badge variant="secondary">grid-cols-1 → 2 → 3</Badge>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <Card key={i} className="flex h-24 items-center justify-center">
                <span className="text-muted-foreground">항목 {i + 1}</span>
              </Card>
            ))}
          </div>
        </section>

        {/* 사이드바 레이아웃 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">사이드바 레이아웃</h2>
            <Badge variant="secondary">lg:grid-cols-[240px_1fr]</Badge>
          </div>
          <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
            <Card className="flex h-48 items-center justify-center bg-muted/30">
              <span className="text-sm text-muted-foreground">사이드바</span>
            </Card>
            <Card className="flex h-48 items-center justify-center">
              <span className="text-sm text-muted-foreground">메인 콘텐츠</span>
            </Card>
          </div>
        </section>

        {/* 헤더 + 본문 + 푸터 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">기본 페이지 구조</h2>
            <Badge variant="secondary">min-h-screen flex-col</Badge>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border overflow-hidden">
            <div className="flex h-12 items-center justify-center bg-primary/10 text-sm font-medium">
              헤더 (Header)
            </div>
            <div className="flex h-32 items-center justify-center bg-muted/30 text-sm text-muted-foreground">
              메인 콘텐츠 (flex-1)
            </div>
            <div className="flex h-10 items-center justify-center bg-primary/10 text-sm font-medium">
              푸터 (Footer)
            </div>
          </div>
        </section>

        {/* 카드 분할 레이아웃 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">비율 분할 레이아웃</h2>
            <Badge variant="secondary">grid-cols-[2fr_1fr]</Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
            <Card className="flex h-36 items-center justify-center">
              <span className="text-sm text-muted-foreground">메인 (2fr)</span>
            </Card>
            <Card className="flex h-36 items-center justify-center bg-muted/30">
              <span className="text-sm text-muted-foreground">사이드 (1fr)</span>
            </Card>
          </div>
        </section>

        {/* 중앙 정렬 레이아웃 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">중앙 정렬 + 최대 너비</h2>
            <Badge variant="secondary">max-w-2xl mx-auto</Badge>
          </div>
          <div className="rounded-lg border p-4">
            <Card className="mx-auto max-w-2xl flex h-24 items-center justify-center bg-muted/30">
              <span className="text-sm text-muted-foreground">
                max-w-2xl mx-auto — 중앙 정렬된 콘텐츠
              </span>
            </Card>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
