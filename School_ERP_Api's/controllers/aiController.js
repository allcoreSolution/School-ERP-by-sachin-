exports.chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    // Stub implementation for OpenAI / Claude wrapper connection
    res.json({ success: true, reply: "Hello! I am your YUG AI Assistant. How can I help you regarding school data today?" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
