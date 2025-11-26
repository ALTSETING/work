// Зменшення логотипа при скролі
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

  // Появлення секцій при скролі
  document.querySelectorAll('main .feature, main .intro').forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      section.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('load', () => {
  onScroll();
});

// Перемикач фонового градієнта
const bgToggle = document.getElementById('bgToggle');
let flipped = false;
bgToggle.addEventListener('click', () => {
  flipped = !flipped;
  document.documentElement.style.setProperty('--angle', flipped ? '315deg' : '135deg');
});

// Одразу позначити видимими ті секції, що вже на екрані
window.addEventListener('DOMContentLoaded', () => {
  onScroll();
}); 
// === PRELOADER ===
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

const sidePanel = document.getElementById('sidePanel');
const openPanel = document.getElementById('openPanel');
const closePanel = document.getElementById('closePanel');

openPanel.addEventListener('click', () => {
  sidePanel.classList.add('active');
});

closePanel.addEventListener('click', () => {
  sidePanel.classList.remove('active');
});

// ALTSETING login
function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential);
  console.log("Google user:", data);

  const userName = data.name;
  const userEmail = data.email;
  const userPicture = data.picture;

  // Збережемо користувача у localStorage
  localStorage.setItem("alt_user", JSON.stringify({
    name: userName,
    email: userEmail,
    picture: userPicture
  }));

  // Показуємо профіль після входу
  showUserProfile(userName, userPicture);
}

// Відобразимо аватар і ім'я після входу
function showUserProfile(name, pic) {
  const container = document.createElement('div');
  container.className = 'user-profile';
  container.innerHTML = `
    <img src="${pic}" alt="${name}" class="user-avatar">
    <span class="user-name">${name}</span>
  `;
  document.body.prepend(container);
}

//--------------------------------------------------------------------
document.addEventListener('click', e => {
  if (!sidePanel.contains(e.target) && !openPanel.contains(e.target)) {
     sidePanel.classList.remove('active');
  }
});

document.querySelectorAll('.nav-btn').forEach(btn=>{
   btn.addEventListener('click', ()=>{
      const id = btn.innerText.toLowerCase();
      const target = document.getElementById(id);
      if(target) {
         target.scrollIntoView({behavior:'smooth'});
         sidePanel.classList.remove('active');
      }
   });
});

const io = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
     if(entry.isIntersecting){
       entry.target.classList.add("visible");
     }
  });
},{threshold:0.2});

document.querySelectorAll("section").forEach(sec=>io.observe(sec));

if (window.ethereum) {
  ethereum.request({ method: 'eth_requestAccounts' })
    .then(accounts => {
      console.log("Connected:", accounts[0]);
    })
    .catch(err => console.error(err));
}

// Кастомна темна преміальна кнопка → викликає Google Login
document.getElementById("customGoogleBtn").addEventListener("click", () => {
  google.accounts.id.prompt();
});

// Google повертає токен
function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential);

  const userName = data.name;
  const userPicture = data.picture;

  // Збереження
  localStorage.setItem("alt_user", JSON.stringify({
    name: userName,
    picture: userPicture
  }));

  showUserProfile(userName, userPicture);
}

// Малюємо аватар в правому верхньому куті
function showUserProfile(name, pic) {
  // якщо вже є (щоб не дублювалось) — видалити
  const old = document.querySelector(".user-profile");
  if (old) old.remove();

  const container = document.createElement('div');
  container.className = 'user-profile';
  container.innerHTML = `
    <img src="${pic}" alt="${name}" class="user-avatar">
    <span class="user-name">${name}</span>
  `;
  document.body.appendChild(container);
}

// Якщо вже авторизований — показати аватар
const saved = localStorage.getItem("alt_user");
if (saved) {
  const u = JSON.parse(saved);
  showUserProfile(u.name, u.picture);
}








