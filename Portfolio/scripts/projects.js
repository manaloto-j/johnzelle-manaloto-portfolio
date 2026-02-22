/* JOHNZELLE M. — PROJECTS PAGE */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Hero entrance animations ── */
  const heroAnimate = (selector, cssIn) => {
    const el = document.querySelector(selector);
    if (!el) return;
    el.style.cssText += cssIn;
    setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'none'; }, 80);
  };
  heroAnimate('.section-preheader',
    'opacity:0;transform:translateX(-24px);transition:opacity 0.6s ease 0.1s,transform 0.6s ease 0.1s;');
  animateLetters(document.querySelector('.projects-hero-title'), 0.3, 0.04);
  heroAnimate('.projects-hero-sub',
    'opacity:0;transform:translateY(18px);transition:opacity 0.7s ease 0.5s,transform 0.7s ease 0.5s;');
  heroAnimate('.project-count-bar',
    'opacity:0;transform:translateY(14px);transition:opacity 0.7s ease 0.65s,transform 0.7s ease 0.65s;');

  /* ── Reveal classes are set in HTML so page-init.js observer catches them ── */

  /* ── Keyboard close lightbox ── */
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

});

/* ── Accordion toggle ── */
function toggleAccordion(id) {
  const accordion = document.getElementById(id);
  if (!accordion) return;
  const isOpen = accordion.classList.contains('open');
  const btn    = accordion.querySelector('.accordion-trigger');

  accordion.classList.toggle('open', !isOpen);
  btn.setAttribute('aria-expanded', String(!isOpen));
}

/* ── Thumbnail switcher ── */
function switchMain(imgId, src, caption, thumbEl) {
  const mainImg = document.getElementById(imgId);
  if (!mainImg) return;

  mainImg.style.opacity = '0';
  mainImg.style.transition = 'opacity 0.25s ease';
  setTimeout(() => { mainImg.src = src; mainImg.style.opacity = '1'; }, 250);

  const mainWrap = mainImg.closest('.gallery-main');
  if (mainWrap) {
    const btn = mainWrap.querySelector('.gallery-expand-btn');
    if (btn) btn.setAttribute('onclick', `openLightbox('${src}','${caption}')`);
  }

  const allThumbs = thumbEl.closest('.gallery-thumbs').querySelectorAll('.gallery-thumb');
  allThumbs.forEach(t => t.classList.remove('active'));
  thumbEl.classList.add('active');
}

/* ── Lightbox ── */
function openLightbox(src, caption) {
  const overlay = document.getElementById('lightbox');
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxCaption').textContent = caption || '';
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function closeLightboxOnBg(e) {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
}