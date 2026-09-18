const Notice = require('../models/Notice');
const fs = require('fs');
const path = require('path');

const deleteFileFromDisk = (relativePath) => {
  if (!relativePath) return;
  const absolutePath = path.join(__dirname, '..', relativePath);
  fs.unlink(absolutePath, (err) => {
    if (err && err.code !== 'ENOENT') console.error(`Failed to delete file: ${absolutePath}`, err);
  });
};

exports.createNotice = async (req, res, next) => {
  try {
    const noticeData = { ...req.body };
    
    // Handle file upload
    if (req.file) {
      noticeData.attachmentUrl = `uploads/documents/${req.file.filename}`;
    }

    const notice = await Notice.create(noticeData);
    res.status(201).json({ success: true, data: notice });
  } catch (error) { 
    // Cleanup on failure
    if (req.file) deleteFileFromDisk(`uploads/documents/${req.file.filename}`);
    next(error); 
  }
};

exports.getNotices = async (req, res, next) => {
  try {
    const { audience, classId } = req.query; // ?audience=Student
    let query = { isActive: true };
    
    if(audience) {
      query.targetAudience = { $in: ['All', audience] };
    }
    if (classId) {
       query.$or = [{ targetClass: classId }, { targetClass: { $exists: false } }, { targetClass: null }];
    }

    const notices = await Notice.find(query).sort({ date: -1 });
    res.status(200).json({ success: true, count: notices.length, data: notices });
  } catch (error) { next(error); }
};

exports.deleteNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    if (notice.attachmentUrl) {
      deleteFileFromDisk(notice.attachmentUrl);
    }

    await notice.deleteOne();
    res.status(200).json({ success: true, message: 'Notice deleted successfully' });
  } catch(error) { next(error); }
};
