const Homework = require('../models/Homework');
const fs = require('fs');
const path = require('path');

const deleteFileFromDisk = (relativePath) => {
  if (!relativePath) return;
  const absolutePath = path.join(__dirname, '..', relativePath);
  fs.unlink(absolutePath, (err) => {
    if (err && err.code !== 'ENOENT') console.error(`Failed to delete file: ${absolutePath}`, err);
  });
};

exports.assignHomework = async (req, res, next) => {
  try {
    const homeworkData = { ...req.body };
    
    // Handle file upload
    if (req.file) {
      homeworkData.fileUrl = `uploads/documents/${req.file.filename}`;
    }

    const homework = await Homework.create(homeworkData);
    res.status(201).json({ success: true, data: homework });
  } catch (error) { 
    if (req.file) deleteFileFromDisk(`uploads/documents/${req.file.filename}`);
    next(error); 
  }
};

exports.getHomework = async (req, res, next) => {
  try {
    const { classId, sectionId, subjectId } = req.query;
    let query = {};
    if(classId) query.academicClass = classId;
    if(sectionId) query.section = sectionId;
    if(subjectId) query.subject = subjectId;

    const homeworks = await Homework.find(query)
        .populate('subject academicClass section assignedBy', 'subjectName className sectionName firstName lastName')
        .sort({ assignDate: -1 });
        
    res.status(200).json({ success: true, count: homeworks.length, data: homeworks });
  } catch (error) { next(error); }
};

exports.deleteHomework = async (req, res, next) => {
  try {
    const homework = await Homework.findById(req.params.id);
    if (!homework) {
      return res.status(404).json({ success: false, message: 'Homework not found' });
    }

    if (homework.fileUrl) {
      deleteFileFromDisk(homework.fileUrl);
    }

    await homework.deleteOne();
    res.status(200).json({ success: true, message: 'Homework deleted successfully' });
  } catch(error) { next(error); }
};
