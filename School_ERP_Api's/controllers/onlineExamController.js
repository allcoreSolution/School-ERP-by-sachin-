const { OnlineExam, OnlineExamResult } = require('../models/OnlineExam');

exports.createExam = async (req, res, next) => {
  try {
    const exam = await OnlineExam.create(req.body);
    res.status(201).json({ success: true, data: exam });
  } catch (error) { next(error); }
};

exports.getExams = async (req, res, next) => {
  try {
    const { classId } = req.query;
    let query = { isActive: true };
    if(classId) query.academicClass = classId;
    
    // Do not return correctOptionIndex in public fetch! (Would need projection in real app)
    const exams = await OnlineExam.find(query).select('-questions.correctOptionIndex -questions.marks').populate('subject').sort({ startTime: -1 });
    res.status(200).json({ success: true, count: exams.length, data: exams });
  } catch (error) { next(error); }
};

exports.submitExam = async (req, res, next) => {
    try {
        const { examId, studentId, answers } = req.body;
        // answers array of { questionId, selectedOptionIndex }
        
        const exam = await OnlineExam.findById(examId);
        if (!exam) return res.status(404).json({ success: false, message: 'Exam not found' });
        
        let score = 0;
        let totalMarks = 0;
        
        exam.questions.forEach(q => {
            totalMarks += q.marks || 1;
            const submittedAns = answers.find(a => a.questionId.toString() === q._id.toString());
            if (submittedAns && submittedAns.selectedOptionIndex === q.correctOptionIndex) {
                 score += q.marks || 1;
            }
        });
        
        const result = await OnlineExamResult.findOneAndUpdate(
            { onlineExam: examId, student: studentId },
            { score, totalMarks, answers },
            { new: true, upsert: true }
        );
        
        res.status(200).json({ success: true, data: { score, totalMarks } });
    } catch (e) { next(e); }
};

exports.getOnlineExamResults = async (req, res, next) => {
    try {
        const { studentId, examId } = req.query;
        let query = {};
        if (studentId) query.student = studentId;
        if (examId) query.onlineExam = examId;
        
        const results = await OnlineExamResult.find(query).populate('onlineExam student');
        res.status(200).json({ success: true, count: results.length, data: results });
    } catch (e) { next(e); }
};
