---
description: '프로젝트 컨벤션에 맞는 커스텀 React 훅을 생성합니다'
allowed-tools:
  [
    'Read',
    'Write',
    'Bash(ls:*)',
  ]
---

# Claude 명령어: 커스텀 훅 생성

React 19 + TypeScript strict 모드에 맞는 커스텀 훅을 생성합니다.

## 사용법

```
/hook [훅이름] [설명]
```

예시:
- `/hook useDebounce 입력값 디바운싱 훅`
- `/hook useFetch API 데이터 페칭 훅`
- `/hook useIntersectionObserver 스크롤 교차점 감지 훅`

## 생성 프로세스

1. **기존 훅 패턴 분석**
   - `src/hooks/` 파일들의 구조 확인
   - usehooks-ts 사용 여부 결정

2. **훅 구조 규칙**
   ```typescript
   // [훅 설명] 훅
   // SSR 안전성 여부 명시
   
   /**
    * [훅 기능 설명]
    * @param [파라미터명] - [파라미터 설명]
    * @returns [반환값 설명]
    */
   export function use[Name]<T>(param: ParamType): ReturnType {
     // 구현
   }
   ```

3. **SSR 안전성 체크리스트**
   - `window`, `document` 직접 접근 금지
   - `useEffect` 내에서만 브라우저 API 사용
   - `initializeWithValue: false` 패턴 고려

4. **index.ts 업데이트**
   - `src/hooks/index.ts`에 export 추가

5. **타입 안전성**
   - 제네릭 타입 적극 활용
   - any 타입 절대 금지
   - 반환 타입 명시적 정의

## 규칙

- 파일명: camelCase (use로 시작)
- SSR 호환성 필수 고려
- JSDoc 한국어 주석 필수
- 에러 처리 포함
- TypeScript strict 모드 준수

## 참고

- 기존 훅 패턴: `src/hooks/useMediaQuery.ts`, `src/hooks/useLocalStorage.ts`
- usehooks-ts 라이브러리 활용 가능
- 배럴 export 관리: `src/hooks/index.ts`
