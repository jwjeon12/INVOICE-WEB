// React Hook Form + Zod 폼 쇼케이스
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Heading } from "./Heading";
import { contactSchema, type ContactFormValues } from "@/lib/validations";
import { toast } from "sonner";

// React Hook Form + Zod 패턴 쇼케이스
export function ShowcaseForms() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 폼 제출 핸들러
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // 실제로는 여기서 API 호출
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("Form submitted:", data);
      toast.success("메시지가 전송되었습니다!");
      form.reset();
    } catch {
      toast.error("오류가 발생했습니다");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-8">
      <Heading
        title="폼 컴포넌트"
        description="React Hook Form + Zod 유효성 검사 예제"
      />

      <Card className="p-8 max-w-xl">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* 이름 필드 */}
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              placeholder="이름을 입력하세요"
              {...form.register("name")}
              aria-invalid={!!form.formState.errors.name}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* 이메일 필드 */}
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              {...form.register("email")}
              aria-invalid={!!form.formState.errors.email}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* 제목 필드 */}
          <div className="space-y-2">
            <Label htmlFor="subject">제목</Label>
            <Input
              id="subject"
              placeholder="제목을 입력하세요"
              {...form.register("subject")}
              aria-invalid={!!form.formState.errors.subject}
            />
            {form.formState.errors.subject && (
              <p className="text-sm text-destructive">
                {form.formState.errors.subject.message}
              </p>
            )}
          </div>

          {/* 메시지 필드 */}
          <div className="space-y-2">
            <Label htmlFor="message">메시지</Label>
            <Textarea
              id="message"
              placeholder="메시지를 입력하세요"
              rows={5}
              {...form.register("message")}
              aria-invalid={!!form.formState.errors.message}
            />
            {form.formState.errors.message && (
              <p className="text-sm text-destructive">
                {form.formState.errors.message.message}
              </p>
            )}
          </div>

          {/* 제출 버튼 */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "전송 중..." : "전송"}
          </Button>
        </form>
      </Card>
    </section>
  );
}
