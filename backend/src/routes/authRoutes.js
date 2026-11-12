const router          = require('express').Router();
const authController  = require('../controllers/authController');
const { protect }     = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');

// POST /api/auth/login
router.post('/login', authLimiter, authController.login);

// GET  /api/auth/me
router.get('/me', protect, authController.me);

// POST /api/auth/logout
router.post('/logout', protect, authController.logout);

module.exports = router;
