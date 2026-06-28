import "./main.min.js";
import "./slider.min.js";
import "./common.min.js";
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".carousel3d__item");
  const dots = document.querySelectorAll(".dot");
  let current = 1;
  function updateCarousel(index) {
    current = index;
    items.forEach((item, i) => {
      item.classList.remove("left", "active", "right");
      if (i === current) {
        item.classList.add("active");
      } else if (i === (current - 1 + items.length) % items.length) {
        item.classList.add("left");
      } else if (i === (current + 1) % items.length) {
        item.classList.add("right");
      }
    });
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[current].classList.add("active");
  }
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      updateCarousel(parseInt(dot.dataset.index));
    });
  });
  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      updateCarousel(index);
    });
  });
});
