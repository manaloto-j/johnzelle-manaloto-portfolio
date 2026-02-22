/* JOHNZELLE M. — RESUME PAGE */

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
  heroAnimate('.resume-hero-sub',
    'opacity:0;transform:translateY(18px);transition:opacity 0.7s ease 0.55s,transform 0.7s ease 0.55s;');
  heroAnimate('.resume-download-bar',
    'opacity:0;transform:translateY(14px);transition:opacity 0.7s ease 0.7s,transform 0.7s ease 0.7s;');

  /* ── Hero title — letter-by-letter animation ── */
  const heroTitle = document.querySelector('.resume-hero-title');
  if (heroTitle) animateLetters(heroTitle);

  /* ── Language bar scroll animation ── */
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      setTimeout(() => entry.target.classList.add('animated'), 200);
      barObserver.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.language-bar-fill').forEach(b => barObserver.observe(b));

});

