// 이용약관 페이지
import { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";

export const metadata: Metadata = {
  title: "이용약관 | Next.js 스타터킷",
  description: "이용약관",
};

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PageLayout>
      <article className="max-w-3xl space-y-8 py-8">
        {/* 페이지 헤더 */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">이용약관</h1>
          <p className="text-sm text-muted-foreground">
            최종 업데이트: {lastUpdated}
          </p>
        </div>

        {/* 내용 */}
        <div className="prose prose-invert dark:prose max-w-none space-y-6">
          {/* 1. 약관의 목적 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold">1. 약관의 목적</h2>
            <p>
              본 약관은 Next.js 스타터킷(이하 "서비스")의 이용과 관련하여
              필요한 사항을 규정하며, 이용자와 운영자 간의 권리와 의무 관계를
              명확히 하기 위해 제정되었습니다.
            </p>
          </section>

          {/* 2. 서비스 이용 조건 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold">2. 서비스 이용 조건</h2>
            <p>
              본 서비스는 관계 법령을 준수하며, 이용자는 다음 행위를 해서는
              안 됩니다:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                법령 또는 약관을 위반하는 행위 및 범죄에 해당하는 행위
              </li>
              <li>
                서버에 과부하를 주는 행위, 불법적인 접근 시도
              </li>
              <li>다른 이용자의 정보를 도용하거나 악용하는 행위</li>
              <li>명예훼손, 모욕, 협박 등의 행위</li>
              <li>저작권 침해 행위</li>
              <li>불법적인 상업 목적의 이용</li>
            </ul>
          </section>

          {/* 3. 지적 재산권 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold">3. 지적 재산권</h2>
            <p>
              본 서비스에 포함된 모든 콘텐츠(텍스트, 이미지, 코드, 디자인 등)는
              저작권법에 의해 보호됩니다. 이용자가 본 서비스를 이용함으로써
              얻은 정보는 개인적 목적으로만 사용할 수 있습니다.
            </p>
          </section>

          {/* 4. 서비스 이용료 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold">4. 서비스 이용료</h2>
            <p>
              본 서비스는 무료로 제공됩니다. 단, 향후 유료 서비스가 추가될 경우
              별도의 공지를 통해 안내될 것입니다.
            </p>
          </section>

          {/* 5. 면책 조항 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold">5. 면책 조항</h2>
            <p>
              운영자는 다음 사항에 대해 책임을 지지 않습니다:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>불가항력적인 사유로 인한 서비스 이용 곤란</li>
              <li>
                이용자가 본 서비스에서 제공하는 정보를 이용함으로 인한 손해
              </li>
              <li>이용자 간의 분쟁으로 인한 손해</li>
              <li>제3자의 행위로 인한 손해</li>
            </ul>
          </section>

          {/* 6. 서비스 변경 및 중단 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold">6. 서비스 변경 및 중단</h2>
            <p>
              운영자는 기술적 문제, 유지보수, 또는 기타 사유로 서비스를 변경하거나
              중단할 수 있으며, 이에 대해 사전 공지를 할 수 있습니다.
            </p>
          </section>

          {/* 7. 약관의 개정 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold">7. 약관의 개정</h2>
            <p>
              운영자는 관계 법령의 변경에 따라 약관을 변경할 수 있습니다. 변경된
              약관은 공지일로부터 유효하며, 이용자가 계속 서비스를 이용하는 것은
              변경된 약관에 동의하는 것으로 간주됩니다.
            </p>
          </section>

          {/* 8. 준거법 및 관할 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold">8. 준거법 및 관할</h2>
            <p>
              본 약관은 대한민국의 법령을 준거법으로 합니다. 약관 해석 및 이행에
              관한 분쟁은 대한민국의 관할 법원에 제소합니다.
            </p>
          </section>

          {/* 9. 문의 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold">9. 문의</h2>
            <p>
              약관과 관련하여 문의 사항이 있으신 경우 아래 연락처로 문의해 주세요:
            </p>
            <div className="rounded-lg bg-muted p-4 text-muted-foreground">
              <p>
                이메일: <code>contact@example.com</code>
              </p>
            </div>
          </section>
        </div>
      </article>
    </PageLayout>
  );
}
