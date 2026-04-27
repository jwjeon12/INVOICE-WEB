---
description: 'git 커밋 히스토리를 분석하여 CHANGELOG.md를 생성/업데이트합니다'
allowed-tools:
  [
    'Bash(git log:*)',
    'Bash(git tag:*)',
    'Bash(git describe:*)',
    'Read',
    'Write',
  ]
---

# Claude 명령어: Changelog

git 커밋 히스토리를 분석하여 [Keep a Changelog](https://keepachangelog.com/ko) 포맷의 CHANGELOG.md를 생성합니다.

## 사용법

```
/changelog
/changelog [버전번호]
```

인자 없음: 마지막 태그 이후 모든 커밋 분석
버전 지정: 해당 버전 번호로 섹션 생성

## 프로세스

1. **태그/버전 확인**
   - `git tag --sort=-version:refname`으로 버전 태그 목록 확인
   - 마지막 태그 이후의 커밋 대상으로 분석

2. **커밋 분류**
   이모지/타입별로 분류:
   - **추가 (Added)**: ✨ feat
   - **수정 (Fixed)**: 🐛 fix, 🩹 minor-fix, 🚑️ hotfix
   - **변경 (Changed)**: ♻️ refactor, 💄 style, ⚡ perf
   - **제거 (Removed)**: 🔥 remove, ⚰️ dead-code
   - **보안 (Security)**: 🔒️ security
   - **문서 (Docs)**: 📝 docs

3. **CHANGELOG 포맷**
   ```markdown
   ## [버전] - YYYY-MM-DD
   
   ### 추가
   - 기능 설명 (#PR번호)
   
   ### 수정
   - 버그 수정 내용
   
   ### 변경
   - 리팩토링 내용
   
   ### 제거
   - 제거된 기능
   
   ### 보안
   - 보안 개선사항
   ```

4. **파일 업데이트**
   - CHANGELOG.md 존재 시: 상단에 새 버전 섹션 삽입
   - 없을 시: 새 파일 생성 (헤더 + Unreleased 섹션 포함)

## 규칙

- 모든 내용 한국어 작성
- 버전은 Semantic Versioning (MAJOR.MINOR.PATCH)
- 사용자에게 버전 번호 확인 후 작성
- **Claude 서명 절대 추가하지 않음**

## 기본 구조

새 CHANGELOG.md 생성 시 기본 구조:
```markdown
# Changelog

모든 주요 변경사항은 이 파일에 기록됩니다.

이 프로젝트는 [Keep a Changelog](https://keepachangelog.com/ko)를 따릅니다.

## [Unreleased]

## [버전] - YYYY-MM-DD

...
```

## 참고

- PR 번호는 커밋 메시지에서 추출 (`#123` 형식)
- 날짜는 해당 커밋의 날짜 기준
- Breaking changes는 🔴 마크로 표시 추천
