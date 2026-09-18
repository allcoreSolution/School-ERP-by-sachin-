const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  academicClass: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicClass', required: true },
  section: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicSection', required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicSubject', required: true },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
  assignDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  fileUrl: { type: String }, // Optional attachment
  status: { type: String, enum: ['Active', 'Closed'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Homework', homeworkSchema);
