// 예제 모음 페이지
import { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Layers,
  FileText,
  LayoutDashboard,
  Code2,
  Database,
  Settings,
  Lightbulb,
} from "lucide-react";

export const metadata: Metadata = {
  title: "예제 | Next.js 스타터킷",
  description: "shadcn/ui 컴포넌트 및 실제 구현 예제 모음",
};

// 예제 카드 데이터 타입
interface ExampleCard {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  tags: string[];
  href: string;
}

// 예제 카드 데이터 정의
const EXAMPLE_CARDS: ExampleCard[] = [
  {
    id: "components",
    icon: Layers,
    title: "컴포넌트 쇼케이스",
    description: "모든 UI 컴포넌트의 실제 동작을 확인하고 코드 예제를 살펴보세요.",
    tags: ["UI/UX", "인터랙티브"],
    href: "/examples/components",
  },
  {
    id: "forms",
    icon: FileText,
    title: "폼 예제",
    description: "react-hook-form과 zod를 활용한 다양한 폼 구현 예제입니다.",
    tags: ["검증", "상태관리"],
    href: "/examples/forms",
  },
  {
    id: "layout",
    icon: LayoutDashboard,
    title: "레이아웃 예제",
    description: "다양한 레이아웃 패턴과 반응형 디자인 구현 방법을 확인하세요.",
    tags: ["반응형", "레이아웃"],
    href: "/examples/layout",
  },
  {
    id: "hooks",
    icon: Code2,
    title: "usehooks-ts 예제",
    description:
      "usehooks-ts 라이브러리의 다양한 훅 사용법과 실용적인 예제들입니다.",
    tags: ["훅", "유틸리티"],
    href: "/examples/hooks",
  },
  {
    id: "data",
    icon: Database,
    title: "데이터 페칭",
    description: "API 호출, 로딩 상태, 에러 처리 등 데이터 관리 예제입니다.",
    tags: ["API", "비동기"],
    href: "/examples/data",
  },
  {
    id: "config",
    icon: Settings,
    title: "설정 및 최적화",
    description:
      "성능 최적화, SEO 설정, PWA 구현 등 프로덕션 환경을 위한 설정들입니다.",
    tags: ["최적화", "SEO"],
    href: "/examples/config",
  },
];

export default function ExamplesPage() {
  return (
    <PageLayout>
      <div className="space-y-12 py-8">
        {/* 페이지 헤더 */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            예제 모음
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            실제 동작하는 예제를 통해 스타터킷의 모든 기능을 탐색해보세요. 각
            예제는 소스 코드와 함께 제공됩니다.
          </p>
        </div>

        {/* 예제 카드 그리드 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EXAMPLE_CARDS.map((example) => {
            const Icon = example.icon;
            return (
              <Link
                key={example.id}
                href={example.href}
                className="group rounded-lg border bg-card p-6 hover:border-primary/50 transition-colors"
              >
                {/* 아이콘 */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                {/* 제목 */}
                <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors">
                  {example.title}
                </h3>

                {/* 설명 */}
                <p className="mb-4 text-sm text-muted-foreground">
                  {example.description}
                </p>

                {/* 태그 */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {example.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* 버튼 */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  asChild
                >
                  <span>예제 보기</span>
                </Button>
              </Link>
            );
          })}
        </div>

        {/* 하단 안내 바 */}
        <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
          <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            각 예제는 실제 코드와 함께 제공되며 자유롭게 복사하여 사용할 수
            있습니다.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
