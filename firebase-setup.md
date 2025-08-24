# 🔥 Firebase 설정 가이드

실시간 서버 저장을 위해 Firebase를 설정하는 방법입니다.

## 1️⃣ Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com) 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: `voting-system`)
4. Google Analytics 설정 (선택사항)
5. "프로젝트 만들기" 완료

## 2️⃣ Realtime Database 설정

1. Firebase Console에서 프로젝트 선택
2. 좌측 메뉴에서 "Realtime Database" 클릭
3. "데이터베이스 만들기" 클릭
4. **중요**: 보안 규칙을 "테스트 모드에서 시작" 선택
5. 지역 선택 (asia-southeast1 권장)

### 보안 규칙 설정 (선택사항)
```json
{
  "rules": {
    "votes": {
      ".read": true,
      ".write": true
    }
  }
}
```

## 3️⃣ 웹 앱 등록

1. Firebase Console 프로젝트 개요에서 "</>" (웹) 아이콘 클릭
2. 앱 닉네임 입력 (예: `voting-web-app`)
3. "Firebase 호스팅도 설정합니다" **체크 해제**
4. "앱 등록" 클릭

## 4️⃣ 설정 정보 복사

다음과 같은 설정 정보가 표시됩니다:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefg"
};
```

## 5️⃣ script.js 파일 수정

`script.js` 파일의 맨 위쪽에서 다음 부분을 찾아서:

```javascript
const firebaseConfig = {
    // Firebase 프로젝트 설정 - 나중에 실제 값으로 교체
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com",
    projectId: "your-project-id"
};
```

위에서 복사한 실제 설정 정보로 교체합니다.

## ✅ 설정 완료!

설정이 완료되면:

- 🌍 **실시간 동기화**: 모든 사용자가 같은 투표 결과 확인
- 💾 **서버 저장**: 브라우저 변경해도 투표 결과 유지
- 👥 **다중 사용자**: 여러 명이 동시에 투표 가능
- 🔄 **자동 백업**: Firebase가 자동으로 데이터 백업

## 🔧 문제 해결

### 연결 오류가 발생하는 경우:
1. Firebase 설정 정보가 정확한지 확인
2. Realtime Database가 활성화되어 있는지 확인
3. 보안 규칙이 올바른지 확인
4. 브라우저 개발자 도구에서 오류 메시지 확인

### 데이터가 저장되지 않는 경우:
1. Realtime Database 보안 규칙 확인
2. 네트워크 연결 상태 확인
3. Firebase 프로젝트 결제 상태 확인 (무료 할당량 초과 시)

## 💡 참고 사항

- Firebase Realtime Database 무료 플랜: 월 1GB 전송량
- 간단한 투표 시스템으로는 무료 한도 내에서 충분히 사용 가능
- 프로덕션 환경에서는 보안 규칙을 더 엄격하게 설정 권장
