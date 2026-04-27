// 설정 및 최적화 예제 페이지
import { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "설정 및 최적화 | 예제",
  description: "성능 최적화, SEO 설정 가이드",
};

interface ConfigItem {
  title: string;
  description: string;
  code: string;
  tags: string[];
}

const CONFIG_ITEMS: ConfigItem[] = [
  {
    title: "metadata API (SEO)",
    description:
      "Next.js 13+의 metadata export를 사용해 각 페이지마다 SEO 메타태그를 설정합니다.",
    code: `// app/page.tsx
export const metadata: Metadata = {
  title: "페이지 제목",
  description: "페이지 설명",
  openGraph: {
    title: "OG 제목",
    description: "OG 설명",
    images: ["/og-image.png"],
  },
};`,
    tags: ["SEO", "metadata"],
  },
  {
    title: "Next.js Image 최적화",
    description:
      "next/image 컴포넌트는 자동으로 이미지를 최적화하고, lazy loading과 WebP 변환을 지원합니다.",
    code: `import Image from "next/image";

<Image
  src="/hero.png"
  alt="히어로 이미지"
  width={1200}
  height={630}
  priority  // LCP 이미지에 사용
/>`,
    tags: ["성능", "이미지"],
  },
  {
    title: "폰트 최적화",
    description:
      "next/font를 사용하면 외부 네트워크 요청 없이 폰트를 로드하여 CLS를 제거합니다.",
    code: `import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

// layout.tsx body에 적용
<body className={geist.variable}>`,
    tags: ["성능", "폰트"],
  },
  {
    title: "다이나믹 임포트 (코드 스플리팅)",
    description:
      "무거운 컴포넌트를 지연 로드해 초기 번들 크기를 줄이고 페이지 로딩 속도를 향상시킵니다.",
    code: `import dynamic from "next/dynamic";

// SSR 없이 클라이언트에서만 렌더링
const HeavyChart = dynamic(
  () => import("@/components/HeavyChart"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-64" />,
  }
);`,
    tags: ["성능", "번들"],
  },
  {
    title: "다크/라이트 모드 (next-themes)",
    description:
      "next-themes와 shadcn/ui를 조합해 플리커 없는 테마 전환을 구현합니다.",
    code: `// layout.tsx
import { ThemeProvider } from "@/components/theme/ThemeProvider";

<ThemeProvider attribute="class" defaultTheme="system">
  {children}
</ThemeProvider>

// 테마 토글
import { useTheme } from "next-themes";
const { theme, setTheme } = useTheme();`,
    tags: ["UI", "테마"],
  },
  {
    title: "환경 변수",
    description:
      "Next.js의 환경 변수 규칙으로 클라이언트/서버 공개 여부를 명확하게 구분합니다.",
    code: `# .env.local
DATABASE_URL=...          # 서버 전용
NEXT_PUBLIC_API_URL=...   # 클라이언트 노출 가능

// 서버 컴포넌트
const url = process.env.DATABASE_URL;

// 클라이언트 컴포넌트
const url = process.env.NEXT_PUBLIC_API_URL;`,
    tags: ["설정", "보안"],
  },
];

export default function ConfigExamplePage() {
  return (
    <PageLayout>
      <div className="space-y-8 py-8">
        {/* 뒤로 가기 + 헤더 */}
        <div className="space-y-4">
          <Button asChild variant="ghost" size="sm" className="-ml-2">
            <Link href="/examples">
              <ArrowLeft className="mr-2 h-4 w-4" />
              예제 목록으로
            </Link>
          </Button>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">설정 및 최적화</h1>
            <p className="text-muted-foreground">
              프로덕션 환경을 위한 성능 최적화와 SEO 설정 가이드입니다.
            </p>
          </div>
        </div>

        {/* 적용 완료 체크리스트 */}
        <Card className="p-6">
          <h2 className="font-semibold mb-4">이 스타터킷에 적용된 최적화</h2>
          <ul className="space-y-2">
            {[
              "next/font으로 폰트 최적화",
              "metadata API로 SEO 설정",
              "ThemeProvider로 다크/라이트 모드",
              "Tailwind CSS v4 최적화된 번들",
              "TypeScript strict 모드",
              "Server Component 우선 아키텍처",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* 설정 카드 목록 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {CONFIG_ITEMS.map((item) => (
            <Card key={item.title} className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold">{item.title}</h3>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>

              {/* 코드 블록 */}
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">
                <code>{item.code}</code>
              </pre>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
