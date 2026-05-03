// === NAVBAR SCROLL EFFECT ===
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// === MOBILE MENU TOGGLE ===
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const spans = menuToggle.querySelectorAll('span');
  if (navLinks.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// === SCROLL REVEAL ANIMATION ===
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// === COUNTER ANIMATION ===
const counters = document.querySelectorAll('[data-count]');
let countStarted = false;

const animateCounters = () => {
  if (countStarted) return;
  const statsBar = document.querySelector('.stats-bar');
  if (!statsBar) return;
  const top = statsBar.getBoundingClientRect().top;
  if (top < window.innerHeight - 50) {
    countStarted = true;
    counters.forEach(counter => {
      const target = counter.getAttribute('data-count');
      const isDecimal = target.includes('.');
      const targetNum = parseFloat(target.replace(/[^0-9.]/g, ''));
      const suffix = target.replace(/[0-9.]/g, '');
      const duration = 2000;
      const startTime = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * targetNum;

        if (isDecimal) {
          counter.textContent = current.toFixed(1) + suffix;
        } else {
          counter.textContent = Math.floor(current).toLocaleString('id-ID') + suffix;
        }

        if (progress < 1) requestAnimationFrame(update);
        else {
          if (isDecimal) counter.textContent = parseFloat(target).toFixed(1) + suffix;
          else counter.textContent = target;
        }
      };
      requestAnimationFrame(update);
    });
  }
};
window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// === SMOOTH SCROLL FOR NAV LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu
      navLinks.classList.remove('active');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
});

// === PARALLAX ON HERO IMAGE ===
const heroImg = document.querySelector('.hero-image img');
if (heroImg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroImg.style.transform = `translateY(${scrolled * 0.08}px)`;
  });
}

// === TILT EFFECT ON FEATURE CARDS ===
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// === CURSOR GLOW EFFECT ===
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position:fixed; width:300px; height:300px; border-radius:50%;
  background: radial-gradient(circle, rgba(0,212,255,0.04), transparent 70%);
  pointer-events:none; z-index:9999; transform:translate(-50%,-50%);
  transition: opacity 0.3s;
`;
document.body.appendChild(cursorGlow);
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});
