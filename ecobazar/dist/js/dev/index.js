import "./app.min.js";
import "./slider.min.js";
import "./products.min.js";
const countdowns = document.querySelectorAll("[data-coundown]");
if (countdowns.length) {
  const updateCountdowns = () => {
    countdowns.forEach((item) => {
      const goalTime = item.dataset.coundown;
      if (!goalTime) return;
      const timeGoal = Date.parse(goalTime);
      let timeLeft = timeGoal - Date.now();
      if (timeLeft < 0) timeLeft = 0;
      const MSECONDS_PER_DAY = 1e3 * 60 * 60 * 24;
      const MSECONDS_PER_HOUR = 1e3 * 60 * 60;
      const MSECONDS_PER_MIN = 1e3 * 60;
      const MSECONDS_PER_SEC = 1e3;
      const days = Math.floor(timeLeft / MSECONDS_PER_DAY);
      const hours = Math.floor(timeLeft % MSECONDS_PER_DAY / MSECONDS_PER_HOUR);
      const minutes = Math.floor(timeLeft % MSECONDS_PER_HOUR / MSECONDS_PER_MIN);
      const seconds = Math.floor(timeLeft % MSECONDS_PER_MIN / MSECONDS_PER_SEC);
      const spans = item.querySelectorAll(".countdown__digits span");
      if (!spans.length) return;
      spans[0].textContent = String(days).padStart(2, `0`);
      spans[1].textContent = String(hours).padStart(2, `0`);
      spans[2].textContent = String(minutes).padStart(2, `0`);
      spans[3].textContent = String(seconds).padStart(2, `0`);
    });
  };
  updateCountdowns();
  setInterval(updateCountdowns, 1e3);
}
