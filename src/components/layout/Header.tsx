// 헤더 컴포넌트 (정적 구조)
import { SITE_NAME, NAV_LINKS } from "@/lib/constants";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { MobileMenu } from "./MobileMenu";

// Server Component: 정적 구조
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* 로고/브랜드 */}
        <Link href="/" className="font-bold text-lg hover:opacity-80 transition-opacity">
          {SITE_NAME}
        </Link>

        {/* 데스크탑 네비게이션 (md 이상에서만 표시) */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* 우측 버튼 (테마 토글, 모바일 메뉴) */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* 모바일 메뉴 (md 미만에서만 표시) */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}
