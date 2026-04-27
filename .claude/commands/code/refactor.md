---
description: '지정 파일을 프로젝트 컨벤션에 맞게 리팩토링합니다'
allowed-tools:
  [
    'Read',
    'Write',
    'Bash(git diff:*)',
    'Bash(npx tsc:*)',
    'Bash(npx eslint:*)',
  ]
---

# Claude 명령어: 리팩토링

지정된 파일을 Next.js 15 + TypeScript strict 기준으로 리팩토링합니다.

## 사용법

```
/refactor [파일경로]
/refactor [파일경로] [특정 목표]
```

예시:
- `/refactor src/components/sections/ShowcaseForms.tsx`
- `/refactor src/lib/constants.ts 타입 강화`
- `/refactor src/hooks/useMediaQuery.ts 성능 최적화`

## 리팩토링 프로세스

1. **현재 상태 분석**
   - 파일 읽기 및 이슈 파악
   - `npx tsc --noEmit` 타입 에러 확인
   - `npx eslint [파일]` ESLint 경고 확인

2. **리팩토링 계획 수립**
   다음 항목 기준으로 개선 계획 작성:
   - 타입 안전성 강화 (any 제거, 타입 추론 개선)
   - 컴포넌트 분리 (단일 책임 원칙)
   - 커스텀 훅 추출 (비즈니스 로직 분리)
   - 상수 추출 (매직 넘버 제거)
   - 성능 최적화 (메모이제이션, 지연 로딩)
   - 접근성 개선

3. **사용자 승인**
   - 계획 출력 후 진행 여부 확인
   - 특정 항목만 선택 가능

4. **단계적 리팩토링**
   - 한 번에 한 가지 개선사항씩 적용
   - 각 단계 후 타입 체크 실행

5. **결과 비교**
   - `git diff`로 변경사항 출력
   - 개선된 부분 요약

## 리팩토링 원칙

- 동작 변경 없는 순수 리팩토링
- TypeScript strict 모드 준수
- any 타입 완전 제거
- 한국어 주석 유지/추가
- Tailwind CSS 클래스 정리
- 반응형 동작 보존

## 체크리스트

### TypeScript 안전성
- [ ] `any` 타입 완전 제거
- [ ] 모든 함수에 반환 타입 명시
- [ ] 제네릭 활용 개선
- [ ] `undefined`/`null` 처리 강화

### 코드 품질
- [ ] 함수 길이 30줄 이하 (필요시 분리)
- [ ] 매직 넘버 상수화
- [ ] 중복 코드 추출
- [ ] 한국어 주석 추가

### 성능
- [ ] 불필요한 리렌더링 제거
- [ ] 메모이제이션 적용 검토
- [ ] 번들 크기 영향 평가

### 접근성 & 반응형
- [ ] ARIA 속성 개선
- [ ] 반응형 클래스 정리
- [ ] 다크모드 스타일 검증

## 주의사항

- 리팩토링 전 git status 확인
- 테스트가 있다면 통과 여부 확인
- 대규모 변경 시 단계별 커밋 권장
