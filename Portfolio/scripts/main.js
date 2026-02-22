/* JOHNZELLE M. — HOME PAGE JS */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CUSTOM CURSOR ── */
  const cursorDot = document.createElement('div');
  cursorDot.className = 'custom-cursor';
  document.body.appendChild(cursorDot);

  document.addEventListener('mousemove', (e) => {
    cursorDot.style.left    = e.clientX + 'px';
    cursorDot.style.top     = e.clientY + 'px';
    cursorDot.style.opacity = '1';
    document.body.classList.add('cursor-ready');
  });
  document.addEventListener('mouseleave', () => { cursorDot.style.opacity = '0'; });

  /* ── SCROLL HINT ── */
  const hero = document.querySelector('.hero');
  if (hero) {
    const hint = document.createElement('div');
    hint.className = 'hero-scroll-hint';
    hint.innerHTML = `<div class="scroll-mouse"></div><span>Scroll</span>`;
    hero.appendChild(hint);
  }

  /* ── HERO ENTRANCE ANIMATIONS ── */
  const heroAnims = [
    ['.hero-preheader',  'opacity:0;transform:translateX(-24px);transition:opacity 0.6s ease 0.1s,transform 0.6s ease 0.1s;'],
    ['.hero-arch',       'opacity:0;transform:scale(0.93) translateY(14px);transition:opacity 0.8s ease 0.2s,transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s;'],

    ['.hero-text-left',  'opacity:0;transform:translateX(-32px);transition:opacity 0.7s ease 0.45s,transform 0.7s ease 0.45s;'],
    ['.hero-text-right', 'opacity:0;transform:translateX(32px);transition:opacity 0.7s ease 0.55s,transform 0.7s ease 0.55s;'],
    ['.hero-sub-banner', 'opacity:0;transform:translateY(18px);transition:opacity 0.7s ease 0.7s,transform 0.7s ease 0.7s;'],
  ];
  heroAnims.forEach(([sel, css]) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.cssText += css;
    setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'none'; }, 80);
  });

  /* ── HERO NAME — letter-by-letter animation ── */
  if (typeof animateLetters === 'function') {
    animateLetters(document.querySelector('.hero-name'), 0.35, 0.04);
  }

  /* ── 3D TILT HELPER ── */
  function applyTilt(el, strength = 8) {
    if (!el) return;
    el.addEventListener('mouseenter', () => {
      el.style.transition = 'transform 0.1s ease';
    });
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - 0.5) * strength;
      const y = ((e.clientY - r.top)  / r.height - 0.5) * strength;
      el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1)';
      el.style.transform  = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    });
  }

  applyTilt(document.querySelector('.hero-arch'),     8);
  applyTilt(document.querySelector('.fp-media-frame'), 10);

  /* ── SCROLL REVEAL ── */

  /* About section — animate like hero (reliable, not observer-dependent) */
  const aboutAnims = [
    ['.about-left',      'opacity:0;transform:translateX(-36px);transition:opacity 0.75s ease 0.1s,transform 0.75s cubic-bezier(0.22,1,0.36,1) 0.1s;'],
    ['.about-right',     'opacity:0;transform:translateX(36px);transition:opacity 0.75s ease 0.25s,transform 0.75s cubic-bezier(0.22,1,0.36,1) 0.25s;'],
    ['.skills-showcase', 'opacity:0;transform:translateY(24px);transition:opacity 0.7s ease 0.4s,transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s;'],
  ];

  /* Trigger about animations only when section scrolls into view */
  let aboutAnimated = false;
  const aboutSection = document.querySelector('#about');
  const aboutScrollCheck = () => {
    if (aboutAnimated || !aboutSection) return;
    const rect = aboutSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      aboutAnimated = true;
      aboutAnims.forEach(([sel, css]) => {
        const el = document.querySelector(sel);
        if (!el) return;
        el.style.cssText += css;
        setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'none'; }, 80);
      });
      window.removeEventListener('scroll', aboutScrollCheck);
    }
  };
  window.addEventListener('scroll', aboutScrollCheck, { passive: true });
  aboutScrollCheck(); /* run once immediately in case already in view */

  /* Featured project — same reliable scroll-check pattern */
  const fpAnims = [
    ['.fp-media', 'opacity:0;transform:translateX(-40px);transition:opacity 0.8s ease 0.1s,transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s;'],
    ['.fp-info',  'opacity:0;transform:translateX(40px);transition:opacity 0.8s ease 0.3s,transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s;'],
  ];
  let fpAnimated = false;
  const fpSection = document.querySelector('#featured');
  const fpScrollCheck = () => {
    if (fpAnimated || !fpSection) return;
    const rect = fpSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      fpAnimated = true;
      fpAnims.forEach(([sel, css]) => {
        const el = document.querySelector(sel);
        if (!el) return;
        el.style.cssText += css;
        setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'none'; }, 80);
      });
      window.removeEventListener('scroll', fpScrollCheck);
    }
  };
  window.addEventListener('scroll', fpScrollCheck, { passive: true });
  fpScrollCheck();

  document.querySelector('blockquote')?.classList.add('reveal-scale');
  document.querySelector('.cert-header')?.classList.add('reveal');
  document.querySelector('.fp-header')?.classList.add('reveal');
  document.querySelectorAll('.section-title').forEach(el => el.classList.add('reveal'));

  document.querySelectorAll('.skill-card').forEach((el, i) => {
    el.classList.add('reveal');
    const delay = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'][i % 4];
    if (delay) el.classList.add(delay);
  });
  document.querySelectorAll('.cert-card').forEach((el, i) => {
    el.classList.add('reveal');
    const delay = ['', 'reveal-delay-1', 'reveal-delay-2'][i % 3];
    if (delay) el.classList.add(delay);
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      entry.target.querySelector?.('.section-title')?.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    .forEach(el => revealObserver.observe(el));

  /* ── ACTIVE NAV HIGHLIGHT + HEADER SHRINK ON SCROLL ── */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');
  const header   = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    if (header) header.style.top = window.scrollY > 60 ? '0.75rem' : '1.5rem';

    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) current = s.id; });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });

  /* ── SKILLS SCROLL HINT — fade out on first scroll ── */
  const skillsHint  = document.getElementById('skillsScrollHint');
  const skillsTrackEl = document.querySelector('.skills-showcase-track');
  if (skillsHint && skillsTrackEl) {
    const hideHint = () => {
      skillsHint.classList.add('hidden');
      skillsTrackEl.removeEventListener('scroll', hideHint);
      skillsTrackEl.removeEventListener('touchstart', hideHint);
    };
    skillsTrackEl.addEventListener('scroll',     hideHint, { passive: true });
    skillsTrackEl.addEventListener('touchstart', hideHint, { passive: true });
  }

  /* ── SKILLS MOBILE AUTO-SCROLL CAROUSEL ── */
  const skillsTrack = document.querySelector('.skills-showcase-track');
  if (skillsTrack && window.innerWidth <= 768) {
    /* Clone all children for seamless loop */
    const originalItems = [...skillsTrack.children];
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      skillsTrack.appendChild(clone);
    });
    skillsTrack.classList.add('auto-scroll');
  }
  /* ── CERTIFICATIONS MOBILE SWIPE HINT ── */
  const certGrid     = document.getElementById('certGrid');
  const certSwipeHint = document.getElementById('certSwipeHint');
  if (certGrid && certSwipeHint && window.innerWidth <= 768) {
    const hideSwipeHint = () => {
      certSwipeHint.classList.add('hidden');
      certGrid.removeEventListener('scroll',     hideSwipeHint);
      certGrid.removeEventListener('touchstart', hideSwipeHint);
    };
    certGrid.addEventListener('scroll',     hideSwipeHint, { passive: true });
    certGrid.addEventListener('touchstart', hideSwipeHint, { passive: true });
  }

  document.getElementById('backToTop')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── HAMBURGER MOBILE MENU ──
     Isolated in its own block so animation errors above cannot prevent it from running. */
  const hamburger = document.getElementById('navHamburger');
  const drawer    = document.getElementById('navMobileDrawer');

  const toggleMenu = (open) => {
    hamburger.classList.toggle('open', open);
    drawer.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    drawer.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('open');
    toggleMenu(!isOpen);
  });

  /* Close drawer when a link is clicked */
  drawer?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  /* Close on Escape key */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.classList.contains('open')) toggleMenu(false);
  });

});