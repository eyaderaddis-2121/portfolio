const nodemailer = require('nodemailer');
require('dotenv').config();

// ─── Check if email is properly configured ────────────────────
function isEmailConfigured() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  return (
    user &&
    pass &&
    pass !== 'your_gmail_app_password_here' &&
    pass.replace(/\s/g, '').length >= 16
  );
}

// ─── Build transporter (lazy — only when needed) ──────────────
function createTransporter() {
  return nodemailer.createTransport({
    host:   'smtp.gmail.com',
    port:   465,
    secure: true,                   // SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS.replace(/\s/g, ''), // strip spaces if user copied "xxxx xxxx xxxx xxxx"
    },
    tls: {
      rejectUnauthorized: false,    // avoids cert issues on some machines
    },
  });
}

// ─── Verify on startup (informational only) ───────────────────
if (isEmailConfigured()) {
  createTransporter().verify((err) => {
    if (err) {
      console.warn('⚠️  Email transporter verify failed:', err.message);
    } else {
      console.log('✅  Email service ready →', process.env.EMAIL_USER);
    }
  });
} else {
  console.warn('⚠️  Email not configured — set EMAIL_PASS in backend/.env');
  console.warn('   Follow the guide below to get a Gmail App Password:');
  console.warn('   1. Go to https://myaccount.google.com/security');
  console.warn('   2. Enable 2-Step Verification');
  console.warn('   3. Search "App passwords" → create one for "Mail"');
  console.warn('   4. Copy the 16-char password into EMAIL_PASS in .env');
  console.warn('   5. Restart the backend: node src/server.js');
}

// ─── Shared send helper ───────────────────────────────────────
async function send(mailOptions) {
  if (!isEmailConfigured()) {
    console.log('[EMAIL SKIPPED] Not configured. Would have sent to:', mailOptions.to);
    return { skipped: true };
  }
  const transporter = createTransporter();
  const info = await transporter.sendMail(mailOptions);
  console.log('✉️  Email sent:', info.messageId, '→', mailOptions.to);
  return info;
}

// ─── Admin notification ───────────────────────────────────────
async function sendAdminNotification({ name, email, subject, message }) {
  return send({
    from:    `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to:      process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `📬 New Contact: ${subject}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;
                  background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;">
        <div style="background:#2563eb;padding:16px 20px;border-radius:8px;margin-bottom:20px;">
          <h2 style="color:#fff;margin:0;font-size:18px;">📬 New Portfolio Message</h2>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;font-weight:bold;color:#374151;width:90px;vertical-align:top;">From:</td>
            <td style="padding:10px 0;color:#111827;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;font-weight:bold;color:#374151;vertical-align:top;">Email:</td>
            <td style="padding:10px 0;">
              <a href="mailto:${escapeHtml(email)}" style="color:#2563eb;">${escapeHtml(email)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;font-weight:bold;color:#374151;vertical-align:top;">Subject:</td>
            <td style="padding:10px 0;color:#111827;">${escapeHtml(subject)}</td>
          </tr>
        </table>
        <div style="margin-top:16px;padding:16px;background:#fff;border-radius:8px;
                    border-left:4px solid #2563eb;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <p style="font-weight:bold;color:#374151;margin:0 0 10px 0;">Message:</p>
          <p style="color:#4b5563;line-height:1.7;margin:0;white-space:pre-wrap;">${escapeHtml(message)}</p>
        </div>
        <p style="margin-top:20px;color:#9ca3af;font-size:12px;text-align:center;">
          Received: ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Addis_Ababa' })} (EAT)
        </p>
      </div>
    `,
  });
}

// ─── Visitor auto-reply ───────────────────────────────────────
async function sendVisitorConfirmation({ name, email, subject }) {
  return send({
    from:    `"Eyaderaddis Belete" <${process.env.EMAIL_USER}>`,
    to:      email,
    subject: `✅ Message Received — ${escapeHtml(subject)}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;
                  background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;">
        <div style="background:#2563eb;padding:16px 20px;border-radius:8px;margin-bottom:20px;">
          <h2 style="color:#fff;margin:0;font-size:18px;">✅ Message Received!</h2>
        </div>
        <p style="color:#374151;line-height:1.7;font-size:15px;">
          Hi <strong>${escapeHtml(name)}</strong>,
        </p>
        <p style="color:#374151;line-height:1.7;font-size:15px;">
          Thank you for reaching out! I've received your message about
          <strong>"${escapeHtml(subject)}"</strong> and will get back to you
          as soon as possible — typically within 24–48 hours.
        </p>
        <p style="color:#374151;line-height:1.7;font-size:15px;">
          In the meantime, feel free to explore my work:
        </p>
        <div style="text-align:center;margin:24px 0;">
          <a href="https://github.com/eyaderaddis-2121"
             style="display:inline-block;background:#2563eb;color:#fff;padding:12px 28px;
                    border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">
            View My GitHub →
          </a>
        </div>
        <div style="background:#eff6ff;padding:16px;border-radius:8px;border-left:4px solid #2563eb;">
          <p style="margin:0;font-weight:bold;color:#1e40af;font-size:14px;">Eyaderaddis Belete</p>
          <p style="margin:4px 0 0;color:#3b82f6;font-size:13px;">Software Engineering Student | Full-Stack Developer</p>
          <p style="margin:4px 0 0;color:#6b7280;font-size:12px;">
            📧 Eyaderaddisbelete@gmail.com &nbsp;|&nbsp; 📞 +251 955 545 463
          </p>
        </div>
      </div>
    `,
  });
}

// ─── Admin reply to visitor ───────────────────────────────────
async function sendReply({ to, toName, subject, replyBody }) {
  return send({
    from:    `"Eyaderaddis Belete" <${process.env.EMAIL_USER}>`,
    to:      `"${toName}" <${to}>`,
    subject: `Re: ${subject}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;
                  background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;">
        <p style="color:#374151;line-height:1.7;white-space:pre-wrap;">${escapeHtml(replyBody)}</p>
        <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e5e7eb;">
          <p style="margin:0;font-weight:bold;color:#1e40af;font-size:14px;">Eyaderaddis Belete</p>
          <p style="margin:4px 0 0;color:#3b82f6;font-size:13px;">Software Engineering Student | Full-Stack Developer</p>
          <p style="margin:4px 0 0;color:#6b7280;font-size:12px;">📧 Eyaderaddisbelete@gmail.com</p>
        </div>
      </div>
    `,
  });
}

// ─── Test email (called from /api/admin/test-email) ───────────
async function sendTestEmail(toEmail) {
  return send({
    from:    `"Portfolio Backend" <${process.env.EMAIL_USER}>`,
    to:      toEmail,
    subject: '🧪 Portfolio Email Test',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:24px;
                  background:#f0fdf4;border-radius:12px;border:1px solid #bbf7d0;">
        <h2 style="color:#16a34a;">✅ Email is working!</h2>
        <p style="color:#374151;">
          Your Gmail App Password is configured correctly.
          Contact form emails will be delivered successfully.
        </p>
        <p style="color:#9ca3af;font-size:12px;">Sent at: ${new Date().toISOString()}</p>
      </div>
    `,
  });
}

// ─── HTML escape helper ───────────────────────────────────────
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = {
  sendAdminNotification,
  sendVisitorConfirmation,
  sendReply,
  sendTestEmail,
  isEmailConfigured,
};
