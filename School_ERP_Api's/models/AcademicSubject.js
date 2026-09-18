const mongoose = require('mongoose');

const academicSubjectSchema = new mongoose.Schema({
  subjectName: {
    type: String, // e.g., "Mathematics", "Science"
    required: true,
    trim: true
  },
  subjectCode: {
    type: String, // e.g., "MATH101"
    required: true,
    unique: true,
    trim: true
  },
  subjectType: {
    type: String,
    enum: ['theory', 'practical', 'both'],
    default: 'theory'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('AcademicSubject', academicSubjectSchema);
