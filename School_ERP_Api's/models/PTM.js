const mongoose = require('mongoose');

const ptmSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  meetingDate: { type: Date, required: true },
  startTime: { type: String, required: true }, // e.g., "10:00 AM"
  endTime: { type: String, required: true },
  status: { type: String, enum: ['Requested', 'Confirmed', 'Completed', 'Cancelled'], default: 'Requested' },
  meetingLink: { type: String }, // Optional virtual meeting
  remarks: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('PTM', ptmSchema);
