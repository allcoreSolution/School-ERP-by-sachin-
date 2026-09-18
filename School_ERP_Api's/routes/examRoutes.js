const express = require('express');
const router = express.Router();
const { createExam, getExams, addResult, getStudentResult } = require('../controllers/examController');

router.post('/exam-schedule', createExam);
router.get('/exam-schedule', getExams);

router.post('/results', addResult);
router.get('/results', getStudentResult);

module.exports = router;
