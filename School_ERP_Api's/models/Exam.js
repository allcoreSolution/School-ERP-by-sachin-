const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  examName: { type: String, required: true }, // e.g., "Term 1", "Mid-term"
  academicClass: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicClass', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
}, { timestamps: true });

const examResultSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicSubject', required: true },
  marksObtained: { type: Number, required: true },
  maxMarks: { type: Number, required: true },
  remarks: { type: String }
}, { timestamps: true });

const Exam = mongoose.model('Exam', examSchema);
const ExamResult = mongoose.model('ExamResult', examResultSchema);

module.exports = { Exam, ExamResult };
