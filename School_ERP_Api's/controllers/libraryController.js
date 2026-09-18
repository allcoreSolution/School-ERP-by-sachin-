const { Book, BookIssue } = require('../models/Library');

// ======================== BOOK APIs ========================
exports.addBook = async (req, res, next) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({ success: true, data: book });
    } catch (e) { next(e); }
};

exports.getBooks = async (req, res, next) => {
    try {
        const { search, category } = req.query;
        let query = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } },
                { isbn: { $regex: search, $options: 'i' } }
            ];
        }
        if (category) query.category = category;

        const books = await Book.find(query).sort({ title: 1 });
        res.status(200).json({ success: true, count: books.length, data: books });
    } catch (e) { next(e); }
};

exports.updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: book });
    } catch (e) { next(e); }
};

exports.deleteBook = async (req, res, next) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Book deleted' });
    } catch (e) { next(e); }
};

// ======================== ISSUE APIs ========================
exports.issueBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.body.book);
        if (!book || book.available <= 0) {
             return res.status(400).json({ success: false, message: 'Book not available for issue' });
        }
        
        const issueRecord = await BookIssue.create(req.body);
        book.available -= 1;
        await book.save();

        res.status(201).json({ success: true, data: issueRecord });
    } catch (e) { next(e); }
};

exports.getIssuedBooks = async (req, res, next) => {
    try {
        const { studentId, status } = req.query;
        let query = {};
        if (studentId) query.issuedTo = studentId;
        if (status) query.status = status;

        const records = await BookIssue.find(query)
           .populate('book', 'title author isbn')
           .populate('issuedTo', 'firstName lastName rollNo aparId')
           .sort({ issueDate: -1 });

        res.status(200).json({ success: true, count: records.length, data: records });
    } catch(e) { next(e); }
};

exports.returnBook = async (req, res, next) => {
    try {
        const { issueId } = req.params;
        const issueRecord = await BookIssue.findById(issueId);
        if(!issueRecord) return res.status(404).json({ success: false, message: 'Record not found' });
        
        if (issueRecord.status === 'Returned') {
             return res.status(400).json({ success: false, message: 'Already returned' });
        }

        const now = new Date();
        issueRecord.status = 'Returned';
        issueRecord.returnDate = now;
        
        // Calculate late fine (Assuming 10 rupees per day if overdue)
        if (now > issueRecord.dueDate) {
             const diffTime = Math.abs(now - issueRecord.dueDate);
             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
             issueRecord.fineAmount = diffDays * 10;
        }

        await issueRecord.save();
        
        // Increase availability
        await Book.findByIdAndUpdate(issueRecord.book, { $inc: { available: 1 } });
        res.status(200).json({ success: true, data: issueRecord });
    } catch (e) { next(e); }
};
