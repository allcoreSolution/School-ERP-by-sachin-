const express = require('express');
const router = express.Router();
const { assignHomework, getHomework, deleteHomework } = require('../controllers/homeworkController');
const { uploadAttachment } = require('../middleware/uploadMiddleware');

router.post('/assign', uploadAttachment, assignHomework);
router.get('/', getHomework); // pass ?classId=&sectionId=
router.delete('/:id', deleteHomework);

module.exports = router;
