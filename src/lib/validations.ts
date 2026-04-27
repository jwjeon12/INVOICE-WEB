// 재사용 가능한 Zod 스키마 모음
import { z } from "zod";

// 로그인 폼 스키마
export const loginSchema = z.object({
  email: z.string().email("올바른 이메일을 입력해주세요"),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
});

// 회원가입 폼 스키마 (비밀번호 확인 포함)
export const registerSchema = loginSchema
  .extend({
    name: z.string().min(2, "이름은 2자 이상이어야 합니다"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

// 문의 폼 스키마
export const contactSchema = z.object({
  name: z.string().min(2, "이름은 2자 이상이어야 합니다"),
  email: z.string().email("올바른 이메일을 입력해주세요"),
  subject: z.string().min(5, "제목은 5자 이상이어야 합니다"),
  message: z.string().min(10, "메시지는 10자 이상이어야 합니다"),
});

// 타입 추론 export
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ContactFormValues = z.infer<typeof contactSchema>;
