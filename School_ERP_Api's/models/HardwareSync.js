const mongoose = require('mongoose');

const deviceRegistrySchema = new mongoose.Schema({
  deviceName: { type: String, required: true },
  ipAddress: { type: String, required: true },
  deviceType: { type: String, enum: ['Biometric', 'CCTV'], required: true },
  location: { type: String, required: true }, // e.g., 'Main Gate', 'Library', 'Class 10A'
  streamUrl: { type: String }, // For CCTV RTSP/HTTP links
  port: { type: Number },
  status: { type: String, enum: ['Online', 'Offline', 'Maintenance'], default: 'Online' },
  lastSync: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('DeviceRegistry', deviceRegistrySchema);
