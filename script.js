/*
  Portfolio Interactions
  ----------------------
  Keep behavior modular:
  - Scroll progress bar
  - Reveal on scroll animation
  - Mobile menu toggle
  - Active nav links by section
  - Dynamic footer year
*/

// Utility shortcut for query selection
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

// 1) Dynamic year in footer
const yearEl = $("#year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// 2) Scroll progress bar
const progressBar = $("#scroll-progress");
function updateScrollProgress() {
  if (!progressBar) return;

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

// 3) Reveal animation on scroll
const revealEls = $$(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  // Fallback for older browsers
  revealEls.forEach((el) => el.classList.add("visible"));
}

// 4) Mobile menu toggle
const menuToggle = $("#menu-toggle");
const mobileMenu = $("#mobile-menu");
const mobileLinks = $$(".mobile-link");

function closeMobileMenu() {
  if (!menuToggle || !mobileMenu) return;
  mobileMenu.classList.add("hidden");
  menuToggle.setAttribute("aria-expanded", "false");
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden");
    menuToggle.setAttribute("aria-expanded", String(isHidden));
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Close menu automatically when entering desktop view
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) closeMobileMenu();
  });
}

// 5) Highlight active nav section
const sections = $$("main section[id]");
const navLinks = $$("a.nav-link, a.mobile-link");

function setActiveLink() {
  const currentPos = window.scrollY + 140;
  let currentId = "";

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (currentPos >= top && currentPos < bottom) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const isActive = href === `#${currentId}`;
    link.classList.toggle("text-brand-400", isActive);
    link.classList.toggle("font-semibold", isActive);
  });
}

window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("resize", setActiveLink);
setActiveLink();

// 6) Contact form mailto fallback (no backend required)
const contactForm = $("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = $("#name", contactForm)?.value?.trim() || "";
    const email = $("#email", contactForm)?.value?.trim() || "";
    const message = $("#message", contactForm)?.value?.trim() || "";

    const subject = encodeURIComponent(`Portfolio Contact from ${name || "Website Visitor"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:alekhyanimmala4001@gmail.com?subject=${subject}&body=${body}`;
  });
}

// 7) Prevent placeholder anchors from jumping to top
$$("a.link-placeholder").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.getAttribute("href") === "#") event.preventDefault();
  });
});
