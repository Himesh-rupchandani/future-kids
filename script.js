/* ============================
   Future Kids - Interactive JS
   ============================ */

document.addEventListener('DOMContentLoaded', function () {

    // ===== Mobile Menu Toggle =====
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // ===== Navbar Scroll Effect =====
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }

        // Scroll to top button
        if (window.scrollY > 500) {
            scrollTopBtn.classList.remove('opacity-0', 'invisible');
            scrollTopBtn.classList.add('opacity-100', 'visible');
        } else {
            scrollTopBtn.classList.add('opacity-0', 'invisible');
            scrollTopBtn.classList.remove('opacity-100', 'visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== Counter Animation =====
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };
            updateCounter();
        });
    };

    // ===== Intersection Observer for Reveal Animations =====
    const revealElements = document.querySelectorAll('section > div');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Trigger counter animation when stats section is visible
                if (!countersAnimated && entry.target.querySelector('.counter')) {
                    animateCounters();
                    countersAnimated = true;
                }
            }
        });
    }, { threshold: 0.1 });

    // Add reveal class to section contents
    document.querySelectorAll('section').forEach(section => {
        const children = section.querySelectorAll('.program-card, .testimonial-card, .partner-card, .group');
        children.forEach((el, i) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${i * 0.08}s`;
            observer.observe(el);
        });
    });

    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Trigger counters if hero stats are visible on load
    setTimeout(() => {
        const heroCounters = document.querySelectorAll('#home .counter');
        heroCounters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };
            updateCounter();
        });
    }, 500);

    // ===== Smooth Scroll for anchor links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

    // ===== Contact Form Submission =====
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Booked Successfully! 🎉';
                btn.classList.add('form-success');
                btn.classList.remove('btn-gradient');

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.classList.remove('form-success');
                    btn.classList.add('btn-gradient');
                    contactForm.reset();
                }, 3000);
            }, 1500);
        });
    }

    // ===== Navbar shadow on scroll =====
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 20;
        if (scrolled) {
            navbar.style.boxShadow = '0 10px 40px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '';
        }
    });

    // ===== Parallax effect for hero cards =====
    const heroCards = document.querySelectorAll('.card-bounce, .card-bounce-delay');
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 10;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 10;

        heroCards.forEach((card, index) => {
            const factor = (index + 1) * 0.3;
            card.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px)`;
        });
    });

    // Reset hero cards on mouse leave
    document.addEventListener('mouseleave', () => {
        heroCards.forEach(card => {
            card.style.transform = '';
        });
    });

    // ===== Typed effect for hero (subtle) =====
    // Auto-play subtle animations for page load
    document.body.classList.add('loaded');

    console.log('🚀 Future Kids website loaded successfully!');
});
