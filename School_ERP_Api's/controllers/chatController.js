const ChatMessage = require('../models/Chat');
const fs = require('fs');
const path = require('path');

const deleteFileFromDisk = (relativePath) => {
  if (!relativePath) return;
  const absolutePath = path.join(__dirname, '..', relativePath);
  fs.unlink(absolutePath, (err) => {
    if (err && err.code !== 'ENOENT') console.error(`Failed to delete file: ${absolutePath}`, err);
  });
};

exports.sendMessage = async (req, res, next) => {
  try {
    const chatData = { ...req.body };
    if (req.file) {
      chatData.attachmentUrl = `uploads/documents/${req.file.filename}`;
    }
    const msg = await ChatMessage.create(chatData);

    // Emit live event via Socket.IO directly if initialized
    const io = req.app.get('io');
    if (io) {
        // We emit to the receiver's personal room
        io.to(msg.receiverId.toString()).emit('receive_message', msg);
    }

    res.status(201).json({ success: true, data: msg });
  } catch (error) { 
    if (req.file) deleteFileFromDisk(`uploads/documents/${req.file.filename}`);
    next(error); 
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const { user1, user2 } = req.query; // IDs of the two users in conversation
    if (!user1 || !user2) return res.status(400).json({ success: false, message: 'Need user1 and user2' });

    const msgs = await ChatMessage.find({
      $or: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 }
      ]
    })
    .populate('senderId receiverId', 'name firstName lastName role')
    .sort({ createdAt: 1 });
    res.status(200).json({ success: true, count: msgs.length, data: msgs });
  } catch (error) { next(error); }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const msg = await ChatMessage.findByIdAndUpdate(messageId, { isRead: true, readAt: Date.now() }, { new: true });
    res.status(200).json({ success: true, data: msg });
  } catch (error) { next(error); }
};

exports.deleteMessage = async (req, res, next) => {
  try {
    const msg = await ChatMessage.findById(req.params.messageId);
    if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
    if (msg.attachmentUrl) deleteFileFromDisk(msg.attachmentUrl);
    
    await msg.deleteOne();
    res.status(200).json({ success: true, message: 'Message deleted' });
  } catch(error) { next(error); }
};
