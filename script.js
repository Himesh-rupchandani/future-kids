/* ============================
   Future Kids - Enhanced JS
   ============================ */

document.addEventListener('DOMContentLoaded', function () {

    // ===== Generate sparkles =====
    const sparkleContainer = document.getElementById('sparkles');
    if (sparkleContainer) {
        for (let i = 0; i < 25; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 3 + 's';
            sparkle.style.animationDuration = (2 + Math.random() * 3) + 's';
            const colors = ['#FACC15', '#06B6D4', '#EC4899', '#A855F7', '#22C55E'];
            sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
            sparkle.style.boxShadow = `0 0 10px ${sparkle.style.background}`;
            sparkleContainer.appendChild(sparkle);
        }
    }

    // ===== Mobile Menu =====
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }

    // ===== Scroll to Top =====
    const scrollTopBtn = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.remove('opacity-0', 'invisible');
            scrollTopBtn.classList.add('opacity-100', 'visible');
        } else {
            scrollTopBtn.classList.add('opacity-0', 'invisible');
            scrollTopBtn.classList.remove('opacity-100', 'visible');
        }
    });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // ===== Smooth Scroll =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = document.getElementById('navbar')?.offsetHeight || 70;
                const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

    // ===== Counter Animation =====
    const counters = document.querySelectorAll('.stat-counter');
    let countersStarted = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            const update = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                    counter.style.animation = 'pop 0.3s ease';
                }
            };
            update();
        });
    }

    const statsSection = document.querySelector('.stats-gradient');
    if (statsSection) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    animateCounters();
                    countersStarted = true;
                }
            });
        }, { threshold: 0.3 });
        obs.observe(statsSection);
    }

    // ===== Scroll Reveal =====
    const revealEls = document.querySelectorAll('.program-card, .partner-item, .testi-card, .stat-card, .model-card, .step-card, .bpl-card, .mission-card');
    revealEls.forEach((el, i) => {
        el.classList.add('reveal-el');
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s cubic-bezier(0.175,0.885,0.32,1.275) ${(i % 4) * 0.1}s`;
    });

    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-el').forEach(el => revealObs.observe(el));

    // ===== Navbar shadow =====
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.style.boxShadow = window.scrollY > 20
            ? '0 4px 30px rgba(0,0,0,0.08)'
            : '0 1px 3px rgba(0,0,0,0.08)';
    });

    // ===== Tilt effect on program cards =====
    document.querySelectorAll('.program-card, .testi-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ===== Add pop keyframe dynamically =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pop { 0% { transform: scale(1); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
        .reveal-el { will-change: transform, opacity; }
    `;
    document.head.appendChild(style);

    // ===== Click effect on CTA buttons =====
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.type === 'submit') return;
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255,255,255,0.4);
                border-radius: 50%;
                pointer-events: none;
                width: 100px; height: 100px;
                left: ${e.clientX - rect.left - 50}px;
                top: ${e.clientY - rect.top - 50}px;
                transform: scale(0);
                animation: rippleAnim 0.6s ease-out;
            `;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleAnim {
            to { transform: scale(4); opacity: 0; }
        }
    `;
    document.head.appendChild(rippleStyle);

    console.log('🚀 Future Kids loaded with sparkle animations!');
});
