const express = require('express');
const router = express.Router();
const { getCoachingModules, enrollInCoaching } = require('../controllers/coachingController');

router.get('/', getCoachingModules);
router.post('/enroll', enrollInCoaching);

module.exports = router;
