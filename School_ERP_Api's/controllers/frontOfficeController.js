const { Visitor, Complaint } = require('../models/FrontOffice');

// Visitor APIs
exports.addVisitor = async (req, res, next) => {
  try {
    const visitor = await Visitor.create(req.body);
    res.status(201).json({ success: true, data: visitor });
  } catch (error) { next(error); }
};

exports.getVisitors = async (req, res, next) => {
  try {
    const { purpose, startDate, endDate } = req.query;
    let query = {};
    if (purpose) query.purpose = purpose;
    if (startDate && endDate) {
         query.inTime = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    const visitors = await Visitor.find(query).sort({ inTime: -1 });
    res.status(200).json({ success: true, count: visitors.length, data: visitors });
  } catch (error) { next(error); }
};

exports.updateVisitor = async (req, res, next) => {
  try {
      const visitor = await Visitor.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({ success: true, data: visitor });
  } catch (error) { next(error); }
};

exports.deleteVisitor = async (req, res, next) => {
  try {
      await Visitor.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, message: 'Visitor deleted' });
  } catch (error) { next(error); }
};

// Complaint APIs
exports.addComplaint = async (req, res, next) => {
    try {
      const complaint = await Complaint.create(req.body);
      res.status(201).json({ success: true, data: complaint });
    } catch (error) { next(error); }
};
  
exports.getComplaints = async (req, res, next) => {
    try {
      const { status, type } = req.query;
      let query = {};
      if (status) query.status = status;
      if (type) query.complaintType = type;
      const complaints = await Complaint.find(query).sort({ date: -1 });
      res.status(200).json({ success: true, count: complaints.length, data: complaints });
    } catch (error) { next(error); }
};

exports.updateComplaint = async (req, res, next) => {
  try {
      const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({ success: true, data: complaint });
  } catch (error) { next(error); }
};

exports.deleteComplaint = async (req, res, next) => {
  try {
      await Complaint.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, message: 'Complaint deleted' });
  } catch (error) { next(error); }
};
