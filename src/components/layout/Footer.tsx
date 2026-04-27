// 푸터 컴포넌트
import { SITE_NAME, NAV_LINKS } from "@/lib/constants";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

// 정적 콘텐츠 → Server Component
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* 푸터 콘텐츠 */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* 브랜드 */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{SITE_NAME}</h3>
            <p className="text-sm text-muted-foreground">
              모던 웹 개발을 위한 스타터킷
            </p>
          </div>

          {/* 네비게이션 링크 */}
          <div className="space-y-2">
            <h4 className="font-semibold">링크</h4>
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 법적 정보 */}
          <div className="space-y-2">
            <h4 className="font-semibold">정보</h4>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  개인정보보호
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  이용약관
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div className="space-y-2">
            <h4 className="font-semibold">연락처</h4>
            <p className="text-sm text-muted-foreground">
              contact@example.com
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        {/* 저작권 */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js, Tailwind CSS, and shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  );
}
