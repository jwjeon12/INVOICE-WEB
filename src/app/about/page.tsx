// 소개 페이지
import { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import {
  Zap,
  Palette,
  Box,
  Code,
  Smartphone,
  GitBranch,
} from "lucide-react";

export const metadata: Metadata = {
  title: "소개 | Next.js 스타터킷",
  description: "Next.js 스타터킷 소개 및 기술 스택",
};

interface TechItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const TECH_STACK: TechItem[] = [
  {
    icon: Zap,
    title: "Next.js 16",
    description:
      "최신 Next.js 버전으로 빠른 성능과 최신 기능을 제공합니다.",
  },
  {
    icon: Palette,
    title: "Tailwind CSS v4",
    description:
      "강력한 CSS 프레임워크로 빠르고 효율적인 스타일링을 가능하게 합니다.",
  },
  {
    icon: Box,
    title: "shadcn/ui",
    description:
      "40개 이상의 재사용 가능한 UI 컴포넌트를 제공합니다.",
  },
  {
    icon: Code,
    title: "TypeScript",
    description:
      "타입 안정성으로 개발 경험을 향상시키고 버그를 줄입니다.",
  },
  {
    icon: Smartphone,
    title: "반응형 디자인",
    description:
      "모든 기기에서 최적의 사용 경험을 제공하는 반응형 레이아웃.",
  },
  {
    icon: GitBranch,
    title: "프로덕션 준비완료",
    description:
      "SEO, 성능 최적화, PWA 등 모든 것을 고려한 구조입니다.",
  },
];

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="space-y-12 py-8">
        {/* 소개 섹션 */}
        <section className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Next.js 모던 웹 스타터킷
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui를
            기반으로 만든 완전한 웹 개발 스타터킷입니다. 빠르게 시작하고,
            쉽게 확장할 수 있습니다.
          </p>
        </section>

        {/* 기술 스택 그리드 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">기술 스택</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_STACK.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.title}
                  className="flex flex-col gap-3 p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 특징 섹션 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">주요 특징</h2>
          <ul className="space-y-3">
            {[
              "⚡ Next.js 16의 최신 성능과 기능",
              "🎨 Tailwind CSS v4로 빠른 스타일링",
              "🧩 shadcn/ui 40+ 컴포넌트 포함",
              "📱 모든 기기에서 완벽한 반응형 디자인",
              "🌙 다크/라이트 모드 지원",
              "📝 React Hook Form + Zod 폼 관리",
              "🔍 SEO 최적화",
              "⚙️ 성능 최적화 및 프로덕션 준비",
            ].map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 text-muted-foreground"
              >
                <span className="text-primary">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 시작하기 섹션 */}
        <section className="space-y-6 border-t pt-8">
          <h2 className="text-2xl font-bold">시작하는 방법</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">1. 저장소 클론</h3>
              <code className="block rounded-lg bg-muted p-3 text-sm overflow-x-auto">
                git clone [repository-url]
              </code>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">2. 의존성 설치</h3>
              <code className="block rounded-lg bg-muted p-3 text-sm overflow-x-auto">
                npm install
              </code>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">3. 개발 서버 실행</h3>
              <code className="block rounded-lg bg-muted p-3 text-sm overflow-x-auto">
                npm run dev
              </code>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">4. http://localhost:3000 접속</h3>
              <p className="text-sm text-muted-foreground">
                브라우저를 열고 위 URL에 접속하면 스타터킷을 사용할 수
                있습니다.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
