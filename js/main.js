document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Fixed & Revamped Text Rotation Animation ---
    const rotatingTextEl = document.getElementById('rotating-text');
    
    if (rotatingTextEl) {
        const wordsArray = JSON.parse(rotatingTextEl.getAttribute('data-words'));
        let currentWordIndex = 0;
        let isDeleting = false;
        let currentTxt = '';
        
        function typeEffect() {
            const currentFullWord = wordsArray[currentWordIndex];
            
            if (isDeleting) {
                // Remove letters
                currentTxt = currentFullWord.substring(0, currentTxt.length - 1);
            } else {
                // Add letters
                currentTxt = currentFullWord.substring(0, currentTxt.length + 1);
            }
            
            rotatingTextEl.innerHTML = currentTxt;
            
            let typeSpeed = isDeleting ? 40 : 100;
            
            // If the word is complete, pause then start deleting
            if (!isDeleting && currentTxt === currentFullWord) {
                typeSpeed = 2200; // Time the fully typed word stays visible
                isDeleting = true;
            } else if (isDeleting && currentTxt === '') {
                isDeleting = false;
                currentWordIndex = (currentWordIndex + 1) % wordsArray.length;
                typeSpeed = 400; // Small rest pause before typing next word
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        // Initiate loop
        setTimeout(typeEffect, 1000);
    }

    // --- 2. Premium Scroll Intersection Observer ---
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Read optional delay modifiers from markup
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    entry.target.style.transitionDelay = `${delay * 0.15}s`;
                }
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
});
