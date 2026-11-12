const router            = require('express').Router();
const projectController = require('../controllers/projectController');

// Public — GET /api/projects
router.get('/', projectController.getAll);

module.exports = router;
