// 404 Not Found 페이지 - 전역 오류 페이지
// Next.js App Router의 not-found.tsx는 notFound() 호출 시 자동으로 표시됨
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileX } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      {/* 오류 아이콘 */}
      <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 mb-6">
        <FileX className="h-10 w-10 text-destructive" />
      </div>

      {/* 오류 메시지 */}
      <h1 className="text-2xl font-bold mb-2">견적서를 찾을 수 없습니다</h1>
      <p className="text-muted-foreground max-w-sm mb-8">
        요청하신 견적서가 존재하지 않거나, 링크가 만료되었습니다.
        담당자에게 문의해주세요.
      </p>

      {/* 홈으로 이동 버튼 */}
      <Button asChild variant="outline">
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  );
}
