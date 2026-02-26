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