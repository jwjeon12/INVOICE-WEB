// 푸터 컴포넌트 - 견적서 시스템 전용 미니멀 푸터
// 정적 콘텐츠 → Server Component
import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  // 저작권 연도를 동적으로 생성
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* 저작권 표시 */}
        <p className="text-center text-sm text-muted-foreground">
          © {currentYear} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
