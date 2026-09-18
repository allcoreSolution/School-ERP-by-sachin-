const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [{
    questionText: { type: String, required: true },
    options: [{ type: String }] // e.g. ["Yes", "No"]
  }],
  targetAudience: { type: String, enum: ['All', 'Student', 'Teacher', 'Parent'], default: 'All' },
  isActive: { type: Boolean, default: true },
  expiresAt: { type: Date }
}, { timestamps: true });

const surveyResponseSchema = new mongoose.Schema({
  surveyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [{
    questionId: { type: mongoose.Schema.Types.ObjectId },
    selectedOption: { type: String }
  }]
}, { timestamps: true });

const Survey = mongoose.model('Survey', surveySchema);
const SurveyResponse = mongoose.model('SurveyResponse', surveyResponseSchema);

module.exports = { Survey, SurveyResponse };
