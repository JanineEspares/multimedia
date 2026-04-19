/**
 * Multimedia Portfolio - Interactive JavaScript
 * Features: Scroll animations, page interactivity, smooth transitions
 */

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
