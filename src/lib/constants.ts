// 앱 전체에서 사용하는 상수 정의 (매직 넘버 방지)

// 네비게이션 링크 정의
export const NAV_LINKS = [
  { label: "홈", href: "/" },
  { label: "소개", href: "/about" },
  { label: "예제", href: "/examples" },
] as const;

// 사이드바 메뉴 정의
export const SIDEBAR_LINKS = [
  { label: "대시보드", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "사용자", href: "/dashboard/users", icon: "Users" },
  { label: "설정", href: "/dashboard/settings", icon: "Settings" },
] as const;

// 사이트 정보
export const SITE_NAME = "Next.js 스타터킷";
export const SITE_DESCRIPTION = "모던 웹 개발을 위한 스타터킷";

// 브레이크포인트 (Tailwind v4 기본값과 동일)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
