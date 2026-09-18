const express = require('express');
const router = express.Router();
const { createSurvey, getSurveys, updateSurvey, deleteSurvey, submitResponse, getSurveyResponses } = require('../controllers/surveyController');

router.post('/', createSurvey);
router.get('/', getSurveys);
router.put('/:id', updateSurvey);
router.delete('/:id', deleteSurvey);

router.post('/submit', submitResponse);
router.get('/:surveyId/responses', getSurveyResponses);

module.exports = router;
