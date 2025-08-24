# 🗳️ 드래그 앤 드롭 투표 시스템

GitHub Pages로 배포된 인터랙티브한 투표 시스템입니다. 투표용지를 드래그해서 투표함에 넣는 직관적인 UI를 제공합니다.

## 🌐 라이브 데모

**👉 [https://yeesik-kim.github.io/myhome/](https://yeesik-kim.github.io/myhome/)**

## 📁 파일 구조

```
myhome/
├── index.html          # 메인 HTML 구조
├── styles.css          # CSS 스타일시트 
├── script.js           # JavaScript 로직 (Firebase 연동 포함)
├── firebase-setup.md   # Firebase 설정 가이드
└── README.md           # 프로젝트 설명
```

## ✨ 주요 기능

### 🎯 **드래그 앤 드롭 투표**
- 투표용지를 마우스로 드래그해서 투표함에 드롭
- 실시간 시각적 피드백 (드래그 시 회전, 투표함 하이라이트)
- 부드러운 드롭 애니메이션 효과

### 💾 **이중 저장 시스템**
- **Firebase**: 실시간 서버 동기화 (모든 사용자 공유)
- **localStorage**: 로컬 백업 (Firebase 연결 실패 시)
- 페이지 새로고침 후에도 투표 상태 유지
- 투표 완료된 투표용지는 재투표 불가

### 📊 **실시간 동기화 결과**
- **다중 사용자 실시간 동기화** (Firebase 연결 시)
- 투표할 때마다 모든 사용자에게 즉시 반영
- 시각적 결과 차트 (퍼센티지 바)
- 각 투표함별 투표 수 표시
- 연결 상태 표시 (서버/로컬)

### 🔒 **투표 완료 상태 관리**
- 투표 완료 시 "✓ 투표완료" 마킹
- 완료된 투표용지는 회색으로 변경
- 중복 투표 방지 시스템

## 🎮 사용 방법

1. **투표하기**: 투표용지를 원하는 색깔 투표함으로 드래그
2. **결과 확인**: 하단의 실시간 투표 결과 차트 확인
3. **초기화**: "투표 초기화" 버튼으로 모든 투표 리셋

## 🎨 디자인 특징

- **색상**: 보라-파랑 그라디언트 배경 (`#667eea` → `#764ba2`)
- **폰트**: Noto Sans KR (한글 최적화)
- **애니메이션**: 드래그 회전, 드롭 애니메이션, 호버 효과
- **레이아웃**: CSS Grid를 활용한 반응형 디자인

## 📱 반응형 지원

- 데스크톱, 태블릿, 모바일 모든 화면 크기 지원
- 모바일에서도 터치 드래그 가능
- 화면 크기에 따른 레이아웃 자동 조정

## 🚀 배포 방법

GitHub Pages로 자동 배포됩니다:

```bash
git add .
git commit -m "투표 시스템 업데이트"
git push origin main
```

## 🚀 Firebase 서버 연동

### 실시간 동기화 기능
- 모든 사용자가 같은 투표 결과를 실시간으로 확인
- 다중 사용자 환경에서 동시 투표 가능
- 브라우저/기기 변경 시에도 투표 결과 유지

### 설정 방법
자세한 Firebase 설정은 [`firebase-setup.md`](firebase-setup.md) 참조

1. [Firebase Console](https://console.firebase.google.com)에서 프로젝트 생성
2. Realtime Database 활성화
3. 웹 앱 등록 및 설정 정보 복사
4. `script.js`의 `firebaseConfig` 수정

## 💻 기술 스택

- **HTML5**: 시맨틱 마크업 및 드래그 앤 드롭 API
- **CSS3**: 플렉스박스, 그리드, 애니메이션, 반응형 디자인
- **JavaScript**: ES6+ 모듈, 비동기 처리, localStorage
- **Firebase**: Realtime Database를 통한 실시간 동기화
- **GitHub Pages**: 정적 사이트 자동 배포

---

💡 **Note**: Firebase 설정 없이도 localStorage로 로컬 저장은 정상 동작합니다. Firebase 연결 시 서버 저장으로 자동 업그레이드됩니다.
