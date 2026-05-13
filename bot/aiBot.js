const axios = require("axios");

async function aiBot(text) {
  try {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-70b-versatile",
        messages: [
          {
            role: "system",
            content: "Bạn là nhân viên chăm sóc khách hàng thân thiện, trả lời ngắn gọn."
          },
          {
            role: "user",
            content: text
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`
        }
      }
    );

    return res.data.choices[0].message.content;

  } catch (err) {
    console.log("AI error:", err.message);
    return "Xin lỗi, hiện tại mình không thể trả lời.";
  }
}

module.exports = aiBot;