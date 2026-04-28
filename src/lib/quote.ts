// 견적서 데이터 조회 유틸리티
// Notion 데이터베이스에서 견적서 데이터를 가져오고 변환하는 서버 사이드 함수 모음
// 클라이언트 컴포넌트에서 직접 임포트 금지

import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints/common";
import { getNotionClient, validateDatabaseId } from "./notion";
import { NOTION_DATABASE_ID } from "./constants";
import { quoteSchema } from "./validations";
import type { Quote, QuoteItem } from "./validations";

// Notion 페이지의 rich_text 프로퍼티에서 평문 텍스트 추출
function extractRichText(
  property: PageObjectResponse["properties"][string]
): string {
  if (property.type !== "rich_text") return "";
  return property.rich_text.map((block) => block.plain_text).join("");
}

// Notion 페이지의 title 프로퍼티에서 평문 텍스트 추출
function extractTitle(
  property: PageObjectResponse["properties"][string]
): string {
  if (property.type !== "title") return "";
  return property.title.map((block) => block.plain_text).join("");
}

// Notion 페이지의 number 프로퍼티에서 숫자 추출
function extractNumber(
  property: PageObjectResponse["properties"][string]
): number {
  if (property.type !== "number") return 0;
  return property.number ?? 0;
}

// Notion 페이지의 date 프로퍼티에서 날짜 문자열 추출
function extractDate(
  property: PageObjectResponse["properties"][string]
): string {
  if (property.type !== "date") return "";
  return property.date?.start ?? "";
}

// Notion 페이지의 select 프로퍼티에서 선택값 추출
function extractSelect(
  property: PageObjectResponse["properties"][string]
): string {
  if (property.type !== "select") return "";
  return property.select?.name ?? "";
}

// Notion 페이지를 Quote 타입으로 변환하는 함수
// Notion 데이터 구조가 변경되면 이 함수만 수정하면 됨
function mapNotionPageToQuote(page: PageObjectResponse): Quote {
  const props = page.properties;

  // 견적서 항목은 JSON 텍스트 형식으로 Notion 텍스트 필드에 저장 가정
  // 실제 Notion DB 구조에 맞게 파싱 로직 수정 필요
  const itemsRaw = extractRichText(
    props["items"] ?? { type: "rich_text", rich_text: [] }
  );
  let items: QuoteItem[] = [];

  try {
    // JSON 형식으로 저장된 항목 목록 파싱
    items = JSON.parse(itemsRaw) as QuoteItem[];
  } catch {
    // 파싱 실패 시 빈 배열 유지
    items = [];
  }

  const rawQuote = {
    id: page.id,
    token: extractRichText(
      props["token"] ?? { type: "rich_text", rich_text: [] }
    ),
    title: extractTitle(
      props["title"] ?? { type: "title", title: [] }
    ),
    clientName: extractRichText(
      props["clientName"] ?? { type: "rich_text", rich_text: [] }
    ),
    issuerName: extractRichText(
      props["issuerName"] ?? { type: "rich_text", rich_text: [] }
    ),
    issuedAt: extractDate(
      props["issuedAt"] ?? { type: "date", date: null }
    ),
    validUntil:
      extractDate(props["validUntil"] ?? { type: "date", date: null }) ||
      undefined,
    status: extractSelect(
      props["status"] ?? { type: "select", select: null }
    ),
    items,
    totalAmount: extractNumber(
      props["totalAmount"] ?? { type: "number", number: 0 }
    ),
    notes:
      extractRichText(
        props["notes"] ?? { type: "rich_text", rich_text: [] }
      ) || undefined,
  };

  // Zod 스키마로 데이터 검증 후 반환
  return quoteSchema.parse(rawQuote);
}

// 토큰으로 견적서 단일 조회
// 공개 URL에서 토큰을 받아 해당 견적서를 반환
// @notionhq/client v5에서는 databases.query 대신 search API 사용
export async function getQuoteByToken(token: string): Promise<Quote | null> {
  validateDatabaseId(NOTION_DATABASE_ID);
  const notion = getNotionClient();

  try {
    // Notion v5 search API로 token 프로퍼티가 일치하는 견적서 조회
    // filter는 제목 기반이므로, 전체 결과를 가져와 token으로 필터링
    const response = await notion.search({
      filter: { property: "object", value: "page" },
      page_size: 100,
    });

    // token 프로퍼티가 일치하는 페이지만 추출
    const matchedPage = response.results.find((result) => {
      if (result.object !== "page") return false;
      const page = result as PageObjectResponse;
      const tokenProp = page.properties["token"];
      if (!tokenProp || tokenProp.type !== "rich_text") return false;
      const tokenValue = tokenProp.rich_text
        .map((block) => block.plain_text)
        .join("");
      return tokenValue === token;
    });

    if (!matchedPage) {
      return null;
    }

    return mapNotionPageToQuote(matchedPage as PageObjectResponse);
  } catch (error) {
    // Notion API 오류는 상위로 전파하지 않고 null 반환
    console.error("견적서 조회 실패:", error);
    return null;
  }
}
