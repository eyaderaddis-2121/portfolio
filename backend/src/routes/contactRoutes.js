const router             = require('express').Router();
const contactController  = require('../controllers/contactController');
const { contactLimiter } = require('../middleware/rateLimiter');
const { contactValidator } = require('../middleware/validator');

// POST /api/contact
router.post('/', contactLimiter, contactValidator, contactController.submit);

module.exports = router;
