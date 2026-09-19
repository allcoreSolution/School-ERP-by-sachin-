const Attendance = require('../models/Attendance');

exports.markAttendance = async (req, res, next) => {
  try {
    // Determine if it's a bulk operation (array of attendance records) or a single record
    const records = Array.isArray(req.body) ? req.body : [req.body];
    const savedRecords = [];
    
    for (const record of records) {
      const { student, date, status, academicClass, section, remarks } = record;
      let attendance = await Attendance.findOne({ student, date });
      
      if (attendance) {
        attendance.status = status;
        attendance.remarks = remarks;
        await attendance.save();
        savedRecords.push(attendance);
      } else {
        attendance = await Attendance.create(record);
        savedRecords.push(attendance);
      }
    }
    
    // In a real app, Push Notification to parent triggers would go here
    // e.g. if status == 'Absent' => triggerNotificationService(...)

    res.status(200).json({ success: true, count: savedRecords.length, data: savedRecords });
  } catch (error) { next(error); }
};

exports.getAttendanceByClass = async (req, res, next) => {
  try {
    const { classId, sectionId, date, startDate, endDate } = req.query;
    let query = {};
    if (classId) query.academicClass = classId;
    if (sectionId) query.section = sectionId;
    
    // Support either single date or date range
    if (date) {
        query.date = date;
    } else if (startDate && endDate) {
        query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const records = await Attendance.find(query)
        .populate('student', 'firstName lastName aparId')
        .sort({ date: -1 });
    res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) { next(error); }
};

exports.getStudentAttendance = async (req, res, next) => {
    try {
        const { studentId } = req.params;
        const { month, year, startDate, endDate } = req.query;
        let query = { student: studentId };

        if (startDate && endDate) {
            query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        } else if (month && year) {
            const startStr = `${year}-${month.toString().padStart(2, '0')}-01`;
            const endStr = new Date(year, month, 0).toISOString().split('T')[0];
            query.date = { $gte: new Date(startStr), $lte: new Date(endStr) };
        }

        const records = await Attendance.find(query).sort({ date: 1 });
        res.status(200).json({ success: true, count: records.length, data: records });
    } catch (error) { next(error); }
};

exports.deleteAttendance = async (req, res, next) => {
    try {
        const attendance = await Attendance.findByIdAndDelete(req.params.id);
        if (!attendance) return res.status(404).json({ success: false, message: 'Attendance record not found' });
        res.status(200).json({ success: true, message: 'Record deleted successfully' });
    } catch (error) { next(error); }
};

exports.getQRScanLogs = async (req, res, next) => {
    try {
        const QRScanLog = require('../models/QRScanLog');
        const logs = await QRScanLog.find({}).sort({ time: -1 }).limit(100);
        res.status(200).json({ success: true, count: logs.length, data: logs });
    } catch (error) { next(error); }
};

exports.getQRAttendanceReport = async (req, res, next) => {
    try {
        const records = await Attendance.find({})
            .populate('student', 'firstName lastName aparId')
            .populate('academicClass', 'className')
            .sort({ date: -1 })
            .limit(100);
            
        // Map to expected frontend format
        const formatted = records.map(r => ({
            id: r._id,
            date: r.date ? r.date.toISOString().split('T')[0] : '',
            name: r.student ? `${r.student.firstName || ''} ${r.student.lastName || ''}`.trim() : 'Unknown',
            type: 'Student', // hardcoded as Student for now as per Attendance schema
            classDesig: r.academicClass ? r.academicClass.className : 'N/A',
            admStaffId: r.student ? r.student.aparId || 'N/A' : 'N/A',
            in: '08:00 AM', // Mocked time as Attendance schema doesn't store exact IN/OUT yet
            out: '02:00 PM',
            duration: '6h 0m',
            status: r.status
        }));
        
        res.status(200).json({ success: true, count: formatted.length, data: formatted });
    } catch (error) { next(error); }
};
