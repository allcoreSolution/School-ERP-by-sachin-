const PTM = require('../models/PTM');

exports.requestMeeting = async (req, res, next) => {
  try {
    const meeting = await PTM.create(req.body);
    res.status(201).json({ success: true, data: meeting });
  } catch (error) { next(error); }
};

exports.getMeetings = async (req, res, next) => {
  try {
    const { teacherId, studentId, status } = req.query;
    let query = {};
    if(teacherId) query.teacherId = teacherId;
    if(studentId) query.studentId = studentId;
    if(status) query.status = status;

    const meetings = await PTM.find(query)
        .populate('teacherId', 'firstName lastName')
        .populate('studentId', 'firstName lastName rollNo')
        .sort({ meetingDate: 1 });
    res.status(200).json({ success: true, count: meetings.length, data: meetings });
  } catch (error) { next(error); }
};

exports.updateMeeting = async (req, res, next) => {
    try {
        const meeting = await PTM.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: meeting });
    } catch (error) { next(error); }
};

exports.deleteMeeting = async (req, res, next) => {
    try {
        await PTM.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Meeting deleted' });
    } catch (error) { next(error); }
};
