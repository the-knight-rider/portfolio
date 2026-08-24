// // Mobile menu toggle
// const menuToggle = document.getElementById('menuToggle');
// const navLinks = document.getElementById('navLinks');

// menuToggle.addEventListener('click', () => {
//   navLinks.classList.toggle('active');
// });
// menuToggle.addEventListener('keydown', (e) => {
//   if (e.key === 'Enter' || e.key === ' ') {
//     navLinks.classList.toggle('active');
//   }
// });

// document.querySelectorAll('.nav-links a').forEach(link => {
//   link.addEventListener('click', () => {
//     navLinks.classList.remove('active');
//   });
// });

// // Scroll animations
// const sections = document.querySelectorAll('section');
// const revealSections = () => {
//   const triggerBottom = window.innerHeight * 0.85;
//   const triggerTop = window.innerHeight * 0.15;

//   sections.forEach(section => {
//     const rect = section.getBoundingClientRect();

//     // Add 'visible' class if section is entering viewport from bottom
//     if (rect.top < triggerBottom && rect.bottom > 0) {
//       section.classList.add('visible');
//     } 
//     // Remove 'visible' class if section is completely out of view (above or below)
//     else if (rect.bottom < 0 || rect.top > window.innerHeight) {
//       section.classList.remove('visible');
//     }
//   });
// };
// window.addEventListener('scroll', revealSections);
// window.addEventListener('load', revealSections);

// // Theme toggle
// const themeToggle = document.getElementById('themeToggle');
// const themeIcon = document.getElementById('themeIcon');
// const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// function setTheme(mode) {
//   if (mode === 'dark') {
//     document.body.classList.add('dark-mode');
//     themeIcon.textContent = '☀️';
//     localStorage.setItem('theme', 'dark');
//   } else {
//     document.body.classList.remove('dark-mode');
//     themeIcon.textContent = '🌙';
//     localStorage.setItem('theme', 'light');
//   }
// }

// function getTimeBasedTheme() {
//   const hour = new Date().getHours();
//   return (hour >= 19 || hour < 7) ? 'dark' : 'light';
// }

// // On load: use localStorage, else time-based, else system
// window.addEventListener('DOMContentLoaded', () => {
//   const saved = localStorage.getItem('theme');
//   if (saved === 'dark' || saved === 'light') {
//     setTheme(saved);
//   } else {
//     setTheme(getTimeBasedTheme());
//   }
// });

// themeToggle.addEventListener('click', () => {
//   if (document.body.classList.contains('dark-mode')) {
//     setTheme('light');
//   } else {
//     setTheme('dark');
//   }
// });

// themeToggle.addEventListener('keydown', (e) => {
//   if (e.key === 'Enter' || e.key === ' ') {
//     themeToggle.click();
//   }
// }); 

// // Certifications hover to reveal all details
// const certList = document.querySelector('.cert-list');

// if (certList) {
//   certList.addEventListener('mouseenter', () => {
//     certList.classList.add('reveal-all-details');
//   });

//   certList.addEventListener('mouseleave', () => {
//     certList.classList.remove('reveal-all-details');
//   });
// } 

// ==========================================
// Mobile Menu with Accessibility
// ==========================================
const menuToggle = document.getElementById('menuToggle');
const navLinks  = document.getElementById('navLinks');

function toggleMenu(forceState = null) {
  const isOpen = forceState !== null ? forceState : !navLinks.classList.contains('active');
  navLinks.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  
  if (isOpen) {
    const firstLink = navLinks.querySelector('a');
    if (firstLink) firstLink.focus();
  }
}

menuToggle.addEventListener('click', () => toggleMenu());
menuToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMenu();
  }
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
    toggleMenu(false);
  }
});

// Close menu on Escape + return focus to toggle
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('active')) {
    toggleMenu(false);
    menuToggle.focus();
  }
});

// ==========================================
// Smooth Scroll for Anchor Links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==========================================
// Scroll Reveal (Intersection Observer)
// ==========================================
const sections = document.querySelectorAll('section');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
    // Optional: remove else-block if you want animations to play only once
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

sections.forEach(section => revealObserver.observe(section));

// ==========================================
// Theme Toggle (localStorage > System > Time)
// ==========================================
// const themeToggle  = document.getElementById('themeToggle');
// const themeIcon    = document.getElementById('themeIcon');
// const prefersDark  = window.matchMedia('(prefers-color-scheme: dark)');

// function setTheme(mode) {
//   const isDark = mode === 'dark';
//   document.body.classList.toggle('dark-mode', isDark);
//   themeIcon.textContent = isDark ? '☀️' : '🌙';
//   localStorage.setItem('theme', mode);
// }

// function getTimeBasedTheme() {
//   const hour = new Date().getHours();
//   return (hour >= 19 || hour < 7) ? 'dark' : 'light';
// }

// window.addEventListener('DOMContentLoaded', () => {
//   const saved = localStorage.getItem('theme');
//   if (saved === 'dark' || saved === 'light') {
//     setTheme(saved);
//   } else if (prefersDark.matches) {
//     setTheme('dark');
//   } else {
//     setTheme(getTimeBasedTheme());
//   }
// });
// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Set theme
function setTheme(mode) {
  if (mode === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
  } else {
    document.body.classList.remove('dark-mode');
    themeIcon.textContent = '🌙';
  }
}

// Get theme based on current time
function getTimeBasedTheme() {
  const hour = new Date().getHours();
  return (hour >= 19 || hour < 7) ? 'dark' : 'light';
}

// Apply automatic theme
function applyAutoTheme() {
  const autoTheme = getTimeBasedTheme();
  setTheme(autoTheme);
}

// On page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark' || savedTheme === 'light') {
    // Manual override exists
    setTheme(savedTheme);
  } else {
    // No manual override → follow time
    applyAutoTheme();
  }
});

// Manual theme toggle
themeToggle.addEventListener('click', () => {
  const currentTheme = document.body.classList.contains('dark-mode')
    ? 'dark'
    : 'light';

  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  // Save manual choice
  localStorage.setItem('theme', newTheme);

  // Apply manual choice
  setTheme(newTheme);
});

// Keyboard support
themeToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    themeToggle.click();
  }
});

// Respect live system theme changes (only if user hasn't manually set)
prefersDark.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

themeToggle.addEventListener('click', () => {
  setTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark');
});

themeToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    themeToggle.click();
  }
});

// ==========================================
// Certifications Reveal (Mouse + Touch)
// ==========================================
const certList = document.querySelector('.cert-list');
if (certList) {
  // Desktop: hover reveals all
  certList.addEventListener('mouseenter', () => {
    certList.classList.add('reveal-all-details');
  });
  certList.addEventListener('mouseleave', () => {
    certList.classList.remove('reveal-all-details');
  });

  // Mobile/Tablet: tap a card to toggle its details
  const certCards = certList.querySelectorAll('.cert-card');
  certCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Prevent bubbling if clicking a link inside
      if (e.target.closest('a')) return;
      
      const isActive = card.classList.contains('active');
      certCards.forEach(c => c.classList.remove('active'));
      if (!isActive) card.classList.add('active');
    });
  });
}

// ==========================================
// Contact Form (moved from inline HTML)
// ==========================================
const form = document.forms['submit-to-google-sheet'];
if (form) {
  // const scriptURL = 'https://script.google.com/macros/s/AKfycbxgCUaDotppj3P8dnsgd2goUnN-AQZc27SiNu0d2T462IJ7_SJgR4xuU1AtgvcbqjyN/exec';
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwcxrrGSAuOciykOl6-ZHh3riRnh66URapDq32CcOAt6wLq3VP7N9WNhU5Q5_fm-933aw/exec';
  const formMsg   = document.getElementById('msg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.classList.add('is-submitting');
    if (formMsg) {
      formMsg.innerHTML = '';
      formMsg.classList.remove('success', 'error');
    }

    const formData = new FormData(form);
    const timestamp = new Date().toLocaleString('en-US', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    });
    formData.append('Timestamp', timestamp);

    fetch(scriptURL, { method: 'POST', body: formData })
      .then(() => {
        form.classList.remove('is-submitting');
        if (formMsg) {
          formMsg.textContent = 'Message Sent Successfully';
          formMsg.classList.add('success');
          setTimeout(() => {
            formMsg.textContent = '';
            formMsg.classList.remove('success');
          }, 5000);
        }
        form.reset();
      })
      .catch((error) => {
        form.classList.remove('is-submitting');
        console.error('Error!', error.message);
        if (formMsg) {
          formMsg.textContent = 'Error sending message. Please try again.';
          formMsg.classList.add('error');
          setTimeout(() => {
            formMsg.textContent = '';
            formMsg.classList.remove('error');
          }, 5000);
        }
      });
  });
}

// ==========================================
// Optional: Hide header on scroll down
// ==========================================
let lastScroll = 0;
const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', () => {
    const current = window.pageYOffset;
    if (current <= 0) {
      header.style.transform = 'translateY(0)';
    } else if (current > lastScroll && current > 80) {
      header.style.transform = 'translateY(-100%)'; // hide
    } else {
      header.style.transform = 'translateY(0)'; // show
    }
    lastScroll = current;
  });
}