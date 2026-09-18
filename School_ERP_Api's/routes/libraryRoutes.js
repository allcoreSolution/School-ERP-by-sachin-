const express = require('express');
const router = express.Router();
const { addBook, getBooks, updateBook, deleteBook, issueBook, getIssuedBooks, returnBook } = require('../controllers/libraryController');

router.post('/books', addBook);
router.get('/books', getBooks);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

router.post('/issue', issueBook);
router.get('/issue', getIssuedBooks);
router.put('/return/:issueId', returnBook);

module.exports = router;
