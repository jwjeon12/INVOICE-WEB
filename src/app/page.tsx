// 스타터킷 전체 쇼케이스 페이지
import { PageLayout } from "@/components/layout/PageLayout";
import { ShowcaseHero } from "@/components/sections/ShowcaseHero";
import { ShowcaseButtons } from "@/components/sections/ShowcaseButtons";
import { ShowcaseForms } from "@/components/sections/ShowcaseForms";
import { ShowcaseCards } from "@/components/sections/ShowcaseCards";
import { ShowcaseOverlays } from "@/components/sections/ShowcaseOverlays";
import { ShowcaseFeedback } from "@/components/sections/ShowcaseFeedback";

// 모든 컴포넌트를 쇼케이스하는 데모 페이지
export default function Home() {
  return (
    <PageLayout>
      {/* 전체 쇼케이스 섹션 */}
      <div className="space-y-24 py-8">
        {/* 1. 히어로 섹션 */}
        <ShowcaseHero />

        {/* 2. 버튼 쇼케이스 */}
        <ShowcaseButtons />

        {/* 3. 폼 쇼케이스 (React Hook Form + Zod) */}
        <ShowcaseForms />

        {/* 4. 카드/배지/아바타 */}
        <ShowcaseCards />

        {/* 5. 오버레이 컴포넌트 */}
        <ShowcaseOverlays />

        {/* 6. 피드백 컴포넌트 */}
        <ShowcaseFeedback />

        {/* 7. 스타터킷 정보 */}
        <section className="space-y-4 py-8 border-t">
          <h2 className="text-3xl font-bold">스타터킷 정보</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-sm">
            <div>
              <h3 className="font-semibold mb-2">📦 기술 스택</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Next.js 16 + React 19</li>
                <li>• TypeScript 5</li>
                <li>• Tailwind CSS v4</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🎨 UI 라이브러리</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• shadcn/ui (40+ 컴포넌트)</li>
                <li>• Radix UI</li>
                <li>• lucide-react</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🛠️ 유틸리티</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• React Hook Form</li>
                <li>• Zod (유효성 검사)</li>
                <li>• usehooks-ts</li>
                <li>• Sonner (토스트)</li>
                <li>• next-themes</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
