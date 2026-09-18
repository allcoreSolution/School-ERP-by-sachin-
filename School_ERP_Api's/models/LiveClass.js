const mongoose = require('mongoose');

const liveClassSchema = new mongoose.Schema({
  title: { type: String, required: true },
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true }, // Teacher
  academicClass: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicClass', required: true },
  section: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicSection', required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicSubject' },
  meetingUrl: { type: String, required: true },
  platform: { type: String, enum: ['Zoom', 'GoogleMeet', 'Custom'], default: 'Zoom' },
  startTime: { type: Date, required: true },
  durationMinutes: { type: Number, required: true },
  status: { type: String, enum: ['Scheduled', 'Live', 'Completed', 'Cancelled'], default: 'Scheduled' }
}, { timestamps: true });

module.exports = mongoose.model('LiveClass', liveClassSchema);
