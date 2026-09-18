const express = require('express');
const router = express.Router();
const { addRoom, getRooms, updateRoom, deleteRoom, allocateBed, deallocateBed } = require('../controllers/hostelController');

router.post('/rooms', addRoom);
router.get('/rooms', getRooms);
router.put('/rooms/:id', updateRoom);
router.delete('/rooms/:id', deleteRoom);
router.post('/allocate', allocateBed);
router.post('/deallocate', deallocateBed);

module.exports = router;
