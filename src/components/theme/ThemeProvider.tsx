// next-themes Provider를 Client Component로 래핑
// App Router에서 Context를 사용하는 라이브러리는 반드시 "use client" 필요
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

// next-themes ThemeProvider 얇은 래퍼
// attribute="class": globals.css의 .dark 클래스와 호환
// enableSystem: OS 테마 자동 감지
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
