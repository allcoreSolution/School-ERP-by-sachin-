const express = require('express');
const router = express.Router();
const { createNotice, getNotices, deleteNotice } = require('../controllers/noticeController');
const { uploadAttachment } = require('../middleware/uploadMiddleware');

router.post('/', uploadAttachment, createNotice);
router.get('/', getNotices);
router.delete('/:id', deleteNotice);

module.exports = router;
