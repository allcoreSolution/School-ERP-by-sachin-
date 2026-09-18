const express = require('express');
const router = express.Router();
const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');
const { protect, checkPermission, checkStudentOrAdmin } = require('../middleware/authMiddleware');
const { uploadStudentAdmissionFiles } = require('../middleware/uploadMiddleware');

// All student routes require authentication
router.use(protect);

/**
 * @app_access Admin App (create_students)
 * @app_access Student App (None)
 * @app_access Teacher App (view_students)
 */
router.route('/')
  .post(checkPermission('create_students'), uploadStudentAdmissionFiles, createStudent)
  .get(checkPermission('view_students'), getStudents);

/**
 * @app_access Admin App (update_students / delete_students)
 * @app_access Student App (View own profile details)
 * @app_access Teacher App (view_students details)
 */
router.route('/:id')
  .get(checkStudentOrAdmin, getStudentById)
  .put(checkPermission('update_students'), uploadStudentAdmissionFiles, updateStudent)
  .patch(checkPermission('update_students'), uploadStudentAdmissionFiles, updateStudent)
  .delete(checkPermission('delete_students'), deleteStudent);

module.exports = router;
