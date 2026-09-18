const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  hostelName: { type: String, required: true },
  roomNumber: { type: String, required: true },
  bedCapacity: { type: Number, required: true },
  costPerBed: { type: Number, required: true },
  allocatedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
}, { timestamps: true });

module.exports = mongoose.model('HostelRoom', roomSchema);
