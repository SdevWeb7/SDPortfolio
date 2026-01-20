// ===== Portfolio Futuriste - Cyberpunk JavaScript =====

// ===== Particles System =====
class ParticlesSystem {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        this.connectionDistance = 150;

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
            this.ctx.fill();

            // Draw connections
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    const opacity = (1 - distance / this.connectionDistance) * 0.3;
                    this.ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });
        });
    }
}

// Initialize particles system
const particlesSystem = new ParticlesSystem();

// ===== Mobile Menu =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');

        // Create mobile menu if it doesn't exist
        let mobileMenu = document.querySelector('.mobile-menu');
        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.innerHTML = `
                <div class="mobile-menu-content">
                    ${navLinks.innerHTML}
                </div>
            `;
            document.querySelector('.navbar').appendChild(mobileMenu);

            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                .mobile-menu {
                    position: fixed;
                    top: 88px;
                    left: 0;
                    right: 0;
                    background: rgba(10, 14, 39, 0.98);
                    backdrop-filter: blur(20px);
                    padding: var(--space-lg);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                    transform: translateY(-100%);
                    opacity: 0;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 999;
                    border-bottom: 1px solid var(--glass-border);
                }
                .mobile-menu.active {
                    transform: translateY(0);
                    opacity: 1;
                }
                .mobile-menu-content {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-md);
                }
                .mobile-menu ul {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-md);
                }
                .mobile-menu a {
                    font-size: 1.125rem;
                    padding: var(--space-sm) 0;
                    border-bottom: 1px solid var(--glass-border);
                }
                .mobile-menu-btn.active span:nth-child(1) {
                    transform: rotate(45deg) translate(7px, 7px);
                }
                .mobile-menu-btn.active span:nth-child(2) {
                    opacity: 0;
                }
                .mobile-menu-btn.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -7px);
                }
            `;
            document.head.appendChild(style);
        }

        mobileMenu.classList.toggle('active');
    });
}

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 88;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.2
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .skill-category,
    .project-card {
        opacity: 0;
        transform: translateY(50px);
        transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .skill-category.animate-in,
    .project-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(animationStyles);

// Observe elements
document.querySelectorAll('.skill-category, .project-card').forEach((el, index) => {
    el.style.transitionDelay = `${(index % 3) * 0.15}s`;
    animationObserver.observe(el);
});

// ===== Mouse Move Parallax =====
const heroContainer = document.querySelector('.hero-container');
const codeWindow = document.querySelector('.code-window');
const floatingElements = document.querySelectorAll('.floating-element');

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        // Parallax for code window
        if (codeWindow) {
            const moveX = (mouseX - 0.5) * 30;
            const moveY = (mouseY - 0.5) * 30;
            codeWindow.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        }

        // Parallax for floating elements
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const moveX = (mouseX - 0.5) * 20 * speed;
            const moveY = (mouseY - 0.5) * 20 * speed;
            element.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        });
    });
}

// ===== 3D Tilt Effect on Cards =====
const addTiltEffect = (card) => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 5;
        const rotateY = ((centerX - x) / centerX) * 5;

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
};

// Apply tilt to cards
document.querySelectorAll('.skill-category, .project-card').forEach(card => {
    addTiltEffect(card);
});

// ===== Glitch Effect Enhancement =====
const glitchElements = document.querySelectorAll('.glitch');

glitchElements.forEach(element => {
    setInterval(() => {
        const shouldGlitch = Math.random() > 0.9;
        if (shouldGlitch) {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = '';
            }, 10);
        }
    }, 3000);
});

// ===== Code Window Typing Effect =====
const codeWindowContent = document.querySelector('.window-content code');
if (codeWindowContent) {
    const originalText = codeWindowContent.innerHTML;
    codeWindowContent.innerHTML = '';

    let i = 0;
    const typeSpeed = 20;

    const typeWriter = () => {
        if (i < originalText.length) {
            codeWindowContent.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        }
    };

    // Start typing after a delay
    setTimeout(typeWriter, 1000);
}

// ===== Skill Tags Hover Effect =====
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.5s ease';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.animation = '';
    });
});

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(pulseStyle);

// ===== Form Handling =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        console.log('Form submitted:', data);

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.textContent = 'Message envoyé avec succès! 🚀';
        successMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple));
            color: white;
            padding: 2rem 3rem;
            border-radius: var(--radius-lg);
            font-family: var(--font-mono);
            font-size: 1.125rem;
            font-weight: 600;
            box-shadow: 0 20px 60px rgba(0, 240, 255, 0.5);
            z-index: 10000;
            animation: slideIn 0.5s ease;
        `;

        document.body.appendChild(successMessage);

        // Remove message after 3 seconds
        setTimeout(() => {
            successMessage.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => {
                successMessage.remove();
            }, 500);
        }, 3000);

        // Reset form
        contactForm.reset();
    });
}

// Add slide animations
const slideStyle = document.createElement('style');
slideStyle.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translate(-50%, -60%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }

    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -40%);
        }
    }
`;
document.head.appendChild(slideStyle);

// ===== Scroll Progress Indicator =====
const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta), var(--neon-purple));
        z-index: 10000;
        transition: width 0.2s ease;
        box-shadow: var(--glow-cyan);
    `;
    document.body.appendChild(indicator);

    window.addEventListener('scroll', () => {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        indicator.style.width = `${scrolled}%`;
    });
};

createScrollIndicator();

// ===== Cursor Trail Effect =====
if (window.innerWidth > 768) {
    let cursorTrail = [];
    const maxTrailLength = 20;

    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--neon-cyan);
            pointer-events: none;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            transform: translate(-50%, -50%);
            z-index: 9999;
            opacity: 0.6;
            animation: fadeOut 0.8s ease forwards;
        `;

        document.body.appendChild(trail);
        cursorTrail.push(trail);

        if (cursorTrail.length > maxTrailLength) {
            const oldTrail = cursorTrail.shift();
            oldTrail.remove();
        }

        setTimeout(() => trail.remove(), 800);
    });

    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.textContent = `
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0);
            }
        }
    `;
    document.head.appendChild(fadeOutStyle);
}

// ===== Ripple Effect on Buttons =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            z-index: 0;
        `;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===== Random Floating Particles =====
const createFloatingParticle = () => {
    const particle = document.createElement('div');
    const size = Math.random() * 50 + 20;
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 10 + 10;

    particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(0, 240, 255, 0.1), transparent);
        border-radius: 50%;
        bottom: -${size}px;
        left: ${startX}px;
        pointer-events: none;
        z-index: -1;
        animation: floatUp ${duration}s ease-in-out;
    `;

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), duration * 1000);
};

const floatUpStyle = document.createElement('style');
floatUpStyle.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatUpStyle);

// Create particles periodically
setInterval(createFloatingParticle, 3000);

// ===== Performance Optimization =====
const passiveSupported = (() => {
    let passive = false;
    try {
        const options = {
            get passive() {
                passive = true;
                return false;
            }
        };
        window.addEventListener('test', null, options);
        window.removeEventListener('test', null, options);
    } catch (err) {
        passive = false;
    }
    return passive;
})();

const wheelOpt = passiveSupported ? { passive: true } : false;

// Disable scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// ===== Initialize on Load =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 Portfolio Futuriste Chargé!', 'color: #00f0ff; font-size: 20px; font-weight: bold;');
    console.log('%cDéveloppé par Steven', 'color: #8338ec; font-size: 14px;');
});
