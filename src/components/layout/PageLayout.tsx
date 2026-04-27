// 페이지 레이아웃 (Header + main + Footer 조합)
import { Header } from "./Header";
import { Footer } from "./Footer";

// Server Component: 정적 레이아웃
interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

// 전체 페이지 구조: sticky header + flex-1 main + footer
export function PageLayout({ children, className = "" }: PageLayoutProps) {
  return (
    <>
      <Header />
      <main className={`flex-1 container mx-auto px-4 py-8 ${className}`}>
        {children}
      </main>
      <Footer />
    </>
  );
}
