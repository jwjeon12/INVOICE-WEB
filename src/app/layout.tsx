// 루트 레이아웃: ThemeProvider + TooltipProvider + Toaster 포함
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js 스타터킷",
  description: "Next.js 16 + Tailwind v4 + shadcn/ui 모던 웹 스타터킷",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: next-themes의 테마 클래스 주입으로 인한 hydration 경고 억제
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* attribute="class": globals.css .dark 클래스와 호환 */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Tooltip 전역 Provider */}
          <TooltipProvider>
            {children}
          </TooltipProvider>
          {/* 전역 Toast 알림 (sonner) */}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
