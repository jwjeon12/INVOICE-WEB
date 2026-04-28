// 페이지 레이아웃 - Header + main + Footer 조합
// Server Component: 정적 레이아웃 구조
import { Header } from "./Header";
import { Footer } from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  // 페이지 본문 영역에 추가적인 클래스를 전달할 수 있음
  className?: string;
}

// 전체 페이지 구조: sticky header → flex-grow main → footer
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
