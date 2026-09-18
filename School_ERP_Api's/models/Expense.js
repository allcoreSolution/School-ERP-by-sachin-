const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true }, // Utility, Maintenance, Event, Misc
  date: { type: Date, default: Date.now },
  description: { type: String },
  recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiptUrl: { type: String } // Optional proof of expense
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
