let slideIndex = [1, 1];
let slideId = ["graphicSlides", "webSlides"];

showSlides(1, 0);
showSlides(1, 1);

// Next/previous controls
function plusSlides(n, no) {
  slideIndex[no] += n;
  showSlides(slideIndex[no], no);
}

// Dot image controls
function currentSlide(n, no) {
  slideIndex[no] = n;
  showSlides(n, no);
}

function showSlides(n, no) {
  let i;
  let slides = document.getElementsByClassName(slideId[no]);
  let dots = document.querySelectorAll(`#${no === 0 ? "graphic-design" : "web-design"} .dot`);

  if (n > slides.length) {
    slideIndex[no] = 1;
  }
  if (n < 1) {
    slideIndex[no] = slides.length;
  }

  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Remove active class from dots
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  // Show current slide
  slides[slideIndex[no] - 1].style.display = "block";

  // Activate current dot
  dots[slideIndex[no] - 1].classList.add("active");
}
