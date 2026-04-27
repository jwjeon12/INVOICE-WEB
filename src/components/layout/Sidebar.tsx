// 사이드바 (대시보드 레이아웃용)
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SIDEBAR_LINKS } from "@/lib/constants";
import { useIsMobile } from "@/hooks";

interface SidebarProps {
  children: React.ReactNode;
}

// 접힘/펼침 기능이 있는 대시보드 사이드바
export function Sidebar({ children }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();

  // 모바일에서는 항상 collapse
  const isCollapsed = isMobile || collapsed;

  return (
    <div className="flex h-screen">
      {/* 사이드바 */}
      <aside
        className={`border-r bg-background transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          {!isCollapsed && <span className="font-semibold">메뉴</span>}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              aria-label="사이드바 접기/펼치기"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        {/* 네비게이션 링크 */}
        <nav className="space-y-2 px-2">
          {SIDEBAR_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent ${
                isCollapsed ? "justify-center" : ""
              }`}
              title={isCollapsed ? link.label : undefined}
            >
              <span className="w-5">{link.icon}</span>
              {!isCollapsed && <span>{link.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
