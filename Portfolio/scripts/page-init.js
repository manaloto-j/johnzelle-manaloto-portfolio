/* JOHNZELLE M. — PAGE INIT (common subpage utilities) */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CUSTOM CURSOR ── */
  const cursorDot = document.createElement('div');
  cursorDot.className = 'custom-cursor';
  document.body.appendChild(cursorDot);
  document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top  = e.clientY + 'px';
    cursorDot.style.opacity = '1';
    document.body.classList.add('cursor-ready');
  });
  document.addEventListener('mouseleave', () => { cursorDot.style.opacity = '0'; });

  /* ── NAV PILL ENTRANCE ── */
  const navPill = document.querySelector('.nav-pill');
  if (navPill) navPill.style.cssText += 'animation: nav-drop 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s both;';

  /* ── SCROLL REVEAL ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    .forEach(el => revealObserver.observe(el));

  /* ── HEADER SHRINK ON SCROLL ── */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.top = window.scrollY > 60 ? '0.75rem' : '1.5rem';
    }, { passive: true });
  }

  /* ── BACK TO TOP ── */
  document.getElementById('backToTop')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── MARQUEE HOVER PAUSE ── */
  document.querySelectorAll('.marquee-divider').forEach(el => {
    const track = el.querySelector('.marquee-track');
    if (!track) return;
    el.addEventListener('mouseenter', () => { track.style.animationPlayState = 'paused'; });
    el.addEventListener('mouseleave', () => { track.style.animationPlayState = 'running'; });
  });

});
