// === 1. Mobile menu toggle ===
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// === 2. Animated text for hero section with fade/typing ===
const roles = ["Backend Developer", "Student", "Software Engineer"];
let roleIndex = 0;
const animatedTextEl = document.getElementById("animated-text");

function typeRole(role, callback) {
  let i = 0;
  animatedTextEl.textContent = "";
  animatedTextEl.classList.remove("fade-out");
  animatedTextEl.classList.add("fade-in");
  function type() {
    if (i < role.length) {
      animatedTextEl.textContent += role.charAt(i);
      i++;
      setTimeout(type, 45); // typing speed
    } else {
      setTimeout(callback, 1200); // visible duration
    }
  }
  type();
}

function eraseRole(callback) {
  let text = animatedTextEl.textContent;
  let i = text.length;
  animatedTextEl.classList.remove("fade-in");
  animatedTextEl.classList.add("fade-out");
  function erase() {
    if (i > 0) {
      animatedTextEl.textContent = text.substring(0, i - 1);
      i--;
      setTimeout(erase, 30); // erase speed
    } else {
      setTimeout(callback, 200); // short pause before next
    }
  }
  erase();
}

function loopRoles() {
  typeRole(roles[roleIndex], () => {
    eraseRole(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      loopRoles();
    });
  });
}

if (animatedTextEl) {
  loopRoles();
}

// === 3. Dark mode toggle ===
function setDarkMode(enabled) {
  document.body.classList.toggle("dark-mode", enabled);
}
const themeToggle = document.getElementById("theme-toggle");
const themeToggleMobile = document.getElementById("theme-toggle-mobile");
const footerThemeToggleBtn = document.getElementById("footer-theme-toggle-btn");
const themeIcon = document.getElementById("theme-icon");
const navbarThemeToggleBtn = document.getElementById("navbar-theme-toggle-btn");
const navbarThemeIcon = document.getElementById("navbar-theme-icon");
if (themeToggle) {
  themeToggle.addEventListener("change", e => {
    setDarkMode(e.target.checked);
    if (themeIcon) themeIcon.textContent = e.target.checked ? "☀️" : "🌙";
  });
}
if (themeToggleMobile) {
  themeToggleMobile.addEventListener("change", e => setDarkMode(e.target.checked));
}
if (footerThemeToggleBtn) {
  footerThemeToggleBtn.addEventListener("click", () => {
    const enabled = !document.body.classList.contains("dark-mode");
    setDarkMode(enabled);
    if (themeToggle) themeToggle.checked = enabled;
    if (themeIcon) themeIcon.textContent = enabled ? "☀️" : "🌙";
  });
}
if (navbarThemeToggleBtn) {
  navbarThemeToggleBtn.addEventListener("click", () => {
    const enabled = !document.body.classList.contains("dark-mode");
    setDarkMode(enabled);
    if (navbarThemeIcon) navbarThemeIcon.textContent = enabled ? "☀️" : "🌙";
    if (themeToggle) themeToggle.checked = enabled;
    if (themeIcon) themeIcon.textContent = enabled ? "☀️" : "🌙";
  });
}

// === 4. Contact form submission (basic, no backend) ===
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      alert("Thank you for your message!");
      contactForm.reset();
    });
  }
});

// === Hamburger menu toggle ===
const hamburgerIcon = document.getElementById("hamburger-icon");
const menuLinks = document.getElementById("menu-links");
if (hamburgerIcon && menuLinks) {
  hamburgerIcon.addEventListener("click", () => {
    hamburgerIcon.classList.toggle("open");
    menuLinks.classList.toggle("open");
  });
}
