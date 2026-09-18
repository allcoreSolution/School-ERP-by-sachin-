const GlobalSetting = require('../models/GlobalSetting');

/* Get setting by key */
exports.getSetting = async (req, res) => {
  try {
    const setting = await GlobalSetting.findOne({ key: req.params.key });
    res.json({ success: true, data: setting ? setting.value : null });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Get all settings */
exports.getAllSettings = async (req, res) => {
  try {
    const settings = await GlobalSetting.find();
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Upsert a setting */
exports.saveSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const value = req.body;
    
    let setting = await GlobalSetting.findOne({ key });
    if (setting) {
      setting.value = value;
      setting = await setting.save();
    } else {
      setting = await GlobalSetting.create({ key, value });
    }
    
    res.json({ success: true, data: setting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Upload a file (e.g., logo, favicon) */
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ success: true, url: fileUrl });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Mock Test SMTP connection */
exports.testSmtp = async (req, res) => {
  try {
    const credentials = req.body;
    // Mock simulation of SMTP connection check
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (!credentials.host || !credentials.username || !credentials.password) {
       return res.status(400).json({ success: false, message: 'Missing SMTP credentials for testing.' });
    }
    
    res.json({ success: true, message: 'SMTP connection established successfully! Credentials are valid.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

