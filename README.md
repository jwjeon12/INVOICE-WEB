# 노션 기반 견적서 웹 조회 & PDF 다운로드 시스템

Notion에서 관리하는 견적서 데이터를 클라이언트가 웹에서 확인하고 PDF로 다운로드할 수 있는 모던 웹 애플리케이션입니다.

## 🎯 프로젝트 개요

**목적**: 프리랜서/소상공인이 Notion에 입력한 견적서를 클라이언트가 웹 링크로 간편하게 확인하고 PDF로 저장할 수 있도록 지원

**주요 기능**
- 🔗 Notion 데이터베이스 실시간 연동
- 🌐 공개 웹 기반 견적서 조회 (인증 불필요)
- 📥 한 클릭 PDF 다운로드
- 📱 반응형 디자인 (모바일/태블릿/데스크톱)
- ✨ 모던 UI (shadcn/ui + Tailwind CSS)

## 🛠️ 기술 스택

### 프론트엔드
- **Next.js 16** (App Router)
- **React 19** (최신 동시성 기능)
- **TypeScript 5.6+** (타입 안전성)
- **Tailwind CSS v4** (유틸리티 CSS)
- **shadcn/ui** (고품질 컴포넌트)
- **Lucide React** (아이콘)

### 백엔드 & 데이터
- **Notion API** (`@notionhq/client`) - 견적서 데이터 조회
- **React PDF** (`@react-pdf/renderer`) - 서버사이드 PDF 생성
- **Zod** - 데이터 검증

### 배포
- **Vercel** - Next.js 최적화 배포 플랫폼

## 📋 프로젝트 구조

```
src/
├── app/                         # Next.js 앱 라우터
│   ├── layout.tsx              # 루트 레이아웃 (ThemeProvider, Toaster)
│   ├── page.tsx                # 홈 페이지
│   ├── quote/
│   │   └── [token]/            # 동적 라우트 (견적서 조회)
│   │       └── page.tsx
│   ├── globals.css             # 전역 스타일
│   └── api/                    # API 라우트 (필요 시)
├── components/                 # 재사용 가능한 컴포넌트
│   ├── ui/                     # shadcn/ui 컴포넌트
│   ├── layout/                 # 페이지 레이아웃 (Header, Footer)
│   ├── QuoteViewer.tsx         # 견적서 표시
│   └── PDFDownloadButton.tsx   # PDF 다운로드 버튼
├── hooks/                      # 커스텀 React 훅
├── lib/
│   ├── notion.ts              # Notion 클라이언트
│   ├── utils.ts               # 유틸리티 함수
│   ├── constants.ts           # 상수 정의
│   └── validations.ts         # Zod 스키마
└── docs/
    └── PRD.md                 # MVP 제품 명세서
```

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.17+ 또는 20+
- npm 또는 yarn
- Notion 통합 토큰 (Integration Token)
- Notion 데이터베이스 ID

### 설치 및 실행

1. **저장소 클론**
```bash
git clone https://github.com/your-username/invoice-web.git
cd invoice-web
```

2. **의존성 설치**
```bash
npm install
```

3. **환경변수 설정** (.env.local 생성)
```env
NOTION_API_KEY=secret_xxxxx
NOTION_DATABASE_ID=xxxxx
```

4. **개발 서버 실행**
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

### Notion 통합 설정

1. [Notion Integration 생성](https://www.notion.so/my-integrations)
2. 새로운 Internal Integration 생성
3. "Secrets" 탭에서 Internal Integration Token 복사
4. Notion 데이터베이스에 Integration 권한 부여
5. 데이터베이스 ID 확인 (URL에서 추출)

### 데이터베이스 스키마

Notion 데이터베이스는 다음 필드를 포함해야 합니다:

| 필드명 | 타입 | 설명 |
|-------|------|------|
| 제목 | Title | 견적서 제목 |
| 클라이언트명 | Text | 고객 이름 |
| 견적 항목 | Text/Relation | 서비스 목록 |
| 합계금액 | Number | 총 금액 |
| 발행일 | Date | 발행 날짜 |
| 만료일 | Date | 유효 기간 |
| 상태 | Select | draft/sent/accepted/declined |

## 📝 사용 가능한 명령어

```bash
npm run dev      # 개발 서버 시작 (port 3000)
npm run build    # 프로덕션 빌드 생성
npm run start    # 프로덕션 빌드 실행
npm run lint     # ESLint 코드 검사
```

## 📚 주요 문서

- **[MVP 명세서](./docs/PRD.md)** - 프로젝트 기능 및 요구사항
- **[CLAUDE.md](./.claude/CLAUDE.md)** - 개발 가이드 및 컨벤션

## 🧠 AI 개발 도구

이 프로젝트는 Claude Code와 다음 AI 에이전트를 활용하여 개발됩니다:

- **@notion-api-expert** - Notion API 통합 전문가
- **@prd-generator** - 제품 명세서 생성
- **@prd-validator** - 기술 검증

## 🔒 환경 보안

- `.env.local` 파일은 `.gitignore`에 포함되어 커밋되지 않습니다
- Notion API 키는 환경변수로만 관리하세요
- 프로덕션 배포 시 Vercel Environment Variables에서 설정하세요

## 📦 의존성

### 주요 패키지
- `next@16` - React 풀스택 프레임워크
- `react@19` - UI 라이브러리
- `@notionhq/client@^2` - Notion API
- `@react-pdf/renderer@^3` - PDF 생성
- `zod@^3` - 데이터 검증
- `tailwindcss@^4` - CSS 프레임워크
- `shadcn-ui` - UI 컴포넌트

자세한 내용은 `package.json` 참조

## 🤝 기여하기

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m '✨ feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포할 수 있습니다

## 📧 연락처

- 개발자: jwjeon@toss.im
- Issues: [GitHub Issues](https://github.com/your-username/invoice-web/issues)

---

**Made with ❤️ using Claude Code**
