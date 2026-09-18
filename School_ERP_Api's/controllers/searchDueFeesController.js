const AssignFee = require('../models/AssignFee');
const FeeCollection = require('../models/FeeCollection');

const getExpectedAmount = (assignRecord) => {
  if (assignRecord.customAmount !== null && assignRecord.customAmount !== undefined) {
    return assignRecord.customAmount;
  }
  if (!assignRecord.feeGroup || !assignRecord.feeGroup.feeTypes) return 0;
  return assignRecord.feeGroup.feeTypes.reduce((sum, item) => sum + (item.amount || 0), 0);
};

exports.searchDueFees = async (req, res) => {
  try {
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
          totalDue: 0,
          groups: []
        };
      }

      studentMap[studentId].totalAssigned += expected;
      studentMap[studentId].groups.push({
        feeGroupId: record.feeGroup._id,
        name: record.feeGroup.name,
        expected,
        paid: 0,
        due: expected,
        dueDate: record.dueDate
      });
    });

    collections.forEach(payment => {
      const studentId = payment.student.toString();
      const groupId = payment.feeGroup.toString();

      if (studentMap[studentId]) {
        studentMap[studentId].totalPaid += payment.amountPaid;
        const groupObj = studentMap[studentId].groups.find(g => g.feeGroupId.toString() === groupId);
        if (groupObj) {
          groupObj.paid += payment.amountPaid;
          groupObj.due = Math.max(0, groupObj.expected - groupObj.paid);
        }
      }
    });

    const results = Object.values(studentMap).map(item => {
      item.totalDue = Math.max(0, item.totalAssigned - item.totalPaid);
      return item;
    }).filter(item => item.totalDue > 0);

    res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchStudentDueFees = async (req, res) => {
  try {
    const studentId = req.query.studentId;
    if (!studentId) return res.status(400).json({ success: false, message: 'studentId required' });

    const assignedFees = await AssignFee.find({ student: studentId })
      .populate('student', 'firstName lastName aparId studentEmail studentPhone')
      .populate({
        path: 'feeGroup',
        populate: { path: 'feeTypes.feeType' }
      });

    const collections = await FeeCollection.find({ student: studentId });
    
    if (assignedFees.length === 0) {
       return res.json({ success: true, data: [] });
    }

    const studentMap = {
      student: assignedFees[0].student,
      totalAssigned: 0,
      totalPaid: 0,
      totalDue: 0,
      groups: []
    };

    assignedFees.forEach(record => {
      const expected = getExpectedAmount(record);
      studentMap.totalAssigned += expected;
      studentMap.groups.push({
        feeGroupId: record.feeGroup._id,
        name: record.feeGroup.name,
        expected,
        paid: 0,
        due: expected,
        dueDate: record.dueDate
      });
    });

    collections.forEach(payment => {
      const groupId = payment.feeGroup.toString();
      studentMap.totalPaid += payment.amountPaid;
      const groupObj = studentMap.groups.find(g => g.feeGroupId.toString() === groupId);
      if (groupObj) {
        groupObj.paid += payment.amountPaid;
        groupObj.due = Math.max(0, groupObj.expected - groupObj.paid);
      }
    });

    studentMap.totalDue = Math.max(0, studentMap.totalAssigned - studentMap.totalPaid);

    res.json({ success: true, data: [studentMap] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
