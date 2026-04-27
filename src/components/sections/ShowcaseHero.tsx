// 히어로 섹션
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ShowcaseHero() {
  return (
    <section className="space-y-6 py-12 md:py-20">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Next.js 모던 웹 스타터킷
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Next.js 16 + Tailwind CSS v4 + shadcn/ui 기반의 완전한 웹 개발 스타터킷.
          빠르게 시작하고, 쉽게 확장할 수 있습니다.
        </p>
      </div>

      {/* CTA 버튼 */}
      <div className="flex flex-wrap gap-4">
        <Button asChild size="lg">
          <Link href="/examples">시작하기</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
            GitHub
          </Link>
        </Button>
      </div>

      {/* 특징 리스트 */}
      <div className="grid gap-4 pt-8 sm:grid-cols-2 md:grid-cols-3">
        {[
          { title: "⚡ 고속", desc: "Next.js 16 최신 성능" },
          { title: "🎨 스타일", desc: "Tailwind CSS v4" },
          { title: "🧩 컴포넌트", desc: "shadcn/ui 40+" },
          { title: "📱 반응형", desc: "모든 기기 지원" },
          { title: "🌙 테마", desc: "다크/라이트 모드" },
          { title: "📝 폼", desc: "React Hook Form + Zod" },
        ].map((feature) => (
          <div
            key={feature.title}
            className="rounded-lg border bg-card p-4 hover:border-primary/50 transition-colors"
          >
            <h3 className="font-semibold">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
