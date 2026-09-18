const express = require('express');
const router = express.Router();
const { applyLeave, getMyLeaves, updateLeaveStatus, deleteLeave } = require('../controllers/leaveController');
const { uploadAttachment } = require('../middleware/uploadMiddleware');

router.post('/apply', uploadAttachment, applyLeave);
router.get('/my-leaves', getMyLeaves);
router.put('/status/:id', updateLeaveStatus);
router.delete('/:id', deleteLeave);

module.exports = router;
