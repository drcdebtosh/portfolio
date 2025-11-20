// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links li a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }));
}

// Scroll Reveal Animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.1
});

const hiddenElements = document.querySelectorAll(".hidden, .section-title, .about-content, .experience-content, .skills-container, .project-grid, #contact p, #contact h2, #contact a");
hiddenElements.forEach((el) => {
  el.classList.add("hidden"); // Ensure they start hidden
  observer.observe(el);
});

// Typing Effect for Hero Code Window (Optional enhancement)
const codeLines = document.querySelectorAll('.code-line');
codeLines.forEach((line, index) => {
  line.style.opacity = '0';
  line.style.animation = `fadeIn 0.5s ease forwards ${index * 0.2 + 0.5}s`;
});

// Add keyframes for fade in if not present in CSS, or just use JS transitions
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes fadeIn {
    to { opacity: 1; }
  }
`;
document.head.appendChild(styleSheet);
