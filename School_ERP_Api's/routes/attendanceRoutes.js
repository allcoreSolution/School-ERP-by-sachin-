const express = require('express');
const router = express.Router();
const { markAttendance, getAttendanceByClass, getStudentAttendance, deleteAttendance } = require('../controllers/attendanceController');

// Define API routes
router.post('/mark', markAttendance); // Upsert student attendance (now supports array for bulk)
router.get('/class-date', getAttendanceByClass); // query ?classId=&sectionId=&date= or startDate/endDate
router.get('/student/:studentId', getStudentAttendance); // query month/year or startDate/endDate
router.delete('/:id', deleteAttendance);

module.exports = router;
