const Lead = require('../models/Lead');

exports.createLead = async (req, res, next) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json({ success: true, data: lead });
  } catch (error) { next(error); }
};

exports.getLeads = async (req, res, next) => {
  try {
    const { status, source, assignedTo, startDate, endDate } = req.query;
    let query = {};
    if (status) query.status = status;
    if (source) query.source = source;
    if (assignedTo) query.assignedTo = assignedTo;
    if (startDate && endDate) {
        query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const leads = await Lead.find(query)
      .populate('assignedTo', 'firstName lastName email contactNumber')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: leads.length, data: leads });
  } catch (error) { next(error); }
};

exports.updateLeadStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const lead = await Lead.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: lead });
    } catch (error) { next(error); }
};

exports.deleteLead = async (req, res, next) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
        
        await lead.deleteOne();
        res.status(200).json({ success: true, message: 'Lead deleted successfully' });
    } catch (error) { next(error); }
};
