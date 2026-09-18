const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  eventType: { type: String, enum: ['Event', 'Holiday', 'Seminar'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
