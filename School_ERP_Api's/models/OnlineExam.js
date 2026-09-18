const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOptionIndex: { type: Number, required: true }, // Index 0-3
  marks: { type: Number, default: 1 }
});

const onlineExamSchema = new mongoose.Schema({
  title: { type: String, required: true },
  academicClass: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicClass', required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicSubject' },
  questions: [questionSchema], // Embedded document approach for simplicity
  durationMinutes: { type: Number, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const onlineExamResultSchema = new mongoose.Schema({
  onlineExam: { type: mongoose.Schema.Types.ObjectId, ref: 'OnlineExam', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  score: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  answers: [{
    questionId: { type: mongoose.Schema.Types.ObjectId },
    selectedOptionIndex: { type: Number }
  }]
}, { timestamps: true });

onlineExamResultSchema.index({ onlineExam: 1, student: 1 }, { unique: true });

const OnlineExam = mongoose.model('OnlineExam', onlineExamSchema);
const OnlineExamResult = mongoose.model('OnlineExamResult', onlineExamResultSchema);

module.exports = { OnlineExam, OnlineExamResult };
