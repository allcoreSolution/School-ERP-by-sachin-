const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true }, // The school that raised the ticket
  status: { type: String, enum: ['Open', 'In Progress', 'Resolved', 'Closed'], default: 'Open' },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
  replies: [{
    sender: { type: String }, // 'SuperAdmin' or 'Client'
    message: { type: String },
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('SupportTicket', supportTicketSchema);
