/**
 * JEEVITHA MR — PORTFOLIO CONTROLLER INFRASTRUCTURE
 * Functional Scripts: Navigation loops, active states, skill rotators, and custom lightboxes.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Flag system signaling initialization ready state to trigger CSS transition visibility
  document.documentElement.classList.add('js-ready');

  initNavigation();
  initScrollEffects();
  initSkillRotator();
});

/**
 * 1. NAVIGATION & PROGRESS BAR LOOP CONTROLLERS
 */
function initNavigation() {
  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const navLinksContainer = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const progressBar = document.getElementById('progress-bar');
  const sections = document.querySelectorAll('section, header, footer');

  // Sticky Scroll Header and Linear Progress calculation loop
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Header shadow inclusion state threshold
    if (scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Progress percentage calculation
    if (docHeight > 0) {
      const progress = (scrollY / docHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }

    // Dynamic Navigation item highlighting link sync loop
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });

  // Mobile Menu Accordion Toggler
  navToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  // Structural closing check on navigation item execution click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });
}

/**
 * 2. STRUCTURAL SCROLL REVEAL (INTERSECTION OBSERVER)
 */
function initScrollEffects() {
  const elements = document.querySelectorAll('.reveal-up');
  
  const observerOptions = {
    root: null,
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Unobserve target entry immediately after initialization animation release
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.forEach(el => observer.observe(el));
}

/**
 * 3. STRATEGIC SKILL ROTATOR CORE LOOP
 */
function initSkillRotator() {
  const targetElement = document.getElementById('rotating-skill');
  if (!targetElement) return;

  const technicalCompetencies = [
    "Corporate Strategy",
    "Operational Logistics",
    "Financial Auditing",
    "Public Moderation",
    "Compliance Analysis"
  ];
  
  let currentIndex = 0;

  setInterval(() => {
    targetElement.classList.add('fade');
    
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % technicalCompetencies.length;
      targetElement.textContent = technicalCompetencies[currentIndex];
      targetElement.classList.remove('fade');
    }, 400); // Timed transition mapping perfectly with CSS fade delay tokens
  }, 3200);
}

/**
 * 4. LIGHTBOX DATA REGISTRY & DYNAMIC MODEL RENDER SPECIFICATION
 */
const lightboxRegistry = {
  'tax-structure': {
    title: "Corporate Tax Structure Evaluation",
    hint: "Academic Case Framework Document",
    details: "An exhaustive structural exploration evaluating standard GST filings, computational matrices inside specialized business zones, and systemic margin implications relative to multi-state commerce acts."
  },
  'flow-modeling': {
    title: "Operational Flow Modeling",
    hint: "System Logic Mockup Spec",
    details: "Demonstration arrays tracking distribution logic matrices. Incorporates algorithmic lookups and error validation syntax modules to ensure supply run transparency and zero metric data drops."
  },
  'incoterms-doc': {
    title: "Incoterms Compliance Blueprint",
    hint: "Operational Logistics Risk Map",
    details: "A comprehensive procedural breakdown analyzing ownership transition thresholds under key maritime variants, documenting direct risk offsets, insurance splits, and commercial bill requirements."
  }
};

function openLightbox(projectKey) {
  const lightbox = document.getElementById('portfolio-lightbox');
  const targetContainer = document.getElementById('lightbox-dynamic-target');
  const data = lightboxRegistry[projectKey];

  if (!lightbox || !targetContainer || !data) return;

  // Build the modal display interface content markup array
  targetContainer.innerHTML = `
    <div class="lightbox-placeholder">
      <p>${data.title}</p>
      <span class="lightbox-hint">${data.hint}</span>
      <p style="font-size: 0.9rem; font-family: var(--font-body); font-weight: normal; color: var(--color-text-dim); margin-top: 14px; line-height: 1.6;">
        ${data.details}
      </p>
    </div>
    <div class="lightbox-caption">Demonstration Asset Context Only — Formal Document Draft Pending</div>
  `;

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden'; // Halt window scrolling under the backdrop layer
}

function closeLightbox() {
  const lightbox = document.getElementById('portfolio-lightbox');
  if (!lightbox) return;

  lightbox.classList.remove('open');
  document.body.style.overflow = ''; // Release body tracking parameters safely
}

// Trap Escape key loop to cleanly dismiss modal interface active overlays
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});
