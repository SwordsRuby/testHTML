document.addEventListener('mousemove', function (event) {
    document.querySelector('.intro-content').style.transform = `translate(${event.clientX * 0.015}px, ${event.clientY * 0.015}px)`;
});

// Story Panel Navigation
let currentPanel = 0;
const panels = document.querySelectorAll('.story-panel');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function showPanel(index) {
    panels.forEach(panel => panel.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    panels[index].classList.add('active');
    indicators[index].classList.add('active');
    currentPanel = index;
}

prevBtn.addEventListener('click', () => {
    const newIndex = currentPanel === 0 ? panels.length - 1 : currentPanel - 1;
    showPanel(newIndex);
});

nextBtn.addEventListener('click', () => {
    const newIndex = currentPanel === panels.length - 1 ? 0 : currentPanel + 1;
    showPanel(newIndex);
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => showPanel(index));
});

// Auto-advance story panels
setInterval(() => {
    const newIndex = currentPanel === panels.length - 1 ? 0 : currentPanel + 1;
    showPanel(newIndex);
}, 5000);


function initAnimations() {
    // particles
    function createParticles() {
        const introZone = document.querySelector('.intro-zone');
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            introZone.appendChild(particle);
        }
    }

    // gradient in title
    function animateGradientText() {
        const gradientTexts = document.querySelectorAll('.intro-title, .final-title');
        gradientTexts.forEach(text => {
            let position = 0;
            setInterval(() => {
                position = (position + 1) % 100;
                text.style.backgroundPosition = `${position}% 50%`;
            }, 50);
        });
    }

    // 3D slider in banner
    function animateBannerSlider() {
        const sliderContainer = document.querySelector('.slider-container');
        const sliderItems = document.querySelectorAll('.slider-item');
        let currentRotation = 0;
        const totalItems = sliderItems.length;
        const rotationStep = 360 / totalItems;

        function rotateSlider() {
            currentRotation = (currentRotation - rotationStep) % 360;
            sliderContainer.style.transform = `rotateY(${currentRotation}deg)`;
        }

        setInterval(rotateSlider, 4000);

        sliderItems.forEach((item, index) => {
            const rotation = index * rotationStep;
            item.style.transform = `rotateY(${rotation}deg) translateZ(300px)`;
        });
    }

    // show elements on scroll
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.gallery-item, .showcase-item, .stat-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // animations particles
    function animateParticles() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            let x = 0, y = 0;
            const speed = 0.01 + Math.random() * 0.02;
            const amplitude = 20 + Math.random() * 30;

            function updateParticle() {
                x += speed;
                y += speed * 0.7;

                const moveX = Math.sin(x) * amplitude;
                const moveY = Math.cos(y) * amplitude;

                particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
                requestAnimationFrame(updateParticle);
            }
            updateParticle();
        });
    }

    //animations orbs
    function animateOrbs() {
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
            let x = 0, y = 0;
            const speeds = [0.02, 0.015, 0.025];

            function updateOrb() {
                x += speeds[index];
                y += speeds[index] * 0.7;

                const moveX = Math.sin(x) * 100;
                const moveY = Math.cos(y) * 100;
                const scale = 1 + Math.sin(x) * 0.2;

                orb.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
                requestAnimationFrame(updateOrb);
            }
            updateOrb();
        });
    }

    // Glows animation
    function animateGlow() {
        const glowElements = document.querySelectorAll('.badge-animated');
        glowElements.forEach(el => {
            let intensity = 0.3;
            let increasing = true;

            setInterval(() => {
                if (increasing) {
                    intensity += 0.02;
                    if (intensity >= 0.6) increasing = false;
                } else {
                    intensity -= 0.02;
                    if (intensity <= 0.3) increasing = true;
                }
                el.style.boxShadow = `0 0 40px rgba(168, 85, 247, ${intensity})`;
            }, 100);
        });
    }

    // icon-rotate animation
    function animateIcons() {
        const icons = document.querySelectorAll('.badge-icon');
        icons.forEach(icon => {
            let rotation = 0;
            setInterval(() => {
                rotation = (rotation + 1) % 360;
                icon.style.transform = `rotate(${rotation}deg)`;
            }, 100);
        });
    }

    createParticles();
    animateParticles();
    animateGradientText();
    animateBannerSlider();
    initScrollAnimations();
    animateOrbs();
    animateGlow();
    animateIcons();
}

// animation init
document.addEventListener('DOMContentLoaded', initAnimations);