const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  parentName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String },
  targetClass: { type: String, required: true },
  source: { type: String, enum: ['Website', 'Walk-in', 'Phone', 'Referral'], default: 'Website' },
  status: { type: String, enum: ['New', 'Contacted', 'Qualified', 'Lost', 'Converted'], default: 'New' },
  followUpDate: { type: Date },
  notes: { type: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
