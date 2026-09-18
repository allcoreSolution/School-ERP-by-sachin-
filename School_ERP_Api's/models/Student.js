const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  // Basic Admission Info
  aparId: {
    type: String,
    required: [true, 'APAR ID is required'],
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female', 'Other', 'Select'],
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of Birth is required'],
  },
  category: {
    type: String,
    trim: true,
  },
  house: {
    type: String,
    trim: true,
  },
  religion: {
    type: String,
    trim: true,
  },
  aadhaar: {
    type: String,
    trim: true,
  },
  caste: {
    type: String,
    trim: true,
  },
  subCaste: {
    type: String,
    trim: true,
  },
  placeOfBirth: {
    type: String,
    trim: true,
  },
  nationality: {
    type: String,
    default: 'Indian',
    trim: true,
  },
  bpl: {
    type: Boolean,
    default: false,
  },
  rte: {
    type: Boolean,
    default: false,
  },
  studentPhone: {
    type: String,
    trim: true,
  },
  studentEmail: {
    type: String,
    trim: true,
  },
  // Photos and Documents
  studentPhoto: {
    type: String, // file path / url
    default: null,
  },
  documents: [
    {
      documentName: {
        type: String,
        required: true,
      },
      fileUrl: {
        type: String,
        required: true,
      }
    }
  ],
  // Physical and Medical details
  height: {
    type: Number, // in cm
  },
  weight: {
    type: Number, // in kg
  },
  medicalHistory: {
    type: String,
    trim: true,
  },
  // Academic & Relational Details
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AcademicClass',
  },
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // Dynamic fields (for test1, test2 or any other extra fields)
  extraFields: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Student', studentSchema);
