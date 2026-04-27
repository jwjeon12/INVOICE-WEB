// 개인정보처리방침 페이지
import { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";

export const metadata: Metadata = {
  title: "개인정보처리방침 | Next.js 스타터킷",
  description: "개인정보처리방침",
};

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold">개인정보처리방침</h1>
          <p className="text-sm text-muted-foreground">
            최종 업데이트: {lastUpdated}
          </p>
        </div>

        {/* 내용 */}
        <div className="prose prose-invert dark:prose max-w-none space-y-6">
          {/* 1. 수집하는 개인정보 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold">1. 수집하는 개인정보</h2>
            <p>
              본 웹사이트는 서비스 제공을 위해 다음과 같은 개인정보를 수집할 수
              있습니다:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>이메일 주소</li>
              <li>이름</li>
              <li>전화번호</li>
              <li>서비스 이용 기록</li>
              <li>접속 기록 및 쿠키</li>
            </ul>
          </section>

          {/* 2. 개인정보 이용 목적 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold">2. 개인정보 이용 목적</h2>
            <p>수집한 개인정보는 다음의 목적으로만 이용합니다:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>서비스 제공 및 운영</li>
              <li>고객 상담 및 지원</li>
              <li>마케팅 및 이벤트 안내</li>
              <li>서비스 개선 및 최적화</li>
            </ul>
          </section>

          {/* 3. 개인정보 보유 기간 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold">3. 개인정보 보유 기간</h2>
            <p>
              원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당
              정보를 지체 없이 파기합니다. 단, 관련 법령에 따라 보존이
              필요한 경우는 해당 기간 동안 보존합니다.
            </p>
          </section>

          {/* 4. 개인정보 보호 조치 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold">4. 개인정보 보호 조치</h2>
            <p>
              본 웹사이트는 개인정보의 안전성 확보를 위해 다음과 같은 기술적,
              관리적 조치를 취하고 있습니다:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>데이터 암호화</li>
              <li>접근 제어 및 권한 관리</li>
              <li>정기적인 보안 점검</li>
              <li>보안 인증서 사용</li>
            </ul>
          </section>

          {/* 5. 개인정보 제3자 제공 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold">5. 개인정보 제3자 제공</h2>
            <p>
              본 웹사이트는 이용자의 동의 없이 개인정보를 제3자에게 제공하지
              않습니다. 단, 법령에 의해 요구되는 경우는 예외입니다.
            </p>
          </section>

          {/* 6. 이용자의 권리 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold">6. 이용자의 권리</h2>
            <p>
              이용자는 언제든지 자신의 개인정보에 대해 다음의 권리를 행사할 수
              있습니다:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>개인정보 조회 및 열람</li>
              <li>개인정보 수정 및 삭제</li>
              <li>개인정보 처리 정지</li>
              <li>개인정보 이동 요청</li>
            </ul>
          </section>

          {/* 7. 문의 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold">7. 문의</h2>
            <p>
              개인정보 처리와 관련하여 문의 사항이 있으시면 아래 연락처로
              문의해 주세요:
            </p>
            <div className="rounded-lg bg-muted p-4 text-muted-foreground">
              <p>
                이메일: <code>contact@example.com</code>
              </p>
            </div>
          </section>

          {/* 8. 정책 변경 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold">8. 정책 변경</h2>
            <p>
              본 개인정보처리방침은 법령 변경이나 서비스 정책 변경에 따라
              변경될 수 있습니다. 변경 사항은 이 페이지를 통해 공지합니다.
            </p>
          </section>
        </div>
      </article>
    </PageLayout>
  );
}
