const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true, unique: true },
  vehicleModel: { type: String, required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }, 
  capacity: { type: Number, required: true },
  status: { type: String, enum: ['Active', 'Maintenance'], default: 'Active' }
}, { timestamps: true });

const routeSchema = new mongoose.Schema({
  routeName: { type: String, required: true },
  startPoint: { type: String, required: true },
  endPoint: { type: String, required: true },
  assignedVehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
  fare: { type: Number, default: 0 }
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
const Route = mongoose.model('Route', routeSchema);

module.exports = { Vehicle, Route };
