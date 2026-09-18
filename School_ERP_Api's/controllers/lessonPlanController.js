const LessonPlan = require('../models/LessonPlan');

exports.createPlan = async (req, res, next) => {
  try {
    const plan = await LessonPlan.create(req.body);
    res.status(201).json({ success: true, data: plan });
  } catch (error) { next(error); }
};

exports.getPlans = async (req, res, next) => {
  try {
    const { teacherId, classId, subjectId } = req.query;
    let query = {};
    if(teacherId) query.teacher = teacherId;
    if(classId) query.academicClass = classId;
    if(subjectId) query.subject = subjectId;

    const plans = await LessonPlan.find(query)
      .populate('subject', 'subjectName code')
      .populate('teacher', 'firstName lastName')
      .sort({ startDate: 1 });
    res.status(200).json({ success: true, count: plans.length, data: plans });
  } catch (error) { next(error); }
};

exports.updatePlan = async (req, res, next) => {
    try {
        const plan = await LessonPlan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: plan });
    } catch (error) { next(error); }
};

exports.deletePlan = async (req, res, next) => {
    try {
        await LessonPlan.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Lesson Plan deleted' });
    } catch (error) { next(error); }
};
