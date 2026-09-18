const express = require('express');
const router = express.Router();
const { 
    createClass, getClasses, assignSectionToClass, deleteClass,
    createSection, getSections, deleteSection,
    createSubject, getSubjects, deleteSubject
} = require('../controllers/academicsController');

// Class Routes
router.post('/classes', createClass);
router.get('/classes', getClasses);
router.post('/classes/assign-section', assignSectionToClass);
router.delete('/classes/:id', deleteClass);

// Section Routes
router.post('/sections', createSection);
router.get('/sections', getSections);
router.delete('/sections/:id', deleteSection);

// Subject Routes
router.post('/subjects', createSubject);
router.get('/subjects', getSubjects);
router.delete('/subjects/:id', deleteSubject);

module.exports = router;
