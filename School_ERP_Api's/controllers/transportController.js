const { Vehicle, Route } = require('../models/Transport');

// ===================== Vehicle APIs =====================
exports.addVehicle = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.create(req.body);
        res.status(201).json({ success: true, data: vehicle });
    } catch (e) { next(e); }
};

exports.getVehicles = async (req, res, next) => {
    try {
        const vehicles = await Vehicle.find().populate('driverId', 'firstName lastName contactNumber');
        res.status(200).json({ success: true, count: vehicles.length, data: vehicles });
    } catch (e) { next(e); }
};

exports.updateVehicle = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: vehicle });
    } catch (e) { next(e); }
};

exports.deleteVehicle = async (req, res, next) => {
    try {
        await Vehicle.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Vehicle deleted' });
    } catch (e) { next(e); }
};


// ===================== Route APIs =====================
exports.addRoute = async (req, res, next) => {
    try {
        const route = await Route.create(req.body);
        res.status(201).json({ success: true, data: route });
    } catch (e) { next(e); }
};

exports.getRoutes = async (req, res, next) => {
    try {
        const routes = await Route.find().populate({
            path: 'assignedVehicle',
            populate: { path: 'driverId', select: 'firstName lastName contactNumber' }
        });
        res.status(200).json({ success: true, count: routes.length, data: routes });
    } catch (e) { next(e); }
};

exports.updateRoute = async (req, res, next) => {
    try {
        const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: route });
    } catch (e) { next(e); }
};

exports.deleteRoute = async (req, res, next) => {
    try {
        await Route.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Route deleted' });
    } catch (e) { next(e); }
};
