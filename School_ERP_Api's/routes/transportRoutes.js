const express = require('express');
const router = express.Router();
const { addVehicle, getVehicles, updateVehicle, deleteVehicle, addRoute, getRoutes, updateRoute, deleteRoute } = require('../controllers/transportController');

router.post('/vehicles', addVehicle);
router.get('/vehicles', getVehicles);
router.put('/vehicles/:id', updateVehicle);
router.delete('/vehicles/:id', deleteVehicle);

router.post('/routes', addRoute);
router.get('/routes', getRoutes);
router.put('/routes/:id', updateRoute);
router.delete('/routes/:id', deleteRoute);

module.exports = router;
