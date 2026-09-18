const { Survey, SurveyResponse } = require('../models/Survey');

// =============== SURVEY APIs =================
exports.createSurvey = async (req, res, next) => {
  try {
    const survey = await Survey.create(req.body);
    res.status(201).json({ success: true, data: survey });
  } catch (error) { next(error); }
};

exports.getSurveys = async (req, res, next) => {
  try {
    let query = {};
    if (req.query.isActive) {
        query.isActive = req.query.isActive === 'true';
    }
    const surveys = await Survey.find(query).sort({ endDate: -1 });
    res.status(200).json({ success: true, count: surveys.length, data: surveys });
  } catch (error) { next(error); }
};

exports.updateSurvey = async (req, res, next) => {
    try {
        const survey = await Survey.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: survey });
    } catch (error) { next(error); }
};

exports.deleteSurvey = async (req, res, next) => {
    try {
        await Survey.findByIdAndDelete(req.params.id);
        // Also delete responses
        await SurveyResponse.deleteMany({ survey: req.params.id });
        res.status(200).json({ success: true, message: 'Survey deleted' });
    } catch (error) { next(error); }
};

// =============== SURUEY RESPONSE APIs =================
exports.submitResponse = async (req, res, next) => {
  try {
    const response = await SurveyResponse.create(req.body);
    res.status(201).json({ success: true, data: response });
  } catch (error) { next(error); }
};

exports.getSurveyResponses = async (req, res, next) => {
    try {
        const { surveyId } = req.params;
        const responses = await SurveyResponse.find({ survey: surveyId }).populate('user', 'firstName lastName');
        res.status(200).json({ success: true, count: responses.length, data: responses });
    } catch (error) { next(error); }
};
