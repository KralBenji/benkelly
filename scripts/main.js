document.addEventListener("DOMContentLoaded", () => {
  setupMobileNav();
  setupAboutHeadingAnimation();
  setupSocialIconAnimation();
  setupAboutImageAnimation();
  setupHeroAnimation();
  setupContactFormAnimation();
  setupTestimonialsAnimation();
  setupAudioProtection();
  setupHamburgerScrollColor();
});

// Opens and closes the mobile navigation menu, and adds the necessary classes to trigger CSS animations and prevent background scrolling when the menu is open.
function setupMobileNav() {
  const hamburger = document.querySelector(".hamburger");
  const navPanel = document.querySelector(".nav-panel");
  const overlay = document.querySelector(".nav-overlay");
  const navLinks = document.querySelectorAll(".nav-panel a");

  if (!hamburger || !navPanel || !overlay) return;

  function openMenu() {
    navPanel.classList.add("active");
    hamburger.classList.add("active");
    overlay.classList.add("active");

    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");
  }

  function closeMenu() {
    navPanel.classList.remove("active");
    hamburger.classList.remove("active");
    overlay.classList.remove("active");

    document.documentElement.classList.remove("no-scroll");
    document.body.classList.remove("no-scroll");
  }

  hamburger.addEventListener("click", () => {
    if (navPanel.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener("click", closeMenu);

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
}

// Animates the About heading once it scrolls halfway into view.
function setupAboutHeadingAnimation() {
  const aboutHeading = document.querySelector(".about-content h2");

  if (!aboutHeading) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutHeading.classList.add("animate");
          observer.unobserve(aboutHeading);
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  observer.observe(aboutHeading);
}

// Social icons fade in and up with a staggered delay
function setupSocialIconAnimation() {
  const icons = document.querySelectorAll(".social-icons img");

  if (!icons.length) return;

  const iconObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(icons).indexOf(entry.target);

          setTimeout(() => {
            entry.target.classList.add("show");
          }, index * 150);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.4,
    },
  );

  icons.forEach((icon) => iconObserver.observe(icon));
}

// About image animation - Fades in and upwards on page load
function setupAboutImageAnimation() {
  const image = document.querySelector(".about-image");

  if (!image) return;

  window.addEventListener("load", () => {
    requestAnimationFrame(() => {
      image.classList.add("show");
    });
  });
}

// Hero animation - Parallax effect on scroll and shrink effect on the title as you scroll down, with a delayed shrink animation on page load.
function setupHeroAnimation() {
  const hero = document.querySelector(".hero");
  const heroTitle = document.querySelector(".hero-title");

  if (!hero || !heroTitle) return;

  window.addEventListener("load", () => {
    setTimeout(() => {
      heroTitle.classList.add("shrink-control");
    }, 1100);
  });

  window.addEventListener("scroll", () => {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const heroHeight = hero.offsetHeight;

      const baseOffset = 15;
      const strength = 0.35;

      let parallaxAmount = scrollY * strength;

      const maxMovement = heroHeight * 0.6;
      parallaxAmount = Math.min(parallaxAmount, maxMovement);

      heroTitle.style.transform = `translateY(${baseOffset + parallaxAmount}px)`;

      const scrollProgress = Math.min(scrollY / (heroHeight * 0.6), 1);
      const shrinkAmount = 1 - scrollProgress;

      heroTitle.style.setProperty("--line-scale", shrinkAmount);
    });
  });
}

// Contact form animation - Fades in and upwards when scrolled into view
function setupContactFormAnimation() {
  const form = document.querySelector(".contact-form.fade-up");

  if (!form) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          form.classList.add("animate");
          observer.unobserve(form);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  observer.observe(form);
}

// Testimonials animation - Fades in and upwards when scrolled into view, with a staggered delay for the testimonial images
function setupTestimonialsAnimation() {
  const heading = document.querySelector(".testimonials-inner h2");
  const images = document.querySelectorAll(".testimonial-image");

  if (heading) {
    const headingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            heading.classList.add("animate");
            headingObserver.unobserve(heading);
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    headingObserver.observe(heading);
  }

  if (!images.length) return;

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.35,
    },
  );

  images.forEach((image) => imageObserver.observe(image));
}

// No right click on mp3 files in the audio player
function setupAudioProtection() {
  const audioElements = document.querySelectorAll("audio");

  audioElements.forEach((audio) => {
    audio.addEventListener("contextmenu", (e) => e.preventDefault());
  });
}

// Changes the hamburger menu icon when you scroll past the hero
function setupHamburgerScrollColor() {
  const hero = document.querySelector(".hero");
  const hamburger = document.querySelector(".hamburger");

  if (!hero || !hamburger) return;

  function updateHamburgerColor() {
    const heroBottom = hero.offsetTop + hero.offsetHeight;

    if (window.scrollY > heroBottom - 60) {
      hamburger.classList.add("scrolled");
    } else {
      hamburger.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateHamburgerColor);
  updateHamburgerColor();
}

// Scroll Indicator - Scroll to Web design
const scrollIndicator = document.querySelector(".scroll-indicator");
const webSection = document.querySelector("#web-design");

if (scrollIndicator && webSection) {
  scrollIndicator.addEventListener("click", () => {
    webSection.scrollIntoView({
      behavior: "smooth",
    });
  });
}

// ==========================
// Lightbox
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-image");
  const closeBtn = document.querySelector(".lightbox-close");
  const prevBtn = document.querySelector(".lightbox-prev");
  const nextBtn = document.querySelector(".lightbox-next");

  let galleryImages = [];
  let currentIndex = 0;

  let zoomLevel = 1;
  let panX = 0;
  let panY = 0;
  let isDragging = false;
  let hasDragged = false;
  let startX = 0;
  let startY = 0;

  const allSlides = document.querySelectorAll(".slideshow-container .slide img");

  function updateTransform() {
    lightboxImg.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
  }

  function resetZoomAndPan() {
    zoomLevel = 1;
    panX = 0;
    panY = 0;
    isDragging = false;
    hasDragged = false;

    lightboxImg.classList.remove("is-zoomed", "is-dragging");
    updateTransform();
  }

  function updateLightbox() {
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.alt = galleryImages[currentIndex].alt;
    lightboxImg.draggable = false;
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.classList.remove("lightbox-open");
    resetZoomAndPan();
  }

  allSlides.forEach((img) => {
    img.addEventListener("click", () => {
      const gallery = img.closest(".slideshow-container");

      galleryImages = Array.from(gallery.querySelectorAll(".slide img"));
      currentIndex = galleryImages.indexOf(img);

      updateLightbox();
      resetZoomAndPan();

      lightbox.classList.add("active");
      document.body.classList.add("lightbox-open");
    });
  });

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  lightboxImg.addEventListener("click", (e) => {
    e.stopPropagation();

    if (hasDragged) {
      hasDragged = false;
      return;
    }

    if (zoomLevel === 1) {
      zoomLevel = 2;
      lightboxImg.classList.add("is-zoomed");
      updateTransform();
      return;
    }

    resetZoomAndPan();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightbox();
    resetZoomAndPan();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateLightbox();
    resetZoomAndPan();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "Escape") closeLightbox();
  });

  lightboxImg.addEventListener("pointerdown", (e) => {
    if (zoomLevel <= 1) return;

    e.preventDefault();

    isDragging = true;
    hasDragged = false;
    startX = e.clientX - panX;
    startY = e.clientY - panY;

    lightboxImg.setPointerCapture(e.pointerId);
    lightboxImg.classList.add("is-dragging");
  });

  lightboxImg.addEventListener("pointermove", (e) => {
    if (!isDragging) return;

    e.preventDefault();

    const nextPanX = e.clientX - startX;
    const nextPanY = e.clientY - startY;

    if (Math.abs(nextPanX - panX) > 2 || Math.abs(nextPanY - panY) > 2) {
      hasDragged = true;
    }

    panX = nextPanX;
    panY = nextPanY;

    updateTransform();
  });

  lightboxImg.addEventListener("pointerup", (e) => {
    if (!isDragging) return;

    isDragging = false;
    lightboxImg.releasePointerCapture(e.pointerId);
    lightboxImg.classList.remove("is-dragging");
  });

  lightboxImg.addEventListener("pointercancel", () => {
    isDragging = false;
    lightboxImg.classList.remove("is-dragging");
  });

  lightbox.addEventListener(
    "wheel",
    (e) => {
      if (!lightbox.classList.contains("active")) return;

      e.preventDefault();
      e.stopPropagation();

      if (zoomLevel <= 1) return;

      panY -= e.deltaY;
      panX -= e.deltaX;

      updateTransform();
    },
    { passive: false },
  );
});
