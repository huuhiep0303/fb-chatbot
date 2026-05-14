const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: String,
  role: String, // "user" | "assistant"
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("message", messageSchema);