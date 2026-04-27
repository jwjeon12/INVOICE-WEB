// 버튼 컴포넌트 쇼케이스
import { Button } from "@/components/ui/button";
import { Heading } from "./Heading";

export function ShowcaseButtons() {
  return (
    <section className="space-y-8">
      <Heading
        title="버튼 컴포넌트"
        description="다양한 스타일과 크기의 버튼"
      />

      {/* 버튼 variant 쇼케이스 */}
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Variant</h3>
          <div className="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        {/* 버튼 size 쇼케이스 */}
        <div>
          <h3 className="font-semibold mb-3">Size</h3>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">+</Button>
            <Button size="icon-sm">+</Button>
            <Button size="icon-lg">+</Button>
          </div>
        </div>

        {/* 비활성화 상태 */}
        <div>
          <h3 className="font-semibold mb-3">Disabled</h3>
          <div className="flex flex-wrap gap-2">
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>
              Disabled
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
