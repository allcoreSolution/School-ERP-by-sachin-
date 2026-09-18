const DeviceRegistry = require('../models/HardwareSync');
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const Staff = require('../models/Staff');

exports.registerDevice = async (req, res, next) => {
  try {
    const device = await DeviceRegistry.create(req.body);
    res.status(201).json({ success: true, data: device });
  } catch (error) { next(error); }
};

exports.getDevices = async (req, res, next) => {
  try {
    const { type, status } = req.query;
    let query = {};
    if(type) query.deviceType = type;
    if(status) query.status = status;
    
    const devices = await DeviceRegistry.find(query).sort({ lastSync: -1 });
    res.status(200).json({ success: true, count: devices.length, data: devices });
  } catch (error) { next(error); }
};

exports.updateDevice = async (req, res, next) => {
  try {
     const device = await DeviceRegistry.findByIdAndUpdate(req.params.id, req.body, { new: true });
     res.status(200).json({ success: true, data: device });
  } catch (error) { next(error); }
};

exports.deleteDevice = async (req, res, next) => {
  try {
     await DeviceRegistry.findByIdAndDelete(req.params.id);
     res.status(200).json({ success: true, message: 'Device removed' });
  } catch (error) { next(error); }
};

// Endpoint for Biometric machine to push raw punch logs
exports.syncPunchLog = async (req, res, next) => {
    try {
        const { deviceId, punches } = req.body; 
        // punches: [{ uid: "12345", timestamp: "2023-01-01T08:00", type: "IN" }]
        
        let device = await DeviceRegistry.findOne({ ipAddress: deviceId });
        if (device) {
           device.lastSync = Date.now();
           await device.save();
        }

        let syncedCount = 0;
        let errors = [];

        // Simple sync strategy - Assuming "uid" matches aparId (for students) or employeeId (for staff)
        for (let punch of punches) {
           const punchDate = new Date(punch.timestamp).setHours(0,0,0,0);
           
           // Check if student
           let student = await Student.findOne({ aparId: punch.uid });
           if (student) {
               await Attendance.findOneAndUpdate(
                   { student: student._id, date: punchDate },
                   { 
                       status: 'Present',
                       academicClass: student.academicClass, // Assuming these fields exist
                       section: student.section,
                       remarks: `Punched via device ${deviceId || 'Biometric'}`
                   },
                   { upsert: true, new: true }
               );
               syncedCount++;
           } else {
               // Ignore staff for this simple module unless Staff attendance is created later
               errors.push(`UID ${punch.uid} not found in Students`);
           }
        }

        res.status(200).json({ success: true, message: `Synced ${syncedCount} logs`, errors });
    } catch(error) { next(error); }
};
