const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  targetAudience: { 
    type: String, 
    enum: ['All', 'Student', 'Teacher', 'Parent', 'Driver', 'Employee'], 
    default: 'All' 
  },
  targetClass: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicClass' }, // Optional, if for a specific class
  date: { type: Date, default: Date.now },
  attachmentUrl: { type: String }, // Optional attachment (PDF, Image, etc)
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);
