const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, unique: true },
  quantity: { type: Number, default: 1 },
  available: { type: Number, default: 1 },
  category: { type: String }
}, { timestamps: true });

const bookIssueSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  issuedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date },
  status: { type: String, enum: ['Issued', 'Returned', 'Overdue'], default: 'Issued' },
  fineAmount: { type: Number, default: 0 }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
const BookIssue = mongoose.model('BookIssue', bookIssueSchema);

module.exports = { Book, BookIssue };
