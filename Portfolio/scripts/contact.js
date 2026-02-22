/* JOHNZELLE M. — CONTACT PAGE */

const RECAPTCHA_SITE_KEY = '6LeGTnMsAAAAAPp29l65bk9IIsHsfJIWF9_ZkDO5'; 

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
  heroAnimate('.contact-hero-sub',
    'opacity:0;transform:translateY(18px);transition:opacity 0.7s ease 0.5s,transform 0.7s ease 0.5s;');

  /* ── Hero title — letter-by-letter animation ── */
  animateLetters(document.querySelector('.contact-hero-title'), 0.3, 0.04);

  /* ── FORM VALIDATION & SUBMISSION ── */
  const form         = document.getElementById('contactForm');
  const btn          = document.getElementById('submitBtn');
  const formLoadTime = Date.now();

  /* ── Field validation helpers ── */
  function setError(id, errId, show) {
    document.getElementById(id).classList.toggle('error', show);
    document.getElementById(errId).classList.toggle('show', show);
    return !show;
  }

  function validateForm() {
    const fn  = document.getElementById('firstName').value.trim();
    const ln  = document.getElementById('lastName').value.trim();
    const em  = document.getElementById('email').value.trim();
    const sub = document.getElementById('subject').value.trim();
    const msg = document.getElementById('message').value.trim();

    let valid = true;
    valid = setError('firstName', 'firstNameError', fn.length < 1)                          && valid;
    valid = setError('lastName',  'lastNameError',  ln.length < 1)                          && valid;
    valid = setError('email',     'emailError',     !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) && valid;
    valid = setError('subject',   'subjectError',   sub.length < 1)                         && valid;
    valid = setError('message',   'messageError',   msg.length < 10)                        && valid;
    return valid;
  }

  /* ── Toast notifications ── */
  function showToast(type, message) {
    const toast = document.getElementById('toast');
    toast.className = `toast ${type}`;
    toast.querySelector('.toast-msg').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 5000);
  }

  /* ── Get reCAPTCHA v3 token invisibly ── */
  function getRecaptchaToken() {
    return new Promise((resolve, reject) => {
      grecaptcha.ready(async () => {
        try {
          const token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact_form' });
          resolve(token);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  /* ── Form submission ── */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Honeypot — bots fill this, humans won't
    if (document.getElementById('website').value.trim() !== '') {
      showToast('success', "Message sent! I'll be in touch soon.");
      return;
    }

    // 2. Time check — block instant bot submissions
    if (Date.now() - formLoadTime < 3000) {
      showToast('error', 'Submission too fast. Please wait a moment and try again.');
      return;
    }

    // 3. Client-side field validation
    if (!validateForm()) return;

    btn.disabled = true;
    btn.classList.add('sending');

    try {
      // 4. Get reCAPTCHA v3 token (invisible, background check)
      const recaptchaToken = await getRecaptchaToken();

      // 5. Send to Netlify function — it verifies score + sends email server-side
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName:      document.getElementById('firstName').value.trim(),
          lastName:       document.getElementById('lastName').value.trim(),
          email:          document.getElementById('email').value.trim(),
          subject:        document.getElementById('subject').value.trim(),
          message:        document.getElementById('message').value.trim(),
          recaptchaToken,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');

      showToast('success', "🎉 Message sent! I'll get back to you within 24 hours.");
      form.reset();

    } catch (err) {
      console.error('Submission error:', err);
      const msg = err.message.includes('reCAPTCHA')
        ? "Bot detected. If you're human, please try again."
        : 'Oops — something went wrong. Please email me directly.';
      showToast('error', msg);
    } finally {
      btn.disabled = false;
      btn.classList.remove('sending');
    }
  });

  /* ── Live validation on blur ── */
  const errMap = {
    firstName: 'firstNameError',
    lastName:  'lastNameError',
    email:     'emailError',
    subject:   'subjectError',
    message:   'messageError',
  };

  ['firstName', 'lastName', 'email', 'subject', 'message'].forEach(id => {
    document.getElementById(id).addEventListener('blur', () => {
      const val     = document.getElementById(id).value.trim();
      const invalid =
        id === 'email'   ? !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) :
        id === 'message' ? val.length < 10 :
                           val.length < 1;
      setError(id, errMap[id], invalid);
    });
  });

});