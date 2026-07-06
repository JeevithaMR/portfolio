/* ==========================================================================
   JEEVITHA MR — PORTFOLIO
   Vanilla JS: nav behavior, scroll reveal, rotating skill word,
   hero waveform, scroll progress, lightbox.

   Hardened on purpose: each feature is wrapped in its own try/catch so
   a problem in one (e.g. a missing element) can never stop the others
   from working. Text visibility never depends on this script succeeding.
   ========================================================================== */

(function () {
  "use strict";

  function safe(label, fn) {
    try {
      fn();
    } catch (err) {
      console.warn("[portfolio] " + label + " failed to initialize:", err);
    }
  }

  /* ---------- Header scrolled state + scroll progress ---------- */
  safe("scroll progress / header", function () {
    var header = document.getElementById("siteHeader");
    var signalProgress = document.getElementById("signalProgress");

    function onScroll() {
      if (header) header.classList.toggle("scrolled", window.scrollY > 12);
      if (signalProgress) {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        signalProgress.style.width = progress + "%";
      }
      updateActiveNavSafe();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  });

  /* ---------- Mobile nav toggle ---------- */
  safe("mobile nav toggle", function () {
    var navToggle = document.getElementById("navToggle");
    var navLinks = document.getElementById("navLinks");
    if (!navToggle || !navLinks) return;

    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen);
    });

    navLinks.querySelectorAll("[data-nav]").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  });

  /* ---------- Scroll-spy active nav link ---------- */
  var sections = [];
  var navItems = [];
  function updateActiveNavSafe() {
    safe("scroll-spy", function () {
      if (!sections.length) {
        sections = Array.prototype.slice.call(document.querySelectorAll("main .section, .hero"));
        navItems = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
      }
      if (!sections.length) return;
      var currentId = sections[0].id;
      var offset = 130;
      sections.forEach(function (section) {
        if (window.scrollY >= section.offsetTop - offset) currentId = section.id;
      });
      navItems.forEach(function (link) {
        var target = (link.getAttribute("href") || "").replace("#", "");
        link.classList.toggle("active", target === currentId);
      });
    });
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  safe("scroll reveal animation", function () {
    var revealEls = document.querySelectorAll(".reveal-up");
    if (!revealEls.length || typeof IntersectionObserver === "undefined") return;

    // Only now do we opt into the hidden/animated state — content stayed
    // visible this whole time in case this feature never got this far.
    document.documentElement.classList.add("js-ready");

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });

    // Extra failsafe: force-reveal everything after a short delay regardless.
    window.addEventListener("load", function () {
      setTimeout(function () {
        revealEls.forEach(function (el) { el.classList.add("in-view"); });
      }, 1800);
    });
  });

  /* ---------- Hero waveform bars ---------- */
  safe("hero waveform", function () {
    var waveform = document.getElementById("heroWaveform");
    if (!waveform) return;
    var barCount = 28;
    for (var i = 0; i < barCount; i++) {
      var bar = document.createElement("span");
      var delay = (Math.random() * 1.4).toFixed(2);
      var duration = (1.1 + Math.random() * 0.9).toFixed(2);
      bar.style.animationDelay = delay + "s";
      bar.style.animationDuration = duration + "s";
      waveform.appendChild(bar);
    }
  });

  /* ---------- Rotating soft-skill word ---------- */
  safe("rotating skill word", function () {
    var rotatingWords = [
      "Leadership", "Creativity", "Curiosity", "Strategic Thinking",
      "Public Speaking", "Problem Solving", "Adaptability", "Initiative"
    ];
    var rotatingEl = document.getElementById("rotatingSkill");
    if (!rotatingEl) return;
    var idx = 0;
    setInterval(function () {
      rotatingEl.classList.add("fade");
      setTimeout(function () {
        idx = (idx + 1) % rotatingWords.length;
        rotatingEl.textContent = rotatingWords[idx];
        rotatingEl.classList.remove("fade");
      }, 350);
    }, 3000);
  });

  /* ---------- Lightbox ---------- */
  safe("certificate lightbox", function () {
    var lightbox = document.getElementById("lightbox");
    var lightboxImageWrap = document.getElementById("lightboxImage");
    var lightboxTriggers = document.querySelectorAll("[data-lightbox]");
    var lightboxCloseEls = document.querySelectorAll("[data-lightbox-close]");
    if (!lightbox || !lightboxImageWrap) return;

    function placeholderMarkup(title) {
      return '<p id="lightboxTitle">' + (title || "Certificate") + '</p>' +
        '<span class="lightbox-hint">Image will appear here once uploaded</span>';
    }

    function openLightbox(title, src) {
      lightboxImageWrap.innerHTML = placeholderMarkup(title);
      lightboxImageWrap.classList.remove("has-image");

      if (src) {
        var img = new Image();
        img.onload = function () {
          lightboxImageWrap.classList.add("has-image");
          lightboxImageWrap.innerHTML =
            '<img src="' + src + '" alt="' + (title || "Certificate") + '" class="lightbox-img" />' +
            '<p class="lightbox-caption">' + (title || "") + '</p>';
        };
        img.onerror = function () { /* not uploaded yet — placeholder stays */ };
        img.src = src;
      }

      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    lightboxTriggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        openLightbox(
          trigger.getAttribute("data-lightbox-title"),
          trigger.getAttribute("data-lightbox-src")
        );
      });
    });

    lightboxCloseEls.forEach(function (el) { el.addEventListener("click", closeLightbox); });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  });
})();
