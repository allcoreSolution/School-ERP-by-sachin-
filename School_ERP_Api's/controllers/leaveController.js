const Leave = require('../models/Leave');
const fs = require('fs');
const path = require('path');

const deleteFileFromDisk = (relativePath) => {
  if (!relativePath) return;
  const absolutePath = path.join(__dirname, '..', relativePath);
  fs.unlink(absolutePath, (err) => {
    if (err && err.code !== 'ENOENT') console.error(`Failed to delete file: ${absolutePath}`, err);
  });
};

exports.applyLeave = async (req, res, next) => {
  try {
    const leaveData = { ...req.body };
    if (req.file) {
      leaveData.attachmentUrl = `uploads/documents/${req.file.filename}`;
    }
    const leave = await Leave.create(leaveData);
    res.status(201).json({ success: true, data: leave });
  } catch (error) { 
    if (req.file) deleteFileFromDisk(`uploads/documents/${req.file.filename}`);
    next(error); 
  }
};

exports.getMyLeaves = async (req, res, next) => {
  try {
    const { studentId, staffId, status } = req.query;
    let query = {};
    if(studentId) query.studentId = studentId;
    if(staffId) query.staffId = staffId;
    if(status) query.status = status;
    
    const leaves = await Leave.find(query)
      .populate('staffId studentId', 'firstName lastName')
      .sort({ startDate: -1 });
    res.status(200).json({ success: true, count: leaves.length, data: leaves });
  } catch (error) { next(error); }
};

exports.updateLeaveStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;
    const leave = await Leave.findByIdAndUpdate(id, { status, remarks }, { new: true });
    res.status(200).json({ success: true, data: leave });
  } catch (error) { next(error); }
};

exports.deleteLeave = async (req, res, next) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ success: false, message: 'Leave not found' });
    
    if (leave.attachmentUrl) {
      deleteFileFromDisk(leave.attachmentUrl);
    }
    
    await leave.deleteOne();
    res.status(200).json({ success: true, message: 'Leave deleted successfully' });
  } catch(error) { next(error); }
};
