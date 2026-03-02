// Hamburger menu toggle
document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector(".hamburger");
    const navPanel = document.querySelector(".nav-panel");
    const overlay = document.querySelector(".nav-overlay");

    function toggleMenu() {
        navPanel.classList.toggle("active");
        hamburger.classList.toggle("active");
        overlay.classList.toggle("active");
        document.documentElement.classList.toggle("no-scroll");
        document.body.classList.toggle("no-scroll");
    }

    hamburger.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);
});

// Animate about section heading underline on scroll into view
const aboutHeading = document.querySelector(".about-content h2");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            aboutHeading.classList.add("animate");
        }
    });
}, {
    threshold: 0.5
});

observer.observe(aboutHeading);

// Animate social icons on scroll into view
const icons = document.querySelectorAll(".social-icons img");

const iconObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            const index = Array.from(icons).indexOf(entry.target);

            setTimeout(() => {
                entry.target.classList.add("show");
            }, index * 150);

            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.4
});

icons.forEach(icon => iconObserver.observe(icon));

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

        // Remove animation so it stops controlling transform
        heroTitle.classList.add("shrink-control");

    }, 1100); // after hero animation completes
});

window.addEventListener("scroll", () => {
    requestAnimationFrame(() => {

        const scrollY = window.scrollY;
        const heroHeight = hero.offsetHeight;

        const baseOffset = 15;
        const strength = 0.35;

        // Calculate movement
        let parallaxAmount = scrollY * strength;

        // Maximum movement allowed (hero height minus some buffer)
        const maxMovement = heroHeight * 0.6;

        // Clamp so it never exceeds max
        parallaxAmount = Math.min(parallaxAmount, maxMovement);

        heroTitle.style.transform =
            `translateY(${baseOffset + parallaxAmount}px)`;

        // Underline shrink on scroll
        const scrollProgress = Math.min(scrollY / (heroHeight * 0.6), 1);
        const shrinkAmount = 1 - scrollProgress;

        heroTitle.style.setProperty("--line-scale", shrinkAmount);

    });
});