const mongoose = require('mongoose');

const academicSectionSchema = new mongoose.Schema({
  sectionName: {
    type: String, // e.g., "A", "B", "Rose", "Blue"
    required: true,
    trim: true,
    unique: true
  },
  capacity: {
    type: Number,
    default: 40 // Default student capacity per section
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('AcademicSection', academicSectionSchema);
