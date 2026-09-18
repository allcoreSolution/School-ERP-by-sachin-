const AcademicClass = require('../models/AcademicClass');
const AcademicSection = require('../models/AcademicSection');
const AcademicSubject = require('../models/AcademicSubject');

// ======================== CLASSES ========================
exports.createClass = async (req, res, next) => {
  try {
    const newClass = await AcademicClass.create(req.body);
    res.status(201).json({ success: true, data: newClass });
  } catch (error) { next(error); }
};

exports.getClasses = async (req, res, next) => {
  try {
    const classes = await AcademicClass.find().populate('sections');
    res.status(200).json({ success: true, count: classes.length, data: classes });
  } catch (error) { next(error); }
};

exports.assignSectionToClass = async (req, res, next) => {
    try {
      const { classId, sectionId } = req.body;
      const academicClass = await AcademicClass.findById(classId);
      if(!academicClass) return res.status(404).json({success: false, message: 'Class not found'});
      
      if(!academicClass.sections.includes(sectionId)) {
        academicClass.sections.push(sectionId);
        await academicClass.save();
      }
      res.status(200).json({ success: true, data: academicClass });
    } catch(error) { next(error); }
};

// ======================== SECTIONS ========================
exports.createSection = async (req, res, next) => {
  try {
    const newSection = await AcademicSection.create(req.body);
    res.status(201).json({ success: true, data: newSection });
  } catch (error) { next(error); }
};

exports.getSections = async (req, res, next) => {
  try {
    const sections = await AcademicSection.find();
    res.status(200).json({ success: true, count: sections.length, data: sections });
  } catch (error) { next(error); }
};

// ======================== SUBJECTS ========================
exports.createSubject = async (req, res, next) => {
  try {
    const newSubject = await AcademicSubject.create(req.body);
    res.status(201).json({ success: true, data: newSubject });
  } catch (error) { next(error); }
};

exports.getSubjects = async (req, res, next) => {
  try {
    const subjects = await AcademicSubject.find();
    res.status(200).json({ success: true, count: subjects.length, data: subjects });
  } catch (error) { next(error); }
};

exports.deleteClass = async (req, res, next) => {
  try {
    const deleted = await AcademicClass.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Class not found' });
    res.status(200).json({ success: true, message: 'Class deleted successfully' });
  } catch (error) { next(error); }
};

exports.deleteSection = async (req, res, next) => {
  try {
    const deleted = await AcademicSection.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Section not found' });
    res.status(200).json({ success: true, message: 'Section deleted successfully' });
  } catch (error) { next(error); }
};

exports.deleteSubject = async (req, res, next) => {
  try {
    const deleted = await AcademicSubject.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Subject not found' });
    res.status(200).json({ success: true, message: 'Subject deleted successfully' });
  } catch (error) { next(error); }
};
