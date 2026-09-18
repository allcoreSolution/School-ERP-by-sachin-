const express = require('express');
const router = express.Router();
const { getHealthRecords, updateHealthRecord } = require('../controllers/healthController');

router.get('/:studentId', getHealthRecords);
router.post('/', updateHealthRecord);

module.exports = router;
