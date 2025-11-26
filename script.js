// ==================== PRELOADER ====================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const mainContent = document.getElementById("main-content");

  setTimeout(() => {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      mainContent.style.opacity = "1";
      mainContent.style.visibility = "visible";
    }, 800);
  }, 1000); // 1 секунда перед зникненням
});

// ==================== LOGO SCROLL ====================
const logo = document.getElementById('heroLogo');
const START_SCALE = 1.0;
const END_SCALE = 0.35;
const SCROLL_RANGE = 400;

const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

function onScroll() {
  const t = clamp(window.scrollY / SCROLL_RANGE, 0, 1);
  const scale = START_SCALE + (END_SCALE - START_SCALE) * t;
  const translateY = -20 * t;
  logo.style.transform = `translateY(${translateY}px) scale(${scale})`;
  if (t > 0.02) logo.classList.add('scrolled');
  else logo.classList.remove('scrolled');

  // Відображення секцій
  document.querySelectorAll('main .feature, main .intro').forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      section.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('DOMContentLoaded', onScroll);

// ==================== BACKGROUND TOGGLE ====================
const bgToggle = document.getElementById('bgToggle');
let flipped = false;
bgToggle.addEventListener('click', () => {
  flipped = !flipped;
  document.documentElement.style.setProperty('--angle', flipped ? '315deg' : '135deg');
});

// ==================== SIDE PANEL ====================
const sidePanel = document.getElementById('sidePanel');
const openPanel = document.getElementById('openPanel');
const closePanel = document.getElementById('closePanel');

openPanel.addEventListener('click', () => sidePanel.classList.add('active'));
closePanel.addEventListener('click', () => sidePanel.classList.remove('active'));

// Закриття при кліку поза панеллю
document.addEventListener('click', e => {
  if (!sidePanel.contains(e.target) && !openPanel.contains(e.target)) {
    sidePanel.classList.remove('active');
  }
});

// Навігація по секціях
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.innerText.toLowerCase();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      sidePanel.classList.remove('active');
    }
  });
});

// ==================== RIGHT PANEL ====================
const rightPanel = document.getElementById("rightPanel");
const openRightPanel = document.getElementById("openRightPanel");
const closeRightPanel = document.getElementById("closeRightPanel");

openRightPanel.addEventListener("click", () => rightPanel.classList.add("active"));
closeRightPanel.addEventListener("click", () => rightPanel.classList.remove("active"));

document.addEventListener("click", e => {
  if (!rightPanel.contains(e.target) && !openRightPanel.contains(e.target)) {
    rightPanel.classList.remove("active");
  }
});

// ==================== GOOGLE LOGIN ====================
const customGoogleBtn = document.getElementById("customGoogleBtn");
customGoogleBtn.addEventListener("click", () => {
  google.accounts.id.prompt();
});

// Обробка відповіді Google
function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential);

  const userName = data.name;
  const userPicture = data.picture;

  // Збереження
  localStorage.setItem("alt_user", JSON.stringify({ name: userName, picture: userPicture }));

  showUserProfile(userName, userPicture);
}

// Відображення профілю в правій панелі
function showUserProfile(name, pic) {
  const container = document.getElementById("googleProfileArea");
  container.innerHTML = `
    <div class="right-user-box">
        <img src="${pic}" class="right-user-avatar" alt="${name}">
        <span class="right-user-name">${name}</span>
    </div>
  `;
}

// Показати профіль якщо вже авторизований
const savedUser = localStorage.getItem("alt_user");
if (savedUser) {
  const u = JSON.parse(savedUser);
  showUserProfile(u.name, u.picture);
}

// ==================== INTERSECTION OBSERVER ====================
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll("section").forEach(sec => io.observe(sec));

// ==================== ETHEREUM WALLET ====================
if (window.ethereum) {
  ethereum.request({ method: 'eth_requestAccounts' })
    .then(accounts => console.log("Connected:", accounts[0]))
    .catch(err => console.error(err));
}
