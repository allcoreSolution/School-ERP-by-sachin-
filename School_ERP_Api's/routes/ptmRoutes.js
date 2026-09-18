const express = require('express');
const router = express.Router();
const { requestMeeting, getMeetings, updateMeeting, deleteMeeting } = require('../controllers/ptmController');

router.post('/', requestMeeting);
router.get('/', getMeetings);
router.put('/:id', updateMeeting);
router.delete('/:id', deleteMeeting);

module.exports = router;
