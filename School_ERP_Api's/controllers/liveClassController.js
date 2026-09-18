const LiveClass = require('../models/LiveClass');

exports.scheduleLiveClass = async (req, res, next) => {
  try {
    const liveClass = await LiveClass.create(req.body);
    res.status(201).json({ success: true, data: liveClass });
  } catch (error) { next(error); }
};

exports.getLiveClasses = async (req, res, next) => {
  try {
    const { classId, sectionId } = req.query;
    let query = {};
    if(classId) query.academicClass = classId;
    if(sectionId) query.section = sectionId;

    const classes = await LiveClass.find(query)
        .populate('hostId', 'name')
        .populate('subject')
        .sort({ startTime: -1 });
        
    res.status(200).json({ success: true, count: classes.length, data: classes });
  } catch (error) { next(error); }
};
