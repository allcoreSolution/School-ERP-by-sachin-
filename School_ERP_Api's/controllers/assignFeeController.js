const AssignFee = require('../models/AssignFee');

exports.assignFeeToStudent = async (req, res) => {
  try {
    const { student, feeGroup, dueDate, customAmount } = req.body;
    
    // Check if already assigned
    const existing = await AssignFee.findOne({ student, feeGroup });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Fee group already assigned to this student' });
    }

    const assigned = await AssignFee.create({ student, feeGroup, dueDate, customAmount });
    res.status(201).json({ success: true, data: assigned });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAssignedFees = async (req, res) => {
  try {
    const assigned = await AssignFee.find()
      .populate('student', 'firstName lastName aparId')
      .populate({
        path: 'feeGroup',
        populate: { path: 'feeTypes' }
      });
    res.json({ success: true, count: assigned.length, data: assigned });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAssignedFeeById = async (req, res) => {
  try {
    const assigned = await AssignFee.findById(req.params.id)
      .populate('student', 'firstName lastName aparId')
      .populate({
        path: 'feeGroup',
        populate: { path: 'feeTypes' }
      });
    if (!assigned) return res.status(404).json({ success: false, message: 'Assigned fee not found' });
    res.json({ success: true, data: assigned });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAssignedFeesByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const assigned = await AssignFee.find({ student: studentId }).populate({
      path: 'feeGroup',
      populate: { path: 'feeTypes' }
    });
    res.json({ success: true, count: assigned.length, data: assigned });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateAssignedFee = async (req, res) => {
  try {
    const assigned = await AssignFee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!assigned) return res.status(404).json({ success: false, message: 'Assigned fee record not found' });
    res.json({ success: true, data: assigned });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteAssignedFee = async (req, res) => {
  try {
    const assigned = await AssignFee.findByIdAndDelete(req.params.id);
    if (!assigned) return res.status(404).json({ success: false, message: 'Assigned fee record not found' });
    res.json({ success: true, message: 'Assigned fee record deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
