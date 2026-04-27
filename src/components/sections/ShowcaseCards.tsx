// 카드, 배지, 아바타 쇼케이스
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heading } from "./Heading";

export function ShowcaseCards() {
  return (
    <section className="space-y-8">
      <Heading
        title="카드 컴포넌트"
        description="배지, 아바타를 포함한 다양한 카드 레이아웃"
      />

      {/* 카드 그리드 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "기본 카드", desc: "CardHeader + CardContent 구조" },
          { title: "배지 포함", desc: "상태 표시용 배지" },
          { title: "아바타 포함", desc: "사용자 프로필 표시" },
        ].map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {item.title}
                <Badge variant={index === 1 ? "secondary" : "default"}>
                  {index === 0 ? "New" : index === 1 ? "Beta" : "Popular"}
                </Badge>
              </CardTitle>
              <CardDescription>{item.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  shadcn/ui 카드 컴포넌트의 다양한 활용 방법을 보여줍니다.
                </p>

                {/* 아바타 예제 */}
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">사용자 이름</p>
                    <p className="text-xs text-muted-foreground">user@example.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 배지 쇼케이스 */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">배지 Variant</h3>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </div>
    </section>
  );
}
