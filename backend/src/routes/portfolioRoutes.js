/**
 * Public read-only routes for portfolio data.
 * GET /api/skills
 * GET /api/experience
 * GET /api/education
 * GET /api/certificates
 */
const router = require('express').Router();
const {
  skillsController,
  experienceController,
  educationController,
  certificateController,
} = require('../controllers/portfolioController');

router.get('/skills',       skillsController.getAll);
router.get('/experience',   experienceController.getAll);
router.get('/education',    educationController.getAll);
router.get('/certificates', certificateController.getAll);

module.exports = router;
