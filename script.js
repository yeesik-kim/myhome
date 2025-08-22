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
