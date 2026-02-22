/* JOHNZELLE M. — SHARED UTILITIES */

/**
 * animateLetters — rises each character in a heading up letter-by-letter.
 * Supports plain text nodes and <span> children (coloured orange accent).
 *
 * @param {HTMLElement} heroTitle   - The heading element to animate.
 * @param {number}      [delay=0.25] - Base delay before first letter (seconds).
 * @param {number}      [step=0.04]  - Stagger step between each letter (seconds).
 */
function animateLetters(heroTitle, delay = 0.25, step = 0.04) {
  if (!heroTitle) return;

  const html = heroTitle.innerHTML;
  heroTitle.innerHTML = '';
  heroTitle.style.opacity = '1';

  const temp = document.createElement('div');
  temp.innerHTML = html;
  let globalIndex = 0;

  function makeLetterSpan(char, index) {
    const span = document.createElement('span');
    span.textContent = char;
    const t = step * index + delay;
    span.style.cssText =
      `display:inline-block;opacity:0;` +
      `transform:translateY(36px) rotate(${(Math.random() - 0.5) * 5}deg);` +
      `transition:opacity 0.5s ease ${t}s,` +
      `transform 0.5s cubic-bezier(0.22,1,0.36,1) ${t}s;`;
    return span;
  }

  temp.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      [...node.textContent].forEach(char => {
        if (char.trim() === '' && char !== '\u00A0') {
          heroTitle.appendChild(document.createTextNode(' '));
          return;
        }
        heroTitle.appendChild(makeLetterSpan(char, globalIndex++));
      });
    } else if (node.nodeName === 'SPAN') {
      const wrapper = document.createElement('span');
      wrapper.style.color = 'var(--orange)';
      wrapper.style['-webkit-text-stroke'] = '0';
      [...node.textContent].forEach(char => {
        wrapper.appendChild(makeLetterSpan(char, globalIndex++));
      });
      heroTitle.appendChild(wrapper);
    } else if (node.nodeName === 'BR') {
      heroTitle.appendChild(document.createElement('br'));
    }
  });

  // Trigger the transition on next frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      heroTitle.querySelectorAll('span').forEach(s => {
        s.style.opacity = '1';
        s.style.transform = 'translateY(0) rotate(0deg)';
      });
    });
  });
}

/* Apply saved theme before first paint (prevents flash) */
(function () {
  if (localStorage.getItem('jm-theme') === 'light') {
    document.documentElement.classList.add('light-mode-preload');
    document.addEventListener('DOMContentLoaded', () => {
      document.documentElement.classList.remove('light-mode-preload');
      document.body.classList.add('light-mode');
    });
  }
})();

document.addEventListener('DOMContentLoaded', () => {

  const isLight = () => document.body.classList.contains('light-mode');

  /* ── DESKTOP / FLOATING THEME TOGGLE ── */
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.setAttribute('aria-label', 'Toggle light/dark mode');
  themeToggle.innerHTML = `
    <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1"    x2="12" y2="3"/>
      <line x1="12" y1="21"   x2="12" y2="23"/>
      <line x1="4.22" y1="4.22"   x2="5.64"  y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1"  y1="12" x2="3"  y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
      <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
    </svg>
    <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>`;
  document.body.appendChild(themeToggle);

  if (localStorage.getItem('jm-theme') === 'light') {
    document.body.classList.add('light-mode');
  }

  /* Shared toggle logic — called by both desktop and mobile buttons */
  function toggleTheme() {
    const light = document.body.classList.toggle('light-mode');
    localStorage.setItem('jm-theme', light ? 'light' : 'dark');
    syncMobileToggleLabel();
  }

  themeToggle.addEventListener('click', toggleTheme);

  /* ── HAMBURGER MOBILE NAV ── */
  const navPill = document.querySelector('.nav-pill');
  if (!navPill) return;

  const { pathname } = window.location;
  const isProjects = pathname.includes('projects');
  const isResume   = pathname.includes('resume');
  const isContact  = pathname.includes('contact');
  const isBlog     = pathname.includes('blog');
  const isHome     = !isProjects && !isResume && !isContact && !isBlog;

  /* Hamburger button */
  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger-btn';
  hamburger.setAttribute('aria-label', 'Open navigation menu');
  hamburger.innerHTML = `<span></span><span></span><span></span>`;
  navPill.appendChild(hamburger);

  /* Mobile menu overlay */
  const mobileMenu = document.createElement('nav');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.setAttribute('aria-hidden', 'true');
  mobileMenu.innerHTML = `
    <a href="${isHome ? '#hero' : 'index.html'}"  class="${isHome     ? 'mob-active' : ''}">Home</a>
    <a href="projects.html" class="${isProjects ? 'mob-active' : ''}">Projects</a>
    <a href="resume.html"   class="${isResume   ? 'mob-active' : ''}">Resume</a>
    <a href="blog.html"     class="${isBlog     ? 'mob-active' : ''}">Blog</a>
    <a href="contact.html"  class="${isContact  ? 'mob-active' : ''}">Contact</a>

    <div class="mobile-theme-row">
      <button class="mobile-theme-btn" id="mobileThemeBtn" aria-label="Toggle light/dark mode">
        <div class="mob-toggle-track">
          <div class="mob-toggle-thumb">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </div>
        </div>
        <span class="mob-toggle-label" id="mobileThemeLabel">Light Mode</span>
      </button>
    </div>

    <span class="mobile-menu-hint">ESC or tap outside to close</span>`;
  document.body.appendChild(mobileMenu);

  /* Sync the mobile label to the current theme state */
  const mobileThemeLabel = document.getElementById('mobileThemeLabel');
  function syncMobileToggleLabel() {
    if (mobileThemeLabel) {
      mobileThemeLabel.textContent = isLight() ? 'Dark Mode' : 'Light Mode';
    }
  }
  syncMobileToggleLabel(); // set correct label on load

  /* Wire up the mobile toggle button */
  document.getElementById('mobileThemeBtn')?.addEventListener('click', (e) => {
    e.stopPropagation(); // don't bubble to the overlay close handler
    toggleTheme();
  });

  /* Menu open / close helpers */
  const openMenu = () => {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    syncMobileToggleLabel();
  };
  const closeMenu = () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  mobileMenu.addEventListener('click', (e) => { if (e.target === mobileMenu) closeMenu(); });

});