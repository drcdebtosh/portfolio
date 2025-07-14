// === 1. Mobile menu toggle ===
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// === 2. Typing animation ===
const titles = ["Backend Developer", "Software Engineer", "Cloud Enthusiast"];
let titleIndex = 0, charIndex = 0, isDeleting = false;
const typingSpeedBase = 100, deletingSpeedBase = 50, pauseBetween = 1500;
const txtEl = document.getElementById("typing-text");

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function typeLoop() {
  const fullText = titles[titleIndex];
  if (!isDeleting) {
    txtEl.textContent = fullText.slice(0, ++charIndex);
    if (charIndex === fullText.length) {
      isDeleting = true;
      return setTimeout(typeLoop, pauseBetween);
    }
  } else {
    txtEl.textContent = fullText.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
    }
  }
  const delay = isDeleting
    ? randomBetween(deletingSpeedBase, deletingSpeedBase + 50)
    : randomBetween(typingSpeedBase, typingSpeedBase + 100);
  setTimeout(typeLoop, delay);
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeLoop, 500);

 
});
