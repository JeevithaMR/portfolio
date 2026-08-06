// main.js - Core Logic, Side Dot Scroll Spy, Word Rotation & Floating Particles

document.addEventListener('DOMContentLoaded', () => {

    // 1. Rotating Skill Word Logic
    const words = ['Leadership', 'Event Strategy', 'Public Speaking', 'Commerce', 'Management'];
    let wordIndex = 0;
    const rotatingElement = document.querySelector('.rotating-skill');

    if (rotatingElement) {
        setInterval(() => {
            rotatingElement.classList.add('fade-out');
            setTimeout(() => {
                wordIndex = (wordIndex + 1) % words.length;
                rotatingElement.textContent = words[wordIndex];
                rotatingElement.classList.remove('fade-out');
            }, 400);
        }, 3000);
    }

    // 2. Scroll Progress Dot Indicator Active State (ScrollSpy)
    const sections = document.querySelectorAll('section');
    const navDots = document.querySelectorAll('.scroll-dot');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('href') === `#${currentSectionId}`) {
                dot.classList.add('active');
            }
        });
    });

    // 3. Floating Ambient Particles Generator
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Randomize size, position and duration
            const size = Math.random() * 3 + 1; // 1px to 4px
            const posX = Math.random() * 100; // 0% to 100%
            const duration = Math.random() * 15 + 10; // 10s to 25s
            const delay = Math.random() * 10; // 0s to 10s

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.bottom = `-10px`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;

            particlesContainer.appendChild(particle);
        }
    }

    // 4. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('header nav');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('hidden');
            navMenu.classList.toggle('flex');
            navMenu.classList.toggle('flex-col');
            navMenu.classList.toggle('absolute');
            navMenu.classList.toggle('top-20');
            navMenu.classList.toggle('left-0');
            navMenu.classList.toggle('right-0');
            navMenu.classList.toggle('bg-obsidian');
            navMenu.classList.toggle('p-6');
            navMenu.classList.toggle('border-b');
            navMenu.classList.toggle('border-white/10');
        });
    }
});
