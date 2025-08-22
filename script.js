// DOM이 로드되면 초기화 함수 실행
document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
    initializeSmoothScrolling();
    initializeScrollAnimations();
});

// 네비게이션 바 기능 초기화
function initializeNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 햄버거 메뉴 클릭 이벤트
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // 네비게이션 링크 클릭 시 모바일 메뉴 닫기
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 스크롤에 따른 네비게이션 바 스타일 변경
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// 부드러운 스크롤 기능 초기화
function initializeSmoothScrolling() {
    // 네비게이션 링크 클릭 시 부드러운 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 섹션으로 스크롤하는 함수 (CTA 버튼용)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 스크롤 애니메이션 초기화
function initializeScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // 애니메이션을 적용할 요소들 관찰
    const animateElements = document.querySelectorAll('.section-title, .project-card, .contact-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// 타이핑 효과 (선택적으로 사용)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// 페이지 로드 시 실행되는 환영 효과
function welcomeEffect() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    if (heroTitle && heroSubtitle) {
        // 타이틀과 서브타이틀에 지연 애니메이션 추가
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);

        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 600);
    }
}

// 스킬 아이템에 호버 효과 추가
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// 프로젝트 카드 클릭 효과
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 프로젝트 링크가 아닌 카드 자체를 클릭했을 때만 실행
            if (!e.target.classList.contains('project-link')) {
                const link = this.querySelector('.project-link');
                if (link) {
                    // 실제 프로젝트 링크가 있다면 해당 링크로 이동
                    // window.open(link.href, '_blank');
                    console.log('프로젝트 카드 클릭됨:', this.querySelector('h3').textContent);
                }
            }
        });
    });
});

// 페이지 스크롤 진행 표시기 (선택사항)
function createScrollIndicator() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(scrollIndicator);

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollIndicator.style.width = scrolled + '%';
    });
}

// 스크롤 진행 표시기 활성화 (원하면 주석 해제)
// createScrollIndicator();

// 이메일 복사 기능
function copyEmail(email) {
    navigator.clipboard.writeText(email).then(() => {
        // 복사 완료 알림
        showNotification('이메일이 클립보드에 복사되었습니다!');
    }).catch(err => {
        console.error('이메일 복사 실패:', err);
    });
}

// 알림 표시 함수
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// CSS 애니메이션을 위한 스타일 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
`;
document.head.appendChild(style);

// =================================
// VOTING SYSTEM FUNCTIONALITY
// =================================

// 투표 데이터 저장 키
const VOTING_DATA_KEY = 'myhome_voting_data';

// 투표 상태 관리
let votingData = {
    votes: {
        blue: 0,
        red: 0,
        green: 0
    },
    votedBallots: new Set() // 투표 완료된 투표용지 ID들
};

// 페이지 로드 시 투표 시스템 초기화
document.addEventListener('DOMContentLoaded', function() {
    loadVotingData();
    initializeVotingSystem();
    updateVotingResults();
});

// 로컬 스토리지에서 투표 데이터 불러오기
function loadVotingData() {
    const saved = localStorage.getItem(VOTING_DATA_KEY);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            votingData.votes = parsed.votes || { blue: 0, red: 0, green: 0 };
            votingData.votedBallots = new Set(parsed.votedBallots || []);
        } catch (e) {
            console.error('투표 데이터 로드 실패:', e);
        }
    }
}

// 투표 데이터를 로컬 스토리지에 저장
function saveVotingData() {
    const dataToSave = {
        votes: votingData.votes,
        votedBallots: Array.from(votingData.votedBallots)
    };
    localStorage.setItem(VOTING_DATA_KEY, JSON.stringify(dataToSave));
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

    // 투표 수 표시 업데이트
    updateVoteCounts();
}

// 드래그 시작
function handleDragStart(e) {
    const ballotId = this.getAttribute('data-ballot-id');

    // 이미 투표한 투표용지는 드래그 불가
    if (votingData.votedBallots.has(ballotId)) {
        e.preventDefault();
        showNotification('이미 투표가 완료된 투표용지입니다!');
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

// 드래그 오버 (드롭 허용)
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
    // 자식 요소로 이동하는 경우 무시
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
        // 투표 처리
        processVote(ballotId, boxType, ballotPaper);
    }
}

// 투표 처리
function processVote(ballotId, boxType, ballotPaper) {
    // 이미 투표한 경우 체크
    if (votingData.votedBallots.has(ballotId)) {
        showNotification('이미 투표가 완료된 투표용지입니다!');
        return;
    }

    // 드롭 애니메이션 실행
    ballotPaper.classList.add('dropping');

    // 애니메이션 완료 후 처리
    setTimeout(() => {
        // 투표 데이터 업데이트
        votingData.votes[boxType]++;
        votingData.votedBallots.add(ballotId);

        // 투표용지 상태 변경
        markBallotAsVoted(ballotPaper);

        // 데이터 저장
        saveVotingData();

        // UI 업데이트
        updateVoteCounts();
        updateVotingResults();

        // 성공 알림
        showNotification(`투표가 완료되었습니다! (${getBoxName(boxType)})`);

        // 드롭 애니메이션 클래스 제거
        ballotPaper.classList.remove('dropping');
    }, 600);
}

// 투표함 이름 가져오기
function getBoxName(boxType) {
    const names = {
        blue: '파란색 투표함',
        red: '빨간색 투표함',
        green: '초록색 투표함'
    };
    return names[boxType] || '알 수 없는 투표함';
}

// 투표용지를 투표완료 상태로 마킹
function markBallotAsVoted(ballotPaper) {
    ballotPaper.classList.add('voted');
    ballotPaper.draggable = false;
    ballotPaper.setAttribute('title', '투표 완료');
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

        // 결과 바 업데이트
        const resultFill = document.querySelector(`[data-result="${boxType}"]`);
        if (resultFill) {
            resultFill.style.width = `${percentage}%`;
        }

        // 퍼센티지 텍스트 업데이트
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
function resetAllVotes() {
    if (confirm('모든 투표를 초기화하시겠습니까?')) {
        // 데이터 초기화
        votingData.votes = { blue: 0, red: 0, green: 0 };
        votingData.votedBallots.clear();

        // 투표용지 상태 복원
        const ballotPapers = document.querySelectorAll('.ballot-paper');
        ballotPapers.forEach(paper => {
            paper.classList.remove('voted', 'dropping');
            paper.draggable = true;
            paper.removeAttribute('title');
        });

        // 데이터 저장
        saveVotingData();

        // UI 업데이트
        updateVoteCounts();
        updateVotingResults();

        showNotification('모든 투표가 초기화되었습니다!');
    }
}

// 투표 통계 정보 표시
function showVotingStats() {
    const totalVotes = Object.values(votingData.votes).reduce((sum, count) => sum + count, 0);
    const completedBallots = votingData.votedBallots.size;
    const totalBallots = document.querySelectorAll('.ballot-paper').length;

    console.log('=== 투표 통계 ===');
    console.log(`총 투표 수: ${totalVotes}`);
    console.log(`완료된 투표용지: ${completedBallots}/${totalBallots}`);
    console.log(`파란색: ${votingData.votes.blue}표`);
    console.log(`빨간색: ${votingData.votes.red}표`);
    console.log(`초록색: ${votingData.votes.green}표`);
}

// 개발자 도구용 함수들을 전역에 노출
window.votingSystem = {
    showStats: showVotingStats,
    resetVotes: resetAllVotes,
    getData: () => votingData
};
