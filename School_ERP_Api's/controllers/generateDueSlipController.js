const AssignFee = require('../models/AssignFee');
const FeeCollection = require('../models/FeeCollection');
const DueSlipHistory = require('../models/DueSlipHistory');

const getExpectedAmount = (assignRecord) => {
  if (assignRecord.customAmount !== null && assignRecord.customAmount !== undefined) {
    return assignRecord.customAmount;
  }
  if (!assignRecord.feeGroup || !assignRecord.feeGroup.feeTypes) return 0;
  return assignRecord.feeGroup.feeTypes.reduce((sum, item) => sum + (item.amount || 0), 0);
};

exports.generateDueSlips = async (req, res) => {
  try {
    const { targetClass, targetSection } = req.body;

    // Fetch assigned fees
    const assignedFees = await AssignFee.find()
      .populate('student', 'firstName lastName aparId studentEmail studentPhone')
      .populate({
        path: 'feeGroup',
        populate: { path: 'feeTypes.feeType' }
      });

    const collections = await FeeCollection.find();
    const studentMap = {};

    assignedFees.forEach(record => {
      if (!record.student) return;
      
      const studentId = record.student._id.toString();
      const expected = getExpectedAmount(record);

      if (!studentMap[studentId]) {
        studentMap[studentId] = {
          student: record.student,
          totalAssigned: 0,
          totalPaid: 0,
          totalDue: 0
        };
      }

      studentMap[studentId].totalAssigned += expected;
    });

    collections.forEach(payment => {
      const studentId = payment.student.toString();
      if (studentMap[studentId]) {
        studentMap[studentId].totalPaid += payment.amountPaid;
      }
    });

    // Calculate dues and filter students with dues
    const dueStudents = Object.values(studentMap).map(item => {
      item.totalDue = Math.max(0, item.totalAssigned - item.totalPaid);
      return item;
    }).filter(item => item.totalDue > 0);

    if (dueStudents.length === 0) {
      return res.status(200).json({ success: true, message: 'No students with outstanding dues found', data: [] });
    }

    const totalDueAmount = dueStudents.reduce((sum, s) => sum + s.totalDue, 0);

    // Generate unique batch ID
    const count = await DueSlipHistory.countDocuments();
    const uniqueTime = Date.now().toString().slice(-4);
    const batchId = `BATCH-${uniqueTime}-${count + 1001}`;

    const history = await DueSlipHistory.create({
      batchId,
      generatedBy: req.user._id,
      studentsCount: dueStudents.length,
      totalDueAmount,
      targetClass: targetClass || 'All',
      targetSection: targetSection || 'All'
    });

    res.status(201).json({
      success: true,
      message: 'Due slips generated successfully',
      batch: history,
      slips: dueStudents
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
