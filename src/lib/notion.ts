// Notion API 클라이언트 초기화 및 기본 설정
// @notionhq/client 패키지를 사용한 서버 사이드 전용 모듈
// 클라이언트 컴포넌트에서 직접 임포트 금지 - API 키 노출 위험

import { Client } from "@notionhq/client";
import { NOTION_API_KEY } from "./constants";

// Notion 클라이언트 싱글톤 인스턴스
// 서버 사이드에서만 사용 (API 키 보호)
let notionClient: Client | null = null;

// Notion 클라이언트 인스턴스를 반환하는 팩토리 함수
// 환경 변수가 없으면 에러를 throw하여 잘못된 설정을 조기에 감지
export function getNotionClient(): Client {
  if (!NOTION_API_KEY) {
    throw new Error(
      "NOTION_API_KEY 환경 변수가 설정되지 않았습니다. .env.local 파일을 확인해주세요."
    );
  }

  // 싱글톤 패턴: 이미 생성된 클라이언트가 있으면 재사용
  if (!notionClient) {
    notionClient = new Client({ auth: NOTION_API_KEY });
  }

  return notionClient;
}

// Notion 데이터베이스 ID 검증 함수
export function validateDatabaseId(databaseId: string): void {
  if (!databaseId) {
    throw new Error(
      "NOTION_DATABASE_ID 환경 변수가 설정되지 않았습니다. .env.local 파일을 확인해주세요."
    );
  }
}
