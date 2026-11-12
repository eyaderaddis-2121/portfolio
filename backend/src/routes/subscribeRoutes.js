const router              = require('express').Router();
const subscribeController = require('../controllers/subscribeController');

// POST /api/subscribe
router.post('/', subscribeController.subscribe);

module.exports = router;
