const { Exam, ExamResult } = require('../models/Exam');

exports.createExam = async (req, res, next) => {
    try {
        const exam = await Exam.create(req.body);
        res.status(201).json({ success: true, data: exam });
    } catch (e) { next(e); }
};

exports.getExams = async (req, res, next) => {
    try {
        const exams = await Exam.find().populate('academicClass');
        res.status(200).json({ success: true, count: exams.length, data: exams });
    } catch (e) { next(e); }
};

// Insert or update result for one or multiple subjects/students
exports.addResult = async (req, res, next) => {
    try {
        const records = Array.isArray(req.body) ? req.body : [req.body];
        let saved = [];
        
        for (const rec of records) {
            let result = await ExamResult.findOne({ 
                exam: rec.exam, student: rec.student, subject: rec.subject 
            });
            if (result) {
                result.marksObtained = rec.marksObtained;
                result.maxMarks = rec.maxMarks;
                result.remarks = rec.remarks;
                await result.save();
                saved.push(result);
            } else {
                const newRes = await ExamResult.create(rec);
                saved.push(newRes);
            }
        }
        res.status(200).json({ success: true, count: saved.length, data: saved });
    } catch (e) { next(e); }
};

exports.getStudentResult = async (req, res, next) => {
    try {
        const { examId, studentId, classId } = req.query;
        let query = {};
        if (examId) query.exam = examId;
        if (studentId) query.student = studentId;

        let results = await ExamResult.find(query)
            .populate('subject', 'subjectName code')
            .populate('student', 'firstName lastName rollNo');
            
        // If they want a generated summary/card per student
        if (studentId && examId) {
            let totalObtained = 0;
            let totalMax = 0;
            results.forEach(r => {
                totalObtained += r.marksObtained;
                totalMax += r.maxMarks;
            });
            
            let percentage = totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(2) : 0;
            let grade = 'F';
            if (percentage >= 90) grade = 'A+';
            else if (percentage >= 80) grade = 'A';
            else if (percentage >= 70) grade = 'B';
            else if (percentage >= 60) grade = 'C';
            else if (percentage >= 50) grade = 'D';

            return res.status(200).json({ 
                success: true, 
                summary: { totalObtained, totalMax, percentage, grade },
                data: results 
            });
        }

        res.status(200).json({ success: true, count: results.length, data: results });
    } catch (e) { next(e); }
};

exports.deleteExam = async (req, res, next) => {
    try {
        const exam = await Exam.findByIdAndDelete(req.params.id);
        if (!exam) return res.status(404).json({ success: false, message: 'Exam not found' });
        // Also delete related results
        await ExamResult.deleteMany({ exam: req.params.id });
        res.status(200).json({ success: true, message: 'Exam and results deleted' });
    } catch(e) { next(e); }
};
