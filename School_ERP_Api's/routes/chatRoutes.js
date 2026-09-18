const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, markAsRead, deleteMessage } = require('../controllers/chatController');
const { uploadAttachment } = require('../middleware/uploadMiddleware');

router.post('/send', uploadAttachment, sendMessage);
router.get('/conversation', getMessages);
router.put('/:messageId/read', markAsRead);
router.delete('/:messageId', deleteMessage);

module.exports = router;
