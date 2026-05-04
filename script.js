/**
 * Multimedia Portfolio - Simple JavaScript
 * Basic functionality: navigation highlighting, smooth scrolling, simple hover effects
 */

'use strict';

// Highlight active nav link based on current page
document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Add hover effects to project cards
document.addEventListener('DOMContentLoaded', function () {
    const projectCards = document.querySelectorAll('.project-showcase-item');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});

// Add hover effect to buttons
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.cta-button, .view-project');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
});

// Simple scroll effect for nav shadow
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Solar System Calculator
document.addEventListener('DOMContentLoaded', function() {
    const earthYearsInput = document.getElementById('earthYears');
    
    // Planet data with precise orbital periods (in Earth years)
    const planets = {
        sun: { period: 1 },
        mercury: { period: 0.2408 },
        venus: { period: 0.6152 },
        earth: { period: 1.0 },
        mars: { period: 1.8809 },
        jupiter: { period: 11.8622 },
        saturn: { period: 29.4571 },
        uranus: { period: 84.0111 },
        neptune: { period: 164.7886 },
        pluto: { period: 248.0 }
    };
    
    function updateCalculator() {
        const earthYears = parseFloat(earthYearsInput.value) || 0;
        
        Object.keys(planets).forEach(planet => {
            const period = planets[planet].period;
            const age = Math.round(earthYears);
            const revolutions = (earthYears / period).toFixed(2);
            
            // Update values in DOM
            const ageElement = document.getElementById(`${planet}-age`);
            const revElement = document.getElementById(`${planet}-rev`);
            
            if (ageElement) ageElement.textContent = age;
            if (revElement) revElement.textContent = revolutions;
        });
    }
    
    // Add event listener for calculate button only
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', updateCalculator);
    }
    
    // Initialize with default values on page load
    updateCalculator();
});

console.log('✨ Portfolio loaded successfully!');
