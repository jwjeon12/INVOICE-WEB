import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @react-pdf/renderer는 브라우저 전용 패키지
  // 서버 사이드 번들에 포함되면 Canvas 관련 오류가 발생하므로 제외
  serverExternalPackages: ["@react-pdf/renderer"],
};

export default nextConfig;
