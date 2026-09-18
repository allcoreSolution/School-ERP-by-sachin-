const Certificate = require('../models/Certificate');

exports.issueCertificate = async (req, res, next) => {
  try {
    // Basic unique Reference Number generator
    req.body.referenceNumber = `CERT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const cert = await Certificate.create(req.body);
    res.status(201).json({ success: true, data: cert });
  } catch (error) { next(error); }
};

exports.getCertificates = async (req, res, next) => {
  try {
    const { studentId, type } = req.query;
    let query = {};
    if(studentId) query.student = studentId;
    if(type) query.certificateType = type;
    
    // Populate heavy fields like school info would normally be here if dynamic
    const certs = await Certificate.find(query).populate('student', 'firstName lastName rollNo aparId bloodGroup dob fatherName motherName mobileNumber').sort({ issueDate: -1 });
    res.status(200).json({ success: true, count: certs.length, data: certs });
  } catch (error) { next(error); }
};

exports.updateCertificate = async (req, res, next) => {
    try {
        const cert = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: cert });
    } catch (error) { next(error); }
};

exports.deleteCertificate = async (req, res, next) => {
    try {
        await Certificate.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Certificate deleted' });
    } catch (error) { next(error); }
};
