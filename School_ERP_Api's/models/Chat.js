const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Can be user or group ID
  messageText: { type: String },
  attachmentUrl: { type: String },
  isRead: { type: Boolean, default: false },
  readAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
