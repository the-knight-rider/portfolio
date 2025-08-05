// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
menuToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    navLinks.classList.toggle('active');
  }
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Scroll animations
const sections = document.querySelectorAll('section');
const revealSections = () => {
  const triggerBottom = window.innerHeight * 0.85;
  const triggerTop = window.innerHeight * 0.15;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();

    // Add 'visible' class if section is entering viewport from bottom
    if (rect.top < triggerBottom && rect.bottom > 0) {
      section.classList.add('visible');
    } 
    // Remove 'visible' class if section is completely out of view (above or below)
    else if (rect.bottom < 0 || rect.top > window.innerHeight) {
      section.classList.remove('visible');
    }
  });
};
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(mode) {
  if (mode === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    themeIcon.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
}

function getTimeBasedTheme() {
  const hour = new Date().getHours();
  return (hour >= 19 || hour < 7) ? 'dark' : 'light';
}

// On load: use localStorage, else time-based, else system
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') {
    setTheme(saved);
  } else {
    setTheme(getTimeBasedTheme());
  }
});

themeToggle.addEventListener('click', () => {
  if (document.body.classList.contains('dark-mode')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

themeToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    themeToggle.click();
  }
}); 

// Certifications hover to reveal all details
const certList = document.querySelector('.cert-list');

if (certList) {
  certList.addEventListener('mouseenter', () => {
    certList.classList.add('reveal-all-details');
  });

  certList.addEventListener('mouseleave', () => {
    certList.classList.remove('reveal-all-details');
  });
} 