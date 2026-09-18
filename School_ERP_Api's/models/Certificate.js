const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  certificateType: { type: String, enum: ['Transfer', 'Character', 'Bonafide', 'Sports'], required: true },
  issueDate: { type: Date, default: Date.now },
  referenceNumber: { type: String, unique: true },
  remarks: { type: String },
  issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
