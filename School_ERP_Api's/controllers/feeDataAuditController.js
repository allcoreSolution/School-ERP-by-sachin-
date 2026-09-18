const FeeDataAudit = require('../models/FeeDataAudit');

exports.logAudit = async (action, modelName, recordId, performedBy, details = {}) => {
  try {
    await FeeDataAudit.create({
      action,
      modelName,
      recordId,
      performedBy,
      details
    });
  } catch (error) {
    console.error('Failed to log fee data audit:', error);
  }
};

exports.getAudits = async (req, res) => {
  try {
    const audits = await FeeDataAudit.find()
      .populate('performedBy', 'username email')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: audits.length, data: audits });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
