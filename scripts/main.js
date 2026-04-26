document.addEventListener("DOMContentLoaded", () => {
  setupMobileNav();
  setupAboutHeadingAnimation();
  setupSocialIconAnimation();
  setupAboutImageAnimation();
  setupHeroAnimation();
  setupContactFormAnimation();
  setupTestimonialsAnimation();
});

function setupMobileNav() {
  const hamburger = document.querySelector(".hamburger");
  const navPanel = document.querySelector(".nav-panel");
  const overlay = document.querySelector(".nav-overlay");
  const navLinks = document.querySelectorAll(".nav-panel a");

  if (!hamburger || !navPanel || !overlay) return;

  let scrollY = 0;

  function toggleMenu() {
    const isOpen = navPanel.classList.contains("active");

    if (!isOpen) {
      scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
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

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navPanel.classList.contains("active")) {
        toggleMenu();
      }
    });
  });
}

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

function setupAboutImageAnimation() {
  const image = document.querySelector(".about-image");

  if (!image) return;

  window.addEventListener("load", () => {
    requestAnimationFrame(() => {
      image.classList.add("show");
    });
  });
}

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
