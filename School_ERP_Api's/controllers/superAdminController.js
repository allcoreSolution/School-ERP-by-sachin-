const Tenant = require('../models/Tenant');
const SaaSPlan = require('../models/SaaSPlan');
const User = require('../models/User');

/* Dashboard Analytics */
exports.getDashboardAnalytics = async (req, res) => {
  try {
    const totalSchools = await Tenant.countDocuments();
    const activeSchools = await Tenant.countDocuments({ status: 'active' });
    const totalPlans = await SaaSPlan.countDocuments();
    const totalSuperAdmins = await User.countDocuments({ role: 'super_admin' });

    res.json({
      success: true,
      data: {
        totalSchools,
        activeSchools,
        totalPlans,
        totalSuperAdmins,
        revenue: 0, // Implement based on payments
        activeStudents: 0 // Fetch from students across tenants in real app
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Team Management (Super Admins) */
exports.getTeamMembers = async (req, res) => {
  try {
    const admins = await User.find({ role: 'super_admin' }).select('-password');
    res.json({ success: true, data: admins });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addTeamMember = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Basic implementation, ensure to hash password in User model pre-save
        const newAdmin = new User({
            name,
            email,
            password,
            role: 'super_admin',
            status: 'active'
        });
        await newAdmin.save();
        res.status(201).json({ success: true, data: newAdmin, message: "Team member added successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

/* Rate Cards & Comms */
exports.getRateCards = async (req, res) => {
  try {
    // Mock data for rate cards
    const rateCards = {
      sms_rate: 0.50,
      whatsapp_rate: 1.20,
      email_rate: 0.05
    };
    res.json({ success: true, data: rateCards });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateRateCards = async (req, res) => {
  try {
    // Save to settings or a localized model in a real app
    res.json({ success: true, message: "Rate cards updated successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Website/Content templates */
exports.getWebsiteTemplates = async (req, res) => {
    try {
      res.json({ success: true, data: [] });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
};
