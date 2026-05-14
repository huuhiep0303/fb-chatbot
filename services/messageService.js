const Message = require("../models/message");

async function saveMessage(senderId, role, content) {
  try {
    await Message.create({
      senderId,
      role,
      content
    });
  } catch (err) {
    console.log("Save message error:", err.message);
  }
}

async function getRecentMessages(senderId) {
  try {
    return await Message.find({ senderId })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();
  } catch (err) {
    console.log("Get messages error:", err.message);
    return [];
  }
}

module.exports = { saveMessage, getRecentMessages };