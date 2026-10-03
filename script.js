/* ═══════════════════════════════════════════════════════════════════
 *  MAC CONTRACTING — MAIN SCRIPT
 *  All site behaviour: navigation, forms, gallery toggle, etc.
 *  Form submissions use Formspree — configure endpoints in config.js
 * ═══════════════════════════════════════════════════════════════════ */

/* ── Wait for DOM ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  // Inject dynamic content from config.js
  initDynamicContent();

  // Wire up all interactive features
  initNavigation();
  initSmoothScroll();
  initServiceCards();
  initGalleryToggle();
  initQuoteForm();

});

/* ────────────────────────────────────────────────────────────────
 *  DYNAMIC CONTENT — pulls values from SITE_CONFIG (config.js)
 * ──────────────────────────────────────────────────────────────── */
function initDynamicContent() {
  const c = SITE_CONFIG;

  // Phone links
  document.querySelectorAll('[data-phone]').forEach(el => {
    el.href    = c.phoneLink;
    el.textContent = el.dataset.phone === 'call' ? '📞 Call Now'
      : el.dataset.phone === 'icon' ? '📞 ' + c.phone
      : c.phone;
  });

  // Email links
  document.querySelectorAll('[data-email]').forEach(el => {
    el.href        = 'mailto:' + c.email;
    el.textContent = c.email;
  });

  // Footer copyright year
  document.querySelectorAll('[data-copyright]').forEach(el => {
    el.textContent =
      '© ' + new Date().getFullYear() + ' ' + c.company +
      '. All rights reserved.  ·  ' + c.city + ', ' + c.state;
  });

  // Business hours list
  document.querySelectorAll('[data-hours]').forEach(el => {
    el.innerHTML = c.hours
      .map(h => `<div class="hours-row"><span class="day">${h.day}</span><span>${h.time}</span></div>`)
      .join('');
  });
}

/* ────────────────────────────────────────────────────────────────
 *  NAVIGATION — sticky nav, hamburger menu, active link tracking
 * ──────────────────────────────────────────────────────────────── */
function initNavigation() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const nav        = document.getElementById('nav');
  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.nav-links a');

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
  });

  // Scroll: active nav link + nav border
  window.addEventListener('scroll', () => {
    // Active link
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 130) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });

    // Nav border on scroll
    nav.style.borderBottomColor = window.scrollY > 80
      ? 'rgba(255,255,255,0.14)'
      : 'rgba(255,255,255,0.07)';
  }, { passive: true });
}

// Called from mobile menu links (inline onclick in HTML)
function closeMobile() {
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburger  = document.getElementById('hamburger');
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

/* ────────────────────────────────────────────────────────────────
 *  SMOOTH SCROLL
 * ──────────────────────────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ────────────────────────────────────────────────────────────────
 *  SERVICE CARDS — expand / collapse details
 * ──────────────────────────────────────────────────────────────── */
function initServiceCards() {
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => toggleService(card));
  });
}

function toggleService(card) {
  const details = card.querySelector('.sc-details');
  const arrow   = card.querySelector('.learn-more-btn span');
  const isOpen  = details.classList.toggle('open');
  if (arrow) arrow.textContent = isOpen ? '↑' : '→';
}

/* ────────────────────────────────────────────────────────────────
 *  PROJECT GALLERY — collapsible panel
 * ──────────────────────────────────────────────────────────────── */
function initGalleryToggle() {
  const btn   = document.getElementById('gallery-toggle');
  const panel = document.getElementById('projects-panel');
  if (!btn || !panel) return;

  const setOpen = open => {
    panel.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Hide Projects ▴' : 'Show Projects ▾';
  };
  btn.addEventListener('click', () => setOpen(panel.hidden));

  // Links to #projects (e.g. "View Our Projects") open the gallery
  document.querySelectorAll('a[href="#projects"]').forEach(a => {
    a.addEventListener('click', () => setOpen(true));
  });
  if (location.hash === '#projects') setOpen(true);
}

/* ────────────────────────────────────────────────────────────────
 *  QUOTE FORM — validates, then POSTs to Formspree → Gmail
 * ──────────────────────────────────────────────────────────────── */
function initQuoteForm() {
  const form = document.getElementById('quote-form');
  if (!form) return;

  // Live validation: clear error when user types
  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => el.closest('.form-group')?.classList.remove('invalid'));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateQuoteForm(form)) return;

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const res = await fetch(SITE_CONFIG.FORMSPREE_QUOTE_ENDPOINT, {
        method: 'POST',
        body:   new FormData(form),
        headers: { 'Accept': 'application/json' },
      });

      if (res.ok) {
        showSuccess('quote-form-wrap', 'form-success');
      } else {
        throw new Error('Server error');
      }
    } catch {
      btn.textContent = 'Submit Quote Request →';
      btn.disabled = false;
      alert('There was a problem sending your request. Please call us at ' + SITE_CONFIG.phone);
    }
  });
}

function validateQuoteForm(form) {
  let valid = true;

  form.querySelectorAll('[data-required]').forEach(group => {
    const input = group.querySelector('input, select, textarea');
    const val   = input?.value.trim() || '';
    const isEmail = group.dataset.type === 'email';
    const invalid = !val || (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));

    group.classList.toggle('invalid', invalid);
    if (invalid) valid = false;
  });

  const consent = document.getElementById('consent');
  if (consent && !consent.checked) {
    alert('Please check the consent box to submit your request.');
    valid = false;
  }

  return valid;
}

function showSuccess(wrapId, successId) {
  const wrap    = document.getElementById(wrapId);
  const success = document.getElementById(successId);
  if (wrap)    wrap.style.display    = 'none';
  if (success) success.style.display = 'block';
}

