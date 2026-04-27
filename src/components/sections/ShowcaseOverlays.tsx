// Dialog, Sheet, Tooltip, Popover 쇼케이스
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Heading } from "./Heading";
import { Card } from "@/components/ui/card";

export function ShowcaseOverlays() {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <section className="space-y-8">
      <Heading
        title="오버레이 컴포넌트"
        description="Dialog, Tooltip, Popover 등 오버레이 패턴"
      />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Dialog 예제 */}
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Dialog</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Dialog 열기</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog 제목</DialogTitle>
                <DialogDescription>
                  모달 다이얼로그를 사용하여 사용자 입력을 받거나 중요한 정보를 표시합니다.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  이것은 DialogContent 내부의 콘텐츠입니다.
                </p>
                <Button className="w-full">확인</Button>
              </div>
            </DialogContent>
          </Dialog>
        </Card>

        {/* Tooltip 예제 */}
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Tooltip</h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">마우스를 올려주세요</Button>
            </TooltipTrigger>
            <TooltipContent>
              이것이 Tooltip입니다. 간단한 정보를 표시할 때 유용합니다.
            </TooltipContent>
          </Tooltip>
        </Card>

        {/* Popover 예제 */}
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Popover</h3>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button>Popover 열기</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-semibold">Popover 제목</h4>
                <p className="text-sm text-muted-foreground">
                  Popover는 Dialog보다 가벼운 오버레이입니다. 클릭으로 열고 닫습니다.
                </p>
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => setPopoverOpen(false)}
                >
                  닫기
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </Card>

        {/* 복합 예제 */}
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">여러 오버레이</h3>
          <div className="space-y-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Dialog + Tooltip</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>복합 오버레이</DialogTitle>
                </DialogHeader>
                <div className="flex gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm">?</Button>
                    </TooltipTrigger>
                    <TooltipContent>Dialog 내부의 Tooltip</TooltipContent>
                  </Tooltip>
                  <p className="text-sm">Dialog와 Tooltip을 함께 사용할 수 있습니다.</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>
    </section>
  );
}
