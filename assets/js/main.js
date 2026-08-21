/**
 * Embedded Systems Learning Platform - Main JS Engine
 * Handles theme toggling, search filtering, copy code, lightbox, and interactive calculators
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSearchAndFilter();
  initCopyButtons();
  initImageLightbox();
  initScrollSpy();
  initCalculators();
});

/* 1. Theme Management (Dark / Light) */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle i');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

/* 2. Real-time Search & Filter Pills */
function initSearchAndFilter() {
  const searchInput = document.getElementById('search-input');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.solution-card');

  let currentCategory = 'all';
  let searchQuery = '';

  function filterCards() {
    let matchCount = 0;
    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardText = card.textContent.toLowerCase();

      const matchesCategory = currentCategory === 'all' || cardCategory.includes(currentCategory);
      const matchesSearch = searchQuery === '' || cardText.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'block';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const countDisplay = document.getElementById('match-count');
    if (countDisplay) {
      countDisplay.textContent = `${matchCount} ข้อ`;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterCards();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter') || 'all';
      filterCards();
    });
  });
}

/* 3. Copy Code to Clipboard */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.btn-copy');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const wrapper = btn.closest('.code-wrapper');
      const code = wrapper ? wrapper.querySelector('.code-content').innerText : '';
      navigator.clipboard.writeText(code).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.color = '#34d399';
        btn.style.borderColor = '#34d399';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 2000);
      });
    });
  });
}

/* 4. Image Lightbox Modal */
function initImageLightbox() {
  const images = document.querySelectorAll('.diagram-card img, .exam-photo img');
  if (images.length === 0) return;

  // Create modal element
  const modal = document.createElement('div');
  modal.className = 'lightbox-modal';
  modal.innerHTML = `
    <div class="lightbox-backdrop"></div>
    <div class="lightbox-container">
      <img src="" alt="Zoomed view" class="lightbox-img">
      <div class="lightbox-caption"></div>
      <button class="lightbox-close">&times;</button>
    </div>
  `;
  document.body.appendChild(modal);

  // Add styles for lightbox
  const style = document.createElement('style');
  style.textContent = `
    .lightbox-modal {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      z-index: 1000;
      display: none;
      align-items: center;
      justify-content: center;
    }
    .lightbox-modal.active { display: flex; }
    .lightbox-backdrop {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(8px);
    }
    .lightbox-container {
      position: relative;
      z-index: 1001;
      max-width: 90vw;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .lightbox-img {
      max-width: 100%;
      max-height: 80vh;
      border-radius: 8px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.8);
      border: 1px solid rgba(255,255,255,0.1);
    }
    .lightbox-caption {
      color: #f8fafc;
      margin-top: 1rem;
      font-size: 0.95rem;
      text-align: center;
    }
    .lightbox-close {
      position: absolute;
      top: -2.5rem;
      right: 0;
      background: none;
      border: none;
      color: #ffffff;
      font-size: 2rem;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  const modalImg = modal.querySelector('.lightbox-img');
  const modalCaption = modal.querySelector('.lightbox-caption');
  const closeBtn = modal.querySelector('.lightbox-close');
  const backdrop = modal.querySelector('.lightbox-backdrop');

  images.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modalCaption.textContent = img.alt || '';
      modal.classList.add('active');
    });
  });

  function closeModal() { modal.classList.remove('active'); }
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* 5. ScrollSpy for Sidebar TOC */
function initScrollSpy() {
  const tocLinks = document.querySelectorAll('.toc-item a');
  const cards = document.querySelectorAll('.solution-card');

  if (tocLinks.length === 0 || cards.length === 0) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 120;

    cards.forEach(card => {
      const top = card.offsetTop;
      const height = card.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = card.id;
      }
    });

    tocLinks.forEach(link => {
      link.closest('.toc-item').classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.closest('.toc-item').classList.add('active');
      }
    });
  });
}

/* 6. Interactive 8051 Machine Cycle Calculator */
function initCalculators() {
  const calcBtn = document.getElementById('btn-calc-freq');
  if (!calcBtn) return;

  calcBtn.addEventListener('click', () => {
    const freqInput = document.getElementById('calc-crystal-freq');
    const freqVal = parseFloat(freqInput.value);
    if (isNaN(freqVal) || freqVal <= 0) return;

    const fMachine = freqVal / 12; // in MHz
    const tMachine = 12 / freqVal; // in microseconds
    const tMachineNs = tMachine * 1000; // in nanoseconds

    const resF = document.getElementById('calc-res-f');
    const resT = document.getElementById('calc-res-t');
    const resTNs = document.getElementById('calc-res-tns');

    if (resF) resF.textContent = `${fMachine.toFixed(6)} MHz`;
    if (resT) resT.textContent = `${tMachine.toFixed(6)} µs`;
    if (resTNs) resTNs.textContent = `${tMachineNs.toFixed(2)} ns`;
  });
}
