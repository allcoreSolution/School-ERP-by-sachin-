exports.getCoachingModules = async (req, res) => {
  try {
    // Stub implementation for fetching programs
    res.json({ success: true, data: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.enrollInCoaching = async (req, res) => {
  try {
    res.json({ success: true, message: 'Successfully enrolled into coaching module.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
