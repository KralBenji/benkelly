const slideshows = [
  {
    section: "#graphic-design",
    currentIndex: 0,
  },
  {
    section: "#web-design",
    currentIndex: 0,
  },
];

function showSlide(slideshowIndex, slideIndex) {
  const slideshow = slideshows[slideshowIndex];
  const section = document.querySelector(slideshow.section);

  if (!section) return;

  const slides = section.querySelectorAll(".slide");
  const dots = section.querySelectorAll(".dot");

  if (!slides.length) return;

  if (slideIndex >= slides.length) {
    slideshow.currentIndex = 0;
  } else if (slideIndex < 0) {
    slideshow.currentIndex = slides.length - 1;
  } else {
    slideshow.currentIndex = slideIndex;
  }

  slides.forEach((slide) => {
    slide.style.display = "none";
  });

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  slides[slideshow.currentIndex].style.display = "block";

  if (dots[slideshow.currentIndex]) {
    dots[slideshow.currentIndex].classList.add("active");
  }
}

function plusSlides(amount, slideshowIndex) {
  const slideshow = slideshows[slideshowIndex];
  showSlide(slideshowIndex, slideshow.currentIndex + amount);
}

function currentSlide(slideNumber, slideshowIndex) {
  showSlide(slideshowIndex, slideNumber - 1);
}

document.addEventListener("DOMContentLoaded", () => {
  slideshows.forEach((_, index) => {
    showSlide(index, 0);
  });
});
