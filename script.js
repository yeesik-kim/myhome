// Firebase 설정 (실제 프로젝트에서는 환경변수 사용 권장)
const firebaseConfig = {
    // Firebase 프로젝트 설정 - 나중에 실제 값으로 교체
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com",
    projectId: "your-project-id"
};

// 전역 변수
let db = null;
let isFirebaseConnected = false;
let votingData = {
    votes: { blue: 0, red: 0, green: 0 },
    votedBallots: new Set()
};

// 로컬 스토리지 키
const VOTING_DATA_KEY = 'voting_system_data';

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeFirebase();
    loadLocalVotingData();
    initializeVotingSystem();
    updateVotingResults();
    showConnectionStatus();
});

// Firebase 초기화
async function initializeFirebase() {
    try {
        // Firebase가 설정되어 있는지 확인
        if (firebaseConfig.apiKey === "your-api-key") {
            console.log('Firebase 설정이 필요합니다. 로컬 저장소를 사용합니다.');
            updateConnectionStatus(false);
            return;
        }

        // Firebase SDK 로드 및 초기화
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
        const { getDatabase, ref, onValue, set, push } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');

        const app = initializeApp(firebaseConfig);
        db = getDatabase(app);
        isFirebaseConnected = true;

        // 실시간 데이터 동기화
        setupRealtimeSync();
        updateConnectionStatus(true);

        console.log('Firebase 연결 성공!');
    } catch (error) {
        console.error('Firebase 연결 실패:', error);
        isFirebaseConnected = false;
        updateConnectionStatus(false);
    }
}

// 실시간 동기화 설정
function setupRealtimeSync() {
    if (!db) return;

    const { ref, onValue } = window.firebase || {};
    if (!ref || !onValue) return;

    const votesRef = ref(db, 'votes');
    onValue(votesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            votingData.votes = data;
            updateVoteCounts();
            updateVotingResults();
        }
    });
}

// 로컬 데이터 불러오기
function loadLocalVotingData() {
    const saved = localStorage.getItem(VOTING_DATA_KEY);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (!isFirebaseConnected) {
                votingData.votes = parsed.votes || { blue: 0, red: 0, green: 0 };
            }
            votingData.votedBallots = new Set(parsed.votedBallots || []);
        } catch (e) {
            console.error('로컬 데이터 로드 실패:', e);
        }
    }
}

// 로컬 데이터 저장
function saveLocalVotingData() {
    const dataToSave = {
        votes: votingData.votes,
        votedBallots: Array.from(votingData.votedBallots)
    };
    localStorage.setItem(VOTING_DATA_KEY, JSON.stringify(dataToSave));
}

// Firebase에 데이터 저장
async function saveToFirebase() {
    if (!db || !isFirebaseConnected) {
        return false;
    }

    try {
        const { ref, set } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
        await set(ref(db, 'votes'), votingData.votes);
        return true;
    } catch (error) {
        console.error('Firebase 저장 실패:', error);
        return false;
    }
}

// 투표 시스템 초기화
function initializeVotingSystem() {
    const ballotPapers = document.querySelectorAll('.ballot-paper');
    const ballotBoxes = document.querySelectorAll('.ballot-box');

    // 투표 완료된 투표용지 상태 복원
    ballotPapers.forEach(paper => {
        const ballotId = paper.getAttribute('data-ballot-id');
        if (votingData.votedBallots.has(ballotId)) {
            markBallotAsVoted(paper);
        }
    });

    // 드래그 이벤트 설정
    ballotPapers.forEach(paper => {
        paper.addEventListener('dragstart', handleDragStart);
        paper.addEventListener('dragend', handleDragEnd);
    });

    // 드롭 이벤트 설정
    ballotBoxes.forEach(box => {
        box.addEventListener('dragover', handleDragOver);
        box.addEventListener('dragenter', handleDragEnter);
        box.addEventListener('dragleave', handleDragLeave);
        box.addEventListener('drop', handleDrop);
    });

    updateVoteCounts();
}

// 드래그 시작
function handleDragStart(e) {
    const ballotId = this.getAttribute('data-ballot-id');

    if (votingData.votedBallots.has(ballotId)) {
        e.preventDefault();
        showNotification('이미 투표가 완료된 투표용지입니다!', 'error');
        return;
    }

    this.classList.add('dragging');
    e.dataTransfer.setData('text/plain', ballotId);
    e.dataTransfer.effectAllowed = 'move';
}

// 드래그 종료
function handleDragEnd(e) {
    this.classList.remove('dragging');
}

// 드래그 오버
function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

// 드래그 진입
function handleDragEnter(e) {
    e.preventDefault();
    this.classList.add('drag-over');
}

// 드래그 떠남
function handleDragLeave(e) {
    if (!this.contains(e.relatedTarget)) {
        this.classList.remove('drag-over');
    }
}

// 드롭 처리
function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');

    const ballotId = e.dataTransfer.getData('text/plain');
    const boxType = this.getAttribute('data-box-type');
    const ballotPaper = document.querySelector(`[data-ballot-id="${ballotId}"]`);

    if (ballotPaper && boxType) {
        processVote(ballotId, boxType, ballotPaper);
    }
}

// 투표 처리
async function processVote(ballotId, boxType, ballotPaper) {
    if (votingData.votedBallots.has(ballotId)) {
        showNotification('이미 투표가 완료된 투표용지입니다!', 'error');
        return;
    }

    ballotPaper.classList.add('dropping');

    setTimeout(async () => {
        // 투표 데이터 업데이트
        votingData.votes[boxType]++;
        votingData.votedBallots.add(ballotId);

        // 투표용지 상태 변경
        markBallotAsVoted(ballotPaper);

        // 데이터 저장 (Firebase 우선, 실패 시 로컬)
        let saved = false;
        if (isFirebaseConnected) {
            saved = await saveToFirebase();
        }

        if (!saved) {
            saveLocalVotingData();
        }

        // UI 업데이트
        if (!isFirebaseConnected) {
            // Firebase가 없으면 로컬에서만 업데이트
            updateVoteCounts();
            updateVotingResults();
        }

        // 성공 알림
        const storageType = isFirebaseConnected ? '서버' : '로컬';
        showNotification(`투표 완료! (${getBoxName(boxType)}) - ${storageType} 저장됨`);

        // 드롭 애니메이션 클래스 제거
        ballotPaper.classList.remove('dropping');
    }, 600);
}

// 투표함 이름 가져오기
function getBoxName(boxType) {
    const names = {
        blue: '파란색',
        red: '빨간색',
        green: '초록색'
    };
    return names[boxType] || '알 수 없는 색';
}

// 투표용지를 투표완료 상태로 마킹
function markBallotAsVoted(ballotPaper) {
    ballotPaper.classList.add('voted');
    ballotPaper.draggable = false;
}

// 투표 수 업데이트
function updateVoteCounts() {
    Object.keys(votingData.votes).forEach(boxType => {
        const box = document.querySelector(`[data-box-type="${boxType}"]`);
        if (box) {
            const countSpan = box.querySelector('.vote-count span');
            if (countSpan) {
                countSpan.textContent = votingData.votes[boxType];
            }
        }
    });
}

// 투표 결과 차트 업데이트
function updateVotingResults() {
    const totalVotes = Object.values(votingData.votes).reduce((sum, count) => sum + count, 0);

    Object.keys(votingData.votes).forEach(boxType => {
        const count = votingData.votes[boxType];
        const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;

        const resultFill = document.querySelector(`[data-result="${boxType}"]`);
        if (resultFill) {
            resultFill.style.width = `${percentage}%`;
        }

        const resultItem = resultFill?.closest('.result-item');
        if (resultItem) {
            const percentageSpan = resultItem.querySelector('.result-percentage');
            if (percentageSpan) {
                percentageSpan.textContent = `${percentage}%`;
            }
        }
    });
}

// 모든 투표 초기화
async function resetAllVotes() {
    if (!confirm('모든 투표를 초기화하시겠습니까?')) {
        return;
    }

    // 데이터 초기화
    votingData.votes = { blue: 0, red: 0, green: 0 };
    votingData.votedBallots.clear();

    // 투표용지 상태 복원
    const ballotPapers = document.querySelectorAll('.ballot-paper');
    ballotPapers.forEach(paper => {
        paper.classList.remove('voted', 'dropping');
        paper.draggable = true;
    });

    // 데이터 저장
    let saved = false;
    if (isFirebaseConnected) {
        saved = await saveToFirebase();
    }

    if (!saved) {
        saveLocalVotingData();
    }

    // UI 업데이트
    if (!isFirebaseConnected) {
        updateVoteCounts();
        updateVotingResults();
    }

    const storageType = isFirebaseConnected ? '서버' : '로컬';
    showNotification(`모든 투표가 초기화되었습니다! (${storageType})`);
}

// 알림 표시
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// 연결 상태 표시
function showConnectionStatus() {
    const statusElement = document.createElement('div');
    statusElement.className = 'connection-status';
    statusElement.innerHTML = `
        <span class="status-dot"></span>
        <span class="status-text">연결 확인 중...</span>
    `;
    document.body.appendChild(statusElement);

    // 전역 참조 저장
    window.connectionStatus = statusElement;
}

// 연결 상태 업데이트
function updateConnectionStatus(isOnline) {
    const statusElement = window.connectionStatus;
    if (!statusElement) return;

    if (isOnline) {
        statusElement.className = 'connection-status online';
        statusElement.innerHTML = `
            <span class="status-dot"></span>
            <span class="status-text">실시간 동기화</span>
        `;
    } else {
        statusElement.className = 'connection-status offline';
        statusElement.innerHTML = `
            <span class="status-dot"></span>
            <span class="status-text">로컬 저장소</span>
        `;
    }
}

// 전역 함수로 노출
window.resetAllVotes = resetAllVotes;

// Firebase 설정 도움말 표시
if (firebaseConfig.apiKey === "your-api-key") {
    console.log(`
🔥 Firebase 설정 방법:

1. Firebase Console (https://console.firebase.google.com) 에서 새 프로젝트 생성
2. Realtime Database 활성화 (테스트 모드로 시작)
3. 프로젝트 설정에서 웹 앱 추가
4. 설정 정보를 script.js 파일의 firebaseConfig에 붙여넣기

현재는 로컬 저장소만 사용됩니다.
    `);
}
