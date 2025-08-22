# MyHome - GitHub Pages 프로토타입

개인 홈페이지 프로토타입입니다. GitHub Pages로 배포 가능한 정적 웹사이트입니다.

## 📁 파일 구조

```
myhome/
├── index.html      # 메인 HTML 파일
├── styles.css      # 스타일시트
├── script.js       # JavaScript 기능
└── README.md       # 프로젝트 설명
```

## 🚀 GitHub Pages 배포 방법

1. **GitHub 저장소 설정**
   ```bash
   git add .
   git commit -m "Initial commit: Add homepage prototype"
   git push origin main
   ```

2. **GitHub Pages 활성화**
   - GitHub 저장소 → Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / (root)
   - Save 클릭

3. **배포 완료**
   - 몇 분 후 `https://[username].github.io/myhome` 에서 확인 가능

## ✨ 기능

- **반응형 디자인**: 모바일/태블릿/데스크톱 최적화
- **부드러운 애니메이션**: CSS 애니메이션과 스크롤 효과
- **네비게이션**: 부드러운 스크롤과 모바일 햄버거 메뉴
- **현대적인 UI**: 그라디언트와 카드 디자인
- **인터랙티브 요소**: 호버 효과와 클릭 이벤트

## 🛠 커스터마이징

### 개인 정보 수정
- `index.html`에서 텍스트 내용 수정
- 연락처 정보 및 소셜 링크 업데이트

### 스타일 변경
- `styles.css`에서 색상, 폰트, 레이아웃 수정
- CSS 변수를 사용하여 테마 색상 쉽게 변경

### 기능 추가
- `script.js`에서 새로운 인터랙션 추가
- 프로젝트 카드에 실제 링크 연결

## 🎨 디자인 특징

- **색상**: 보라색 그라디언트 (`#667eea` → `#764ba2`)
- **폰트**: Noto Sans KR (한글 최적화)
- **애니메이션**: fadeInUp, 호버 효과, 스크롤 애니메이션
- **레이아웃**: CSS Grid, Flexbox 활용

## 📱 모바일 최적화

- 반응형 네비게이션 (햄버거 메뉴)
- 터치 친화적인 버튼 크기
- 모바일 우선 디자인 접근

---

💡 **Tip**: GitHub Pages는 정적 파일만 지원하므로, 서버 사이드 기능이 필요한 경우 Netlify, Vercel 등을 고려하세요.
