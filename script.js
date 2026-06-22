/*jslint browser: true */
/*global document, window, console */

(function () {
    'use strict';

    // Highlight active nav link based on current page
    document.addEventListener('DOMContentLoaded', function () {
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';
        var navLinks = document.querySelectorAll('.nav-link');

        Array.prototype.forEach.call(navLinks, function (link) {
            var href = link.getAttribute('href');

            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });

    // Add hover effects to project cards
    document.addEventListener('DOMContentLoaded', function () {
        var projectCards = document.querySelectorAll('.project-showcase-item');

        Array.prototype.forEach.call(projectCards, function (card) {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    });

    // Add hover effect to buttons
    document.addEventListener('DOMContentLoaded', function () {
        var buttons = document.querySelectorAll('.cta-button, .view-project');

        Array.prototype.forEach.call(buttons, function (button) {
            button.addEventListener('mouseenter', function () {
                this.style.opacity = '0.8';
            });

            button.addEventListener('mouseleave', function () {
                this.style.opacity = '1';
            });
        });
    });

    // Simple scroll effect for nav shadow
    window.addEventListener('scroll', function () {
        var navbar = document.querySelector('.navbar');

        if (!navbar) {
            return;
        }

        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Solar System Calculator
    document.addEventListener('DOMContentLoaded', function () {
        var earthYearsInput = document.getElementById('earthYears');

        var planets = {
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
            var earthYears;
            var planet;
            var period;
            var age;
            var revolutions;
            var ageElement;
            var revElement;

            if (!earthYearsInput) {
                return;
            }

            earthYears = parseFloat(earthYearsInput.value) || 0;

            for (planet in planets) {
                if (Object.prototype.hasOwnProperty.call(planets, planet)) {
                    period = planets[planet].period;
                    age = Math.round(earthYears);
                    revolutions = (earthYears / period).toFixed(2);

                    ageElement = document.getElementById(planet + '-age');
                    revElement = document.getElementById(planet + '-rev');

                    if (ageElement) {
                        ageElement.textContent = age;
                    }

                    if (revElement) {
                        revElement.textContent = revolutions;
                    }
                }
            }
        }

        var calculateBtn = document.getElementById('calculateBtn');

        if (calculateBtn) {
            calculateBtn.addEventListener('click', updateCalculator);
        }

        updateCalculator();
    });

    // Final Solar System Showcase Video
    document.addEventListener('DOMContentLoaded', function () {
        var video = document.getElementById('solarSystemVideo');
        var playButton = document.getElementById('videoPlayButton');

        if (!video || !playButton) {
            return;
        }

        playButton.addEventListener('click', function () {
            video.play();
        });

        video.addEventListener('play', function () {
            playButton.classList.add('hidden');
        });

        video.addEventListener('pause', function () {
            playButton.classList.remove('hidden');
        });

        video.addEventListener('ended', function () {
            playButton.classList.remove('hidden');
        });
    });

    console.log('Portfolio loaded successfully!');
}());