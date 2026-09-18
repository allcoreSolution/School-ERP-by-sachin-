const express = require('express');
const router = express.Router();
const { createExam, getExams, submitExam, getOnlineExamResults } = require('../controllers/onlineExamController');

router.post('/', createExam);
router.get('/', getExams);
router.post('/submit', submitExam);
router.get('/results', getOnlineExamResults);

module.exports = router;
