const mongoose = require('mongoose');

const academicClassSchema = new mongoose.Schema({
  className: {
    type: String, // e.g., "Class 1", "Class 10", "Nursery"
    required: true,
    trim: true,
    unique: true
  },
  numericValue: {
    type: Number, // useful for sorting or logic e.g., 1, 10
    required: true
  },
  sections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AcademicSection'
  }],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('AcademicClass', academicClassSchema);
