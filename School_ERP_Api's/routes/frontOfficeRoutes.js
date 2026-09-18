const express = require('express');
const router = express.Router();
const { addVisitor, getVisitors, updateVisitor, deleteVisitor, addComplaint, getComplaints, updateComplaint, deleteComplaint } = require('../controllers/frontOfficeController');

router.post('/visitors', addVisitor);
router.get('/visitors', getVisitors);
router.put('/visitors/:id', updateVisitor);
router.delete('/visitors/:id', deleteVisitor);

router.post('/complaints', addComplaint);
router.get('/complaints', getComplaints);
router.put('/complaints/:id', updateComplaint);
router.delete('/complaints/:id', deleteComplaint);

module.exports = router;
