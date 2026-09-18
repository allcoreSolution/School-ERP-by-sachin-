const Expense = require('../models/Expense');
const fs = require('fs');
const path = require('path');

const deleteFileFromDisk = (relativePath) => {
  if (!relativePath) return;
  const absolutePath = path.join(__dirname, '..', relativePath);
  fs.unlink(absolutePath, (err) => {
    if (err && err.code !== 'ENOENT') console.error(`Failed to delete file: ${absolutePath}`, err);
  });
};

exports.addExpense = async (req, res, next) => {
  try {
    const expenseData = { ...req.body };
    if (req.file) {
      expenseData.receiptUrl = `uploads/documents/${req.file.filename}`;
    }
    const expense = await Expense.create(expenseData);
    res.status(201).json({ success: true, data: expense });
  } catch (error) { 
    if (req.file) deleteFileFromDisk(`uploads/documents/${req.file.filename}`);
    next(error); 
  }
};

exports.getExpenses = async (req, res, next) => {
  try {
    const { category, startDate, endDate } = req.query;
    let query = {};
    if (category) query.category = category;
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const expenses = await Expense.find(query)
      .populate('recordedBy', 'name email role')
      .sort({ date: -1 });
    res.status(200).json({ success: true, count: expenses.length, data: expenses });
  } catch (error) { next(error); }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ success: false, message: 'Expense not found' });
    
    if (expense.receiptUrl) {
      deleteFileFromDisk(expense.receiptUrl);
    }
    
    await expense.deleteOne();
    res.status(200).json({ success: true, message: 'Expense deleted successfully' });
  } catch(error) { next(error); }
};
