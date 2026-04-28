// 헤더 컴포넌트 - 견적서 시스템 전용 미니멀 헤더
// Server Component: 정적 구조로 별도 상태 불필요
import { SITE_NAME } from "@/lib/constants";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* 브랜드 로고 - 홈으로 이동 */}
        <Link
          href="/"
          className="font-bold text-lg hover:opacity-80 transition-opacity"
        >
          {SITE_NAME}
        </Link>

        {/* 테마 토글 버튼 */}
        <ThemeToggle />
      </nav>
    </header>
  );
}
