---
name: @notionhq/client v5 API 변경사항
description: v5에서는 databases.query()가 제거되어 notion.search()를 사용해야 함
type: feedback
---

@notionhq/client v5 (5.20.0+)에서는 `notion.databases.query()` 메서드가 제거되었습니다.

**Why:** npm 최신 버전 설치 시 v5가 설치되는데, 이전 문서(v2/v3)의 API와 완전히 다름

**How to apply:**
- 데이터베이스 필터링: `notion.databases.query()` 대신 `notion.search()` 사용
- `notion.databases`에는 `retrieve`, `create`, `update` 메서드만 존재
- 특정 조건 필터링이 필요할 경우 search 결과를 JS에서 직접 필터링
- 타입 임포트 경로: `@notionhq/client/build/src/api-endpoints/common`에서 `PageObjectResponse` 임포트
