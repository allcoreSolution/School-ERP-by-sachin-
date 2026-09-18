const express = require('express');
const router = express.Router();
const {
  createStaff,
  getStaffs,
  getStaffById,
  updateStaff,
  deleteStaff
} = require('../controllers/staffController');
const { protect, checkPermission } = require('../middleware/authMiddleware');
const { uploadStaffPhoto } = require('../middleware/uploadMiddleware');

// All staff routes require authentication
router.use(protect);

// Staff CRUD operations
router.route('/')
  .post(checkPermission('create_staff'), uploadStaffPhoto, createStaff)
  .get(checkPermission('view_staff'), getStaffs);

router.route('/:id')
  .get(checkPermission('view_staff'), getStaffById)
  .put(checkPermission('update_staff'), uploadStaffPhoto, updateStaff)
  .patch(checkPermission('update_staff'), uploadStaffPhoto, updateStaff)
  .delete(checkPermission('delete_staff'), deleteStaff);

module.exports = router;
