/* JOHNZELLE M. — BLOG PAGE */

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
  heroAnimate('.blog-hero-sub',
    'opacity:0;transform:translateY(18px);transition:opacity 0.7s ease 0.5s,transform 0.7s ease 0.5s;');
  heroAnimate('.blog-count-bar',
    'opacity:0;transform:translateY(14px);transition:opacity 0.7s ease 0.65s,transform 0.7s ease 0.65s;');

  /* ── Hero title animates via CSS letter-rise keyframes (see blog.html) ── */

  /* ── Blog card scroll reveal ── */
  document.querySelectorAll('.blog-card').forEach(el => el.classList.add('reveal'));

  /* ── Keyboard close on Escape ── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllPosts();
  });

});

/* ── Toggle post open/close ── */
function togglePost(cardId, btn) {
  const card    = document.getElementById(cardId);
  const content = document.getElementById(cardId + '-content');
  const isOpen  = card.classList.contains('open');

  /* Close all others first */
  document.querySelectorAll('.blog-card.open').forEach(c => {
    if (c.id !== cardId) {
      c.classList.remove('open');
      const otherContent = document.getElementById(c.id + '-content');
      const otherBtn     = c.querySelector('.blog-read-btn');
      if (otherContent) otherContent.classList.remove('open');
      if (otherBtn) {
        otherBtn.classList.remove('open');
        otherBtn.setAttribute('aria-expanded', 'false');
        otherBtn.innerHTML = 'Read Post <span class="btn-arrow">→</span>';
      }
    }
  });

  if (isOpen) {
    /* Scroll to top of card first, then collapse after it arrives */
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      card.classList.remove('open');
      content.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = 'Read Post <span class="btn-arrow">→</span>';
    }, 400);
  } else {
    /* Open */
    card.classList.add('open');
    content.classList.add('open');
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    btn.innerHTML = 'Collapse <span class="btn-arrow">→</span>';

    /* Smooth scroll to card */
    setTimeout(() => {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  }
}

/* ── Close all posts ── */
function closeAllPosts() {
  document.querySelectorAll('.blog-card.open').forEach(card => {
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      card.classList.remove('open');
      const content = document.getElementById(card.id + '-content');
      const btn     = card.querySelector('.blog-read-btn');
      if (content) content.classList.remove('open');
      if (btn) {
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = 'Read Post <span class="btn-arrow">→</span>';
      }
    }, 400);
  });
}