/**
 * Multimedia Portfolio - Interactive JavaScript
 * Features: Scroll animations, page interactivity, smooth transitions
 */

// ===========================
// SLIME MUDGE EFFECT (Desktop Only)
// ===========================

/**
 * Interactive Slime Mudge Effect Following Mouse (Desktop Only)
 */
document.addEventListener('DOMContentLoaded', function() {
    // Detect if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                     || window.innerWidth < 768
                     || ('ontouchstart' in window);
    
    // Only run slime effect on desktop
    if (isMobile) {
        return; // Skip effect on mobile
    }
    
    const canvas = document.createElement('canvas');
    canvas.id = 'slime-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.insertBefore(canvas, document.body.firstChild);
    
    const ctx = canvas.getContext('2d');
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let isInHero = false;
    
    // Particle system for slime effect
    const particles = [];
    
    class SlimeParticle {
        constructor(x, y) {
            this.x = x + (Math.random() - 0.5) * 60;
            this.y = y + (Math.random() - 0.5) * 60;
            this.vx = (Math.random() - 0.5) * 4;
            this.vy = (Math.random() - 0.5) * 4;
            this.radius = Math.random() * 40 + 20;
            this.alpha = Math.random() * 0.6 + 0.2;
            this.life = 1;
            this.decay = Math.random() * 0.005 + 0.008;
        }
        
        update() {
            // Move towards mouse
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 10) {
                this.vx += (dx / distance) * 0.3;
                this.vy += (dy / distance) * 0.3;
            }
            
            // Friction
            this.vx *= 0.95;
            this.vy *= 0.95;
            
            this.x += this.vx;
            this.y += this.vy;
            
            // Fade out
            this.life -= this.decay;
            this.alpha -= this.decay;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha * this.life;
            
            // Glowing mudge effect
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            gradient.addColorStop(0, 'rgba(0, 255, 153, 0.8)');
            gradient.addColorStop(0.4, 'rgba(217, 70, 239, 0.4)');
            gradient.addColorStop(1, 'rgba(255, 0, 255, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
            
            // Optional: Add glow effect
            ctx.shadowBlur = 20;
            ctx.shadowColor = `rgba(0, 255, 153, ${0.5 * this.life})`;
            
            ctx.restore();
        }
    }
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Check if mouse is in hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const rect = heroSection.getBoundingClientRect();
            isInHero = mouseY >= rect.top && mouseY <= rect.bottom;
        }
        
        // Create slime particles when moving
        if (isInHero && Math.random() > 0.5) {
            particles.push(new SlimeParticle(mouseX, mouseY));
        }
    });
    
    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }
        
        // Draw glowing cursor mudge effect directly on mouse position
        if (isInHero) {
            ctx.save();
            
            // Large outer glow
            const outerGradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 150);
            outerGradient.addColorStop(0, 'rgba(0, 255, 153, 0.15)');
            outerGradient.addColorStop(0.5, 'rgba(217, 70, 239, 0.05)');
            outerGradient.addColorStop(1, 'rgba(255, 0, 255, 0)');
            
            ctx.fillStyle = outerGradient;
            ctx.fillRect(mouseX - 150, mouseY - 150, 300, 300);
            
            // Medium glow
            const mediumGradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 100);
            mediumGradient.addColorStop(0, 'rgba(0, 255, 153, 0.25)');
            mediumGradient.addColorStop(0.6, 'rgba(217, 70, 239, 0.1)');
            mediumGradient.addColorStop(1, 'rgba(255, 0, 255, 0)');
            
            ctx.fillStyle = mediumGradient;
            ctx.fillRect(mouseX - 100, mouseY - 100, 200, 200);
            
            // Sharp inner glow
            const innerGradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 50);
            innerGradient.addColorStop(0, 'rgba(0, 255, 153, 0.4)');
            innerGradient.addColorStop(0.7, 'rgba(217, 70, 239, 0.15)');
            innerGradient.addColorStop(1, 'rgba(255, 0, 255, 0)');
            
            ctx.fillStyle = innerGradient;
            ctx.fillRect(mouseX - 50, mouseY - 50, 100, 100);
            
            ctx.restore();
        }
        
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});

// ===========================
// ANIMATED TECH CURSOR (Desktop Only)
// ===========================

/**
 * Animated Tech Cursor - Rotating Rings (Desktop Only)
 */
document.addEventListener('DOMContentLoaded', function() {
    // DISABLED: Custom cursor interferes with orbital system animation
    return;
    
    // Detect if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                     || window.innerWidth < 768
                     || ('ontouchstart' in window);
    
    // Only run custom cursor on desktop
    if (isMobile) {
        return; // Skip cursor on mobile, use default
    }
    
    const cursorContainer = document.createElement('div');
    const cursorRing1 = document.createElement('div');
    const cursorRing2 = document.createElement('div');
    const cursorRing3 = document.createElement('div');
    const cursorCenter = document.createElement('div');
    
    // Main container
    cursorContainer.id = 'cursor-container';
    cursorContainer.style.cssText = `
        position: fixed;
        width: 50px;
        height: 50px;
        pointer-events: none;
        z-index: 10000;
        transform: translate(-50%, -50%);
    `;
    
    // Ring 1 - Outer rotating ring
    cursorRing1.id = 'cursor-ring-1';
    cursorRing1.style.cssText = `
        position: absolute;
        width: 50px;
        height: 50px;
        border: 2px solid #00d9ff;
        border-radius: 50%;
        top: 0;
        left: 0;
        box-shadow: 0 0 15px #00d9ff;
        animation: rotate 4s linear infinite;
    `;
    
    // Ring 2 - Middle rotating ring (opposite direction)
    cursorRing2.id = 'cursor-ring-2';
    cursorRing2.style.cssText = `
        position: absolute;
        width: 32px;
        height: 32px;
        border: 2px solid #ff006e;
        border-radius: 50%;
        top: 9px;
        left: 9px;
        box-shadow: 0 0 15px #ff006e;
        animation: rotateReverse 3s linear infinite;
    `;
    
    // Ring 3 - Inner rotating ring
    cursorRing3.id = 'cursor-ring-3';
    cursorRing3.style.cssText = `
        position: absolute;
        width: 18px;
        height: 18px;
        border: 2px solid #8338ec;
        border-radius: 50%;
        top: 16px;
        left: 16px;
        box-shadow: 0 0 15px #8338ec;
        animation: rotate 2.5s linear infinite;
    `;
    
    // Center dot
    cursorCenter.id = 'cursor-center';
    cursorCenter.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: #00d9ff;
        border-radius: 50%;
        top: 21px;
        left: 21px;
        box-shadow: 0 0 20px #00d9ff, 0 0 40px #00d9ff;
        animation: pulse 1.5s ease-in-out infinite;
    `;
    
    cursorContainer.appendChild(cursorRing1);
    cursorContainer.appendChild(cursorRing2);
    cursorContainer.appendChild(cursorRing3);
    cursorContainer.appendChild(cursorCenter);
    document.body.appendChild(cursorContainer);
    
    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes rotateReverse {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
        }
        
        @keyframes pulse {
            0%, 100% { 
                transform: scale(1);
                opacity: 1;
                box-shadow: 0 0 20px #00d9ff, 0 0 40px #00d9ff;
            }
            50% { 
                transform: scale(1.3);
                opacity: 0.7;
                box-shadow: 0 0 30px #00d9ff, 0 0 60px #00d9ff;
            }
        }
    `;
    document.head.appendChild(style);
    
    let mouseX = 0;
    let mouseY = 0;
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorContainer.style.left = mouseX + 'px';
        cursorContainer.style.top = mouseY + 'px';
    });
    
    // Hide custom cursor on mouse leave and show on mouse enter
    document.addEventListener('mouseleave', () => {
        cursorContainer.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursorContainer.style.opacity = '1';
    });
});

// ===========================
// IMAGE LOADING FALLBACK
// ===========================

/**
 * Show fallback when image fails to load
 */
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.project-image-featured');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
        
        img.addEventListener('load', function() {
            this.style.display = 'block';
        });
    });
});

// ===========================
// PAGE TRANSITION ANIMATION
// ===========================

/**
 * Fade in page on load
 */
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '1';
});

// ===========================
// SCROLL ANIMATIONS
// ===========================

/**
 * Observe elements and add animations when they come into view
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards for scroll animation
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Observe experience items
    const expItems = document.querySelectorAll('.experience-list li');
    expItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.animation = `slideUp 0.6s ease-out ${index * 0.1}s forwards`;
        observer.observe(item);
    });

    // Observe section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        observer.observe(title);
    });
});

// ===========================
// PROJECT CARD INTERACTIVITY
// ===========================

/**
 * Add enhanced hover and click interactions to project cards
 */
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        // Click on project card to navigate to project link
        const projectLink = card.querySelector('.btn-primary');
        card.addEventListener('click', function(e) {
            // Make the whole card clickable while preserving direct link clicks
            if (e.target !== projectLink && e.target.closest('a') !== projectLink) {
                projectLink.click();
            }
        });
    });
});

// ===========================
// NAVBAR STYLES ON SCROLL
// ===========================

/**
 * Add shadow to navbar when user scrolls down
 */
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 217, 255, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ===========================
// SOCIAL ICON ANIMATIONS
// ===========================

/**
 * Add ripple effect on social icon clicks
 */
document.addEventListener('DOMContentLoaded', function() {
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(0, 217, 255, 0.5)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// ===========================
// BUTTON INTERACTIVITY
// ===========================

/**
 * Add visual feedback to all buttons
 */
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// ===========================
// PARALLAX SCROLL EFFECT
// ===========================

/**
 * Add subtle parallax effect to hero section
 */
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    
    if (hero && scrollPosition < window.innerHeight) {
        hero.style.backgroundPosition = `0px ${scrollPosition * 0.5}px`;
    }
});

// ===========================
// PAGE LOAD ANIMATION
// ===========================

/**
 * Trigger animations on page load
 */
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// ===========================
// KEYBOARD NAVIGATION SUPPORT
// ===========================

/**
 * Keyboard accessibility
 */
document.addEventListener('keydown', function(e) {
    // Alt+Home to go to home page
    if (e.altKey && e.key === 'Home') {
        window.location.href = 'index.html';
    }
});

// ===========================
// ANALYTICS / TRACKING
// ===========================

/**
 * Track user interactions (optional - can be connected to analytics service)
 */
function trackEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
    // In production, send this to your analytics service
    // Example: analytics.track(eventName, eventData);
}

// Track page views
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    trackEvent('page_viewed', { page: currentPage });
});

// Track button clicks
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('button_clicked', { buttonText: this.textContent.trim() });
        });
    });
});

// Track social icon clicks
document.addEventListener('DOMContentLoaded', function() {
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const platform = this.getAttribute('title');
            trackEvent('social_link_clicked', { platform: platform });
        });
    });
});

console.log('✨ Multimedia Portfolio loaded successfully!');
console.log('© 2026 Multimedia & Authoring');
