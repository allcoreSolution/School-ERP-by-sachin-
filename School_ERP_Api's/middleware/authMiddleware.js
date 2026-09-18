const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
const Student = require('../models/Student');

// Protect routes - verify token and authenticate user
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token and populate role and tenant details
      req.user = await User.findById(decoded.id).populate('role').populate('tenant');

      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User no longer exists' });
      }

      if (!req.user.isActive) {
        return res.status(401).json({ success: false, message: 'This user account is inactive' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

// Restrict access to users with specific permissions
const checkPermission = (...requiredPermissions) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: No role assigned to user',
      });
    }

    const { name: roleName, permissions } = req.user.role;

    // Admin has superuser status and gets bypass for all permissions
    if (roleName === 'Admin') {
      return next();
    }

    // Check if user has ALL of the required permissions
    const hasPermission = requiredPermissions.every((perm) =>
      permissions.includes(perm)
    );

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: You do not have the required permissions (${requiredPermissions.join(', ')})`,
      });
    }

    next();
  };
};

// Allows a student to access their own data, or Admin/Teacher with appropriate access
const checkStudentOrAdmin = async (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }

  const { name: roleName } = req.user.role;

  // Admin bypass
  if (roleName === 'Admin') {
    return next();
  }

  // Teacher bypass (if they have view_students permission)
  if (roleName === 'Teacher' && req.user.role.permissions.includes('view_students')) {
    return next();
  }

  // Get student ID from URL parameters (supports studentId or id)
  const studentId = req.params.studentId || req.params.id;
  if (!studentId) {
    return res.status(400).json({ success: false, message: 'Student ID is missing' });
  }

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // If Student role, compare their email with logged-in user email
    if (roleName === 'Student' && student.studentEmail === req.user.email) {
      return next();
    }

    return res.status(403).json({ success: false, message: 'Forbidden: You do not have access to this student\'s data' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  protect,
  checkPermission,
  checkStudentOrAdmin,
};
