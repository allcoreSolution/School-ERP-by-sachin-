const express = require('express');
const router = express.Router();
const { scheduleLiveClass, getLiveClasses } = require('../controllers/liveClassController');

router.post('/schedule', scheduleLiveClass);
router.get('/', getLiveClasses);

module.exports = router;
