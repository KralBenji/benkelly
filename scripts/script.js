// Wait for DOM before running nav code
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navPanel = document.querySelector(".nav-panel");
  const overlay = document.querySelector(".nav-overlay");
  const navLinks = document.querySelectorAll(".nav-panel a");

  let scrollY = 0;

  function toggleMenu() {
    const isOpen = navPanel.classList.contains("active");

    if (!isOpen) {
      // Opening menu: lock scroll and store position
      scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // Closing menu: restore scroll position
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      window.scrollTo(0, scrollY);
    }

    navPanel.classList.toggle("active");
    hamburger.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  hamburger.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  // Close menu when clicking a nav link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navPanel.classList.contains("active")) {
        toggleMenu();
      }
    });
  });
});

// Animate about section heading underline on scroll into view
const aboutHeading = document.querySelector(".about-content h2");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aboutHeading.classList.add("animate");
      }
    });
  },
  {
    threshold: 0.5,
  },
);

observer.observe(aboutHeading);

// Animate social icons on scroll into view
const icons = document.querySelectorAll(".social-icons img");

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

// Animate about image on load
window.addEventListener("load", () => {
  const image = document.querySelector(".about-image");

  requestAnimationFrame(() => {
    image.classList.add("show");
  });
});

// Animate hero title with parallax effect on scroll
const hero = document.querySelector(".hero");
const heroTitle = document.querySelector(".hero-title");

// Ensure underline is fully expanded after load animation finishes
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
