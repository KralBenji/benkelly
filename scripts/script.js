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