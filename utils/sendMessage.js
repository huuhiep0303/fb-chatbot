const axios = require("axios");

async function sendMessage(senderId, text) {
  console.log("BOT:", text); 
  
  try {
    await axios.post(
      "https://graph.facebook.com/v18.0/me/messages",
      {
        recipient: { id: senderId },
        message: { text }
      },
      {
        params: {
          access_token: process.env.PAGE_ACCESS_TOKEN
        }
      }
    );
  } catch (err) {
    console.log("Send message error:", err.response?.data || err.message);
  }
}

module.exports = sendMessage;