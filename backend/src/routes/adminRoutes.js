const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');

const messageController   = require('../controllers/messageController');
const dashboardController = require('../controllers/dashboardController');
const projectController   = require('../controllers/projectController');
const subscribeController = require('../controllers/subscribeController');
const { sendTestEmail, isEmailConfigured } = require('../services/emailService');
const {
  skillsController,
  experienceController,
  educationController,
  certificateController,
} = require('../controllers/portfolioController');

// All admin routes require JWT authentication
router.use(protect);

// ── Dashboard ──────────────────────────────────────────────────
router.get('/dashboard', dashboardController.stats);

// ── Email test ─────────────────────────────────────────────────
router.post('/test-email', async (req, res) => {
  try {
    if (!isEmailConfigured()) {
      return res.status(503).json({
        success: false,
        message: 'Email is not configured. Set EMAIL_PASS in backend/.env — see instructions below.',
        instructions: [
          '1. Go to https://myaccount.google.com/security',
          '2. Enable 2-Step Verification (required)',
          '3. Search for "App passwords" in the search bar',
          '4. Select app: Mail — Select device: Windows Computer',
          '5. Click Generate — copy the 16-character password',
          '6. Open backend/.env and set: EMAIL_PASS=xxxxxxxxxxxx (no spaces)',
          '7. Restart backend: node src/server.js',
        ],
      });
    }
    const to = req.body.to || process.env.ADMIN_EMAIL;
    await sendTestEmail(to);
    return res.json({ success: true, message: `Test email sent to ${to}` });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ── Email status ───────────────────────────────────────────────
router.get('/email-status', (req, res) => {
  res.json({
    success: true,
    data: {
      configured: isEmailConfigured(),
      user:       process.env.EMAIL_USER || null,
      admin:      process.env.ADMIN_EMAIL || null,
    },
  });
});

// ── Dashboard ──────────────────────────────────────────────────
router.get('/dashboard', dashboardController.stats);

// ── Messages ───────────────────────────────────────────────────
router.get('/messages',              messageController.getAll);
router.get('/messages/unread',       messageController.getUnread);
router.get('/messages/:id',          messageController.getById);
router.patch('/messages/:id',        messageController.update);
router.delete('/messages/:id',       messageController.delete);
router.post('/messages/:id/reply',   messageController.reply);

// ── Projects ───────────────────────────────────────────────────
router.post('/projects',          projectController.create);
router.put('/projects/:id',       projectController.update);
router.delete('/projects/:id',    projectController.delete);

// ── Skills ─────────────────────────────────────────────────────
router.post('/skills',            skillsController.create);
router.put('/skills/:id',         skillsController.update);
router.delete('/skills/:id',      skillsController.delete);

// ── Experience ─────────────────────────────────────────────────
router.post('/experience',        experienceController.create);
router.put('/experience/:id',     experienceController.update);
router.delete('/experience/:id',  experienceController.delete);

// ── Education ──────────────────────────────────────────────────
router.post('/education',         educationController.create);
router.put('/education/:id',      educationController.update);
router.delete('/education/:id',   educationController.delete);

// ── Certificates ───────────────────────────────────────────────
router.post('/certificates',      certificateController.create);
router.put('/certificates/:id',   certificateController.update);
router.delete('/certificates/:id',certificateController.delete);

// ── Subscribers ────────────────────────────────────────────────
router.get('/subscribers',        subscribeController.getAll);

module.exports = router;
