// Skeleton, Toast, Table 쇼케이스
"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Heading } from "./Heading";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export function ShowcaseFeedback() {
  return (
    <section className="space-y-8">
      <Heading
        title="피드백 컴포넌트"
        description="Skeleton, Toast, Table, Tabs, Accordion"
      />

      <Tabs defaultValue="skeleton" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="skeleton">Skeleton</TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
          <TabsTrigger value="tabs">Tabs</TabsTrigger>
          <TabsTrigger value="accordion">Accordion</TabsTrigger>
        </TabsList>

        {/* Skeleton 탭 */}
        <TabsContent value="skeleton" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex gap-2 pt-4">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-20" />
              </div>
            </div>
          </Card>
          <Button
            onClick={() =>
              toast.info("로딩이 완료되었습니다!")
            }
          >
            Toast 테스트
          </Button>
        </TabsContent>

        {/* Table 탭 */}
        <TabsContent value="table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>역할</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: "홍길동", email: "hong@example.com", role: "관리자" },
                { name: "김영희", email: "kim@example.com", role: "사용자" },
                { name: "이순신", email: "lee@example.com", role: "사용자" },
              ].map((row) => (
                <TableRow key={row.email}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Tabs 중첩 */}
        <TabsContent value="tabs">
          <Tabs defaultValue="tab1" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tab1">탭 1</TabsTrigger>
              <TabsTrigger value="tab2">탭 2</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="p-4">
              첫 번째 탭의 내용입니다.
            </TabsContent>
            <TabsContent value="tab2" className="p-4">
              두 번째 탭의 내용입니다.
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Accordion */}
        <TabsContent value="accordion">
          <Accordion type="single" collapsible>
            {["항목 1", "항목 2", "항목 3"].map((item, index) => (
              <AccordionItem key={index} value={item}>
                <AccordionTrigger>{item}</AccordionTrigger>
                <AccordionContent>
                  이것은 {item}의 세부 내용입니다.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>

      {/* Toast 버튼 그룹 */}
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold">Toast 알림 테스트</h3>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => toast.success("성공 메시지!")}>
            성공
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.error("오류 메시지!")}
          >
            오류
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.info("정보 메시지!")}
          >
            정보
          </Button>
          <Button
            variant="ghost"
            onClick={() => toast.warning("경고 메시지!")}
          >
            경고
          </Button>
        </div>
      </Card>
    </section>
  );
}
