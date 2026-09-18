const mongoose = require('mongoose');

const lessonPlanSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  academicClass: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicClass', required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicSubject', required: true },
  topic: { type: String, required: true },
  subTopics: [{ type: String }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'In-Progress', 'Completed'], default: 'Pending' },
  teachingMethod: { type: String }, // e.g., Presentation, Whiteboard, Lab
  objectives: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('LessonPlan', lessonPlanSchema);
