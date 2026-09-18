const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  purpose: { type: String, required: true },
  meetingWith: { type: String, required: true },
  visitorType: { type: String, enum: ['Parent', 'Vendor', 'Guest', 'Other'], default: 'Parent' },
  inTime: { type: Date, default: Date.now },
  outTime: { type: Date },
  status: { type: String, enum: ['In', 'Out'], default: 'In' }
}, { timestamps: true });

const complaintSchema = new mongoose.Schema({
  complainantName: { type: String, required: true },
  complaintType: { type: String, required: true }, // e.g., Academic, Facilities
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Open', 'In-Progress', 'Resolved'], default: 'Open' },
  actionTaken: { type: String }
}, { timestamps: true });

const Visitor = mongoose.model('Visitor', visitorSchema);
const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = { Visitor, Complaint };
