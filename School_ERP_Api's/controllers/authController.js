const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');

// Helper to generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public (or restricted in production to Admin)
const register = async (req, res) => {
  const { username, email, password, roleName } = req.body;

  try {
    // Check if user exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email or username' });
    }

    // Find the role
    const selectedRoleName = roleName || 'Teacher'; // Default role
    const role = await Role.findOne({ name: selectedRoleName });
    if (!role) {
      return res.status(400).json({ success: false, message: `Specified role '${selectedRoleName}' does not exist` });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      role: role._id,
    });

    if (user) {
      return res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: selectedRoleName,
          token: generateToken(user._id),
        },
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Auth user & get token (Login)
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const identifier = req.body.email || req.body.username || req.body.userId || req.body.empId || req.body.admissionNo;
  const { password } = req.body;

  try {
    // Check for user
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    }).populate('role').populate('tenant').select('+password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (!user.isActive) {
      return res.status(401).json({ success: false, message: 'User account is inactive. Please contact admin.' });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    return res.json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role.name,
        permissions: user.role.permissions,
        tenantId: user.tenant ? user.tenant._id : null,
        tenant: user.tenant ? user.tenant : null,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new role
// @route   POST /api/auth/roles
// @access  Private (Admin only)
const createRole = async (req, res) => {
  const { name, permissions, description } = req.body;

  try {
    const roleExists = await Role.findOne({ name });
    if (roleExists) {
      return res.status(400).json({ success: false, message: 'Role already exists' });
    }

    const role = await Role.create({
      name,
      permissions,
      description,
    });

    return res.status(201).json({
      success: true,
      data: role,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all roles
// @route   GET /api/auth/roles
// @access  Private (Admin/Staff only)
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find({});
    return res.json({
      success: true,
      count: roles.length,
      data: roles,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  register,
  login,
  createRole,
  getRoles,
};
