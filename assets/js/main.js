/**
 * Embedded Systems Learning Platform - Main JS Engine
 *
 * The theme is applied before first paint by the inline boot script in every
 * page <head>; this file never re-applies it on load. It only wires the toggle.
 */

document.addEventListener('DOMContentLoaded', function () {
  initThemeToggle();
  initMegaMenu();
  initMobileNav();
  initMobileToc();
  initSearchAndFilter();
  initCopyButtons();
  initImageLightbox();
  initScrollSpy();
  initResponsiveTables();
  initCalculators();
});

/* 1. Theme toggle (icon is chosen by CSS from [data-theme]; no DOM swap needed) */
function readStoredTheme() {
  try {
    return localStorage.getItem('theme');
  } catch (e) {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {
    /* storage blocked (private mode, file://): the choice lasts for this page only */
  }
}

function syncThemeToggle(toggleBtn, theme) {
  var next = theme === 'dark' ? 'โหมดสว่าง' : 'โหมดมืด';
  toggleBtn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
  toggleBtn.setAttribute('aria-label', 'สลับเป็น' + next);
  toggleBtn.setAttribute('title', 'สลับเป็น' + next);
}

function initThemeToggle() {
  var toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  syncThemeToggle(toggleBtn, document.documentElement.getAttribute('data-theme') || 'dark');

  toggleBtn.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme') || 'dark';
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    storeTheme(next);
    syncThemeToggle(toggleBtn, next);
  });

  // Keep other open tabs in step when the theme changes elsewhere
  window.addEventListener('storage', function (e) {
    if (e.key === 'theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
      document.documentElement.setAttribute('data-theme', e.newValue);
      syncThemeToggle(toggleBtn, e.newValue);
    }
  });
}

/* 1b. Desktop mega menu: click / tap, hover (mouse only, with close delay), keyboard, outside click */
function initMegaMenu() {
  var groups = Array.prototype.slice.call(document.querySelectorAll('.nav-menu .nav-group'));
  if (groups.length === 0) return;

  function setOpen(group, open) {
    group.classList.toggle('open', open);
    var btn = group.querySelector('.nav-group-toggle');
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function closeAll(except) {
    groups.forEach(function (g) { if (g !== except) setOpen(g, false); });
  }

  groups.forEach(function (group) {
    var btn = group.querySelector('.nav-group-toggle');
    var closeTimer = null;

    btn.addEventListener('click', function () {
      var open = !group.classList.contains('open');
      closeAll(group);
      setOpen(group, open);
    });

    group.addEventListener('pointerenter', function (e) {
      if (e.pointerType !== 'mouse') return;
      window.clearTimeout(closeTimer);
      closeAll(group);
      setOpen(group, true);
    });

    group.addEventListener('pointerleave', function (e) {
      if (e.pointerType !== 'mouse') return;
      closeTimer = window.setTimeout(function () { setOpen(group, false); }, 180);
    });

    group.addEventListener('focusout', function (e) {
      if (!group.contains(e.relatedTarget)) setOpen(group, false);
    });

    group.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && group.classList.contains('open')) {
        setOpen(group, false);
        btn.focus();
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-group')) closeAll(null);
  });
}

/* 2. Mobile Navigation Drawer */
function initMobileNav() {
  var toggleBtn = document.querySelector('.mobile-nav-toggle');
  var drawer = document.querySelector('.mobile-drawer');
  if (!toggleBtn || !drawer) return;

  function setOpen(open) {
    drawer.classList.toggle('active', open);
    drawer.style.display = open ? 'block' : 'none';
    toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    var icon = toggleBtn.querySelector('i');
    if (icon) icon.className = open ? 'fas fa-times' : 'fas fa-bars';
  }

  toggleBtn.addEventListener('click', function () {
    setOpen(!drawer.classList.contains('active'));
  });

  drawer.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setOpen(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('active')) setOpen(false);
  });
}

/* 3. Mobile Floating Table of Contents Modal */
function initMobileToc() {
  var floatingBtn = document.getElementById('mobile-toc-toggle');
  var tocList = document.querySelector('.sidebar-toc .toc-list');
  if (!floatingBtn || !tocList) return;

  var totalItems = tocList.querySelectorAll('.toc-item').length;

  var modal = document.createElement('div');
  modal.className = 'mobile-toc-modal';
  modal.innerHTML =
    '<div class="mobile-toc-backdrop"></div>' +
    '<div class="mobile-toc-container" role="dialog" aria-modal="true" aria-label="สารบัญเนื้อหา">' +
      '<div class="mobile-toc-header">' +
        '<h4 style="display:flex; align-items:center; gap:var(--space-2); font-size:1rem; color:var(--text-primary);">' +
          '<i class="fas fa-list-ul" style="color:var(--accent-blue);"></i> สารบัญเนื้อหา (' + totalItems + ' ข้อ)' +
        '</h4>' +
        '<button class="mobile-toc-close btn-icon" type="button" aria-label="ปิดสารบัญ" style="width:32px; height:32px;">&times;</button>' +
      '</div>' +
      '<div class="mobile-toc-content"><ul class="toc-list">' + tocList.innerHTML + '</ul></div>' +
    '</div>';
  document.body.appendChild(modal);

  var closeBtn = modal.querySelector('.mobile-toc-close');
  var backdrop = modal.querySelector('.mobile-toc-backdrop');

  function openModal() { modal.classList.add('active'); }
  function closeModal() { modal.classList.remove('active'); }

  floatingBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  modal.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
}

/* 4. Real-time Search & Filter Pills */
function initSearchAndFilter() {
  var searchInput = document.getElementById('search-input') || document.getElementById('question-search');
  var filterBtns = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.solution-card');

  var currentCategory = 'all';
  var searchQuery = '';

  function filterCards() {
    var matchCount = 0;
    cards.forEach(function (card) {
      var cardCategory = card.getAttribute('data-category') || '';
      var cardText = card.textContent.toLowerCase();
      var matchesCategory = currentCategory === 'all' || cardCategory.indexOf(currentCategory) !== -1;
      var matchesSearch = searchQuery === '' || cardText.indexOf(searchQuery) !== -1;
      var visible = matchesCategory && matchesSearch;
      card.style.display = visible ? 'block' : 'none';
      if (visible) matchCount++;
    });

    var countDisplay = document.getElementById('match-count') || document.getElementById('visible-count');
    if (countDisplay) countDisplay.textContent = String(matchCount);
  }

  if (searchInput) {
    searchInput.addEventListener('input', function (e) {
      searchQuery = e.target.value.toLowerCase().trim();
      filterCards();
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      currentCategory = btn.getAttribute('data-category') || btn.getAttribute('data-filter') || 'all';
      filterCards();
    });
  });
}

/* 5. Copy Code to Clipboard (Clipboard API, with a fallback for file:// and older browsers) */
function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise(function (resolve, reject) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(area);
    if (ok) { resolve(); } else { reject(new Error('copy failed')); }
  });
}

function initCopyButtons() {
  document.querySelectorAll('.btn-copy').forEach(function (btn) {
    var label = btn.textContent.trim() || 'Copy Code';
    btn.setAttribute('type', 'button');

    function flash(cls, text) {
      btn.classList.remove('is-copied', 'is-failed');
      btn.classList.add(cls);
      btn.innerHTML = text;
      window.setTimeout(function () {
        btn.classList.remove(cls);
        btn.textContent = label;
      }, 2000);
    }

    btn.addEventListener('click', function () {
      var wrapper = btn.closest('.code-wrapper');
      var codeEl = wrapper ? wrapper.querySelector('.code-content') : null;
      if (!codeEl) return;
      copyText(codeEl.innerText).then(function () {
        flash('is-copied', '<i class="fas fa-check" aria-hidden="true"></i> Copied');
      }, function () {
        flash('is-failed', '<i class="fas fa-times" aria-hidden="true"></i> Copy failed');
      });
    });
  });
}

/* 6. Image Lightbox Modal (styles live in solution.css) */
function initImageLightbox() {
  var images = document.querySelectorAll('.diagram-card img, .exam-photo img');
  if (images.length === 0) return;

  var modal = document.createElement('div');
  modal.className = 'lightbox-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML =
    '<div class="lightbox-backdrop"></div>' +
    '<div class="lightbox-container">' +
      '<img src="" alt="Zoomed view" class="lightbox-img">' +
      '<div class="lightbox-caption"></div>' +
      '<button class="lightbox-close" type="button" aria-label="ปิดภาพขยาย">&times;</button>' +
    '</div>';
  document.body.appendChild(modal);

  var modalImg = modal.querySelector('.lightbox-img');
  var modalCaption = modal.querySelector('.lightbox-caption');
  var closeBtn = modal.querySelector('.lightbox-close');
  var backdrop = modal.querySelector('.lightbox-backdrop');

  images.forEach(function (img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () {
      modalImg.src = img.src;
      modalImg.alt = img.alt || '';
      modalCaption.textContent = img.alt || '';
      modal.classList.add('active');
    });
  });

  function closeModal() { modal.classList.remove('active'); }
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
}

/* 7. Auto-wrap Tables in .table-responsive */
function initResponsiveTables() {
  document.querySelectorAll('table.custom-table').forEach(function (table) {
    if (!table.parentElement.classList.contains('table-responsive')) {
      var wrapper = document.createElement('div');
      wrapper.className = 'table-responsive';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });
}

/* 8. ScrollSpy for Sidebar TOC (rAF-throttled) */
function initScrollSpy() {
  var tocLinks = document.querySelectorAll('.sidebar-toc .toc-item a');
  var cards = document.querySelectorAll('.solution-card');
  if (tocLinks.length === 0 || cards.length === 0) return;

  var ticking = false;
  function update() {
    ticking = false;
    var currentId = '';
    var scrollPosition = window.scrollY + 140;
    cards.forEach(function (card) {
      var top = card.offsetTop;
      if (scrollPosition >= top && scrollPosition < top + card.offsetHeight) currentId = card.id;
    });
    tocLinks.forEach(function (link) {
      var item = link.closest('.toc-item');
      item.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });
}

/* 9. Interactive 8051 Machine Cycle Calculator */
function initCalculators() {
  var calcBtn = document.getElementById('btn-calc-freq');
  if (!calcBtn) return;

  calcBtn.addEventListener('click', function () {
    var freqInput = document.getElementById('calc-crystal-freq');
    var freqVal = parseFloat(freqInput.value);
    if (isNaN(freqVal) || freqVal <= 0) return;

    var fMachine = freqVal / 12;
    var tMachine = 12 / freqVal;
    var tMachineNs = tMachine * 1000;

    var resF = document.getElementById('calc-res-f');
    var resT = document.getElementById('calc-res-t');
    var resTNs = document.getElementById('calc-res-tns');

    if (resF) resF.textContent = fMachine.toFixed(6) + ' MHz';
    if (resT) resT.textContent = tMachine.toFixed(6) + ' µs';
    if (resTNs) resTNs.textContent = tMachineNs.toFixed(2) + ' ns';
  });
}
