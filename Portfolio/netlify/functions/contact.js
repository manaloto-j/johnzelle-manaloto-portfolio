/* =====================================================
   JOHNZELLE M. — Netlify Function: Contact Form
   Verifies reCAPTCHA v3 score, then sends via EmailJS
   ===================================================== */

const EMAILJS_SERVICE_ID  = 'service_7r28p2m';
const EMAILJS_TEMPLATE_ID = 'template_mnu73hj';
const EMAILJS_PUBLIC_KEY  = 'Rjkk5uTMp6G_XyTv7';
const RECAPTCHA_MIN_SCORE = 0.5;

exports.handler = async function(event) {
  /* Only allow POST */
  if (event.httpMethod !== 'POST') {
    return respond(405, { error: 'Method not allowed' });
  }

  /* Parse body */
  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return respond(400, { error: 'Invalid request body' });
  }

  const { firstName, lastName, email, subject, message, recaptchaToken } = body;

  /* ── 1. Basic field presence check ── */
  if (!firstName || !lastName || !email || !subject || !message || !recaptchaToken) {
    return respond(400, { error: 'Missing required fields' });
  }

  /* ── 2. Verify reCAPTCHA token with Google ── */
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY env var is not set');
    return respond(500, { error: 'Server misconfiguration' });
  }

  let recaptchaData;
  try {
    const verifyRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`,
      { method: 'POST' }
    );
    recaptchaData = await verifyRes.json();
  } catch (err) {
    console.error('reCAPTCHA verification fetch failed:', err);
    return respond(500, { error: 'reCAPTCHA verification failed' });
  }

  /* Reject if score too low or action mismatch */
  if (
    !recaptchaData.success ||
    recaptchaData.score < RECAPTCHA_MIN_SCORE ||
    recaptchaData.action !== 'contact_form'
  ) {
    console.warn('reCAPTCHA rejected:', recaptchaData);
    return respond(403, { error: 'reCAPTCHA check failed. Are you human? 🤖' });
  }

  /* ── 3. Send email via EmailJS REST API ── */
  try {
    const emailRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id:  EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id:     EMAILJS_PUBLIC_KEY,
        accessToken: process.env.EMAILJS_PRIVATE_KEY,
        template_params: {
          from_name:  `${firstName.trim()} ${lastName.trim()}`,
          from_email: email.trim(),
          subject:    subject.trim(),
          message:    message.trim(),
          to_email:   'jqmanaloto2005@gmail.com',
        },
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error('EmailJS error:', errText);
      return respond(500, { error: 'Failed to send email' });
    }
  } catch (err) {
    console.error('EmailJS fetch failed:', err);
    return respond(500, { error: 'Failed to send email' });
  }

  return respond(200, { success: true });
};

/* ── Utility ── */
function respond(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}