// ==================== PRELOADER ====================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.classList.add("fade-out");
  setTimeout(() => preloader.style.display = "none", 800);
});

// ==================== LOGO SCROLL ====================
const logo = document.getElementById('heroLogo');
const START_SCALE = 1;
const END_SCALE = 0.7;
const SCROLL_RANGE = 400;

function clamp(n, min, max) { return Math.min(Math.max(n, min), max); }

function onScroll() {
  const t = clamp(window.scrollY / SCROLL_RANGE, 0, 1);
  const scale = START_SCALE + (END_SCALE - START_SCALE) * t;
  const translateY = -20 * t;
  logo.style.transform = `translateY(${translateY}px) scale(${scale})`;

  document.querySelectorAll('main .feature, main .intro').forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) section.classList.add('visible');
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('DOMContentLoaded', onScroll);

// ==================== SIDE PANEL ====================
const sidePanel = document.getElementById('sidePanel');
const openPanel = document.getElementById('openPanel');
const closePanel = document.getElementById('closePanel');

openPanel.addEventListener('click', () => sidePanel.classList.add('active'));
closePanel.addEventListener('click', () => sidePanel.classList.remove('active'));

document.addEventListener('click', e => {
  if (!sidePanel.contains(e.target) && !openPanel.contains(e.target)) sidePanel.classList.remove('active');
});
