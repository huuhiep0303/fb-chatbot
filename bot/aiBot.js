const axios = require("axios");

async function aiBot(text) {
  try {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile", // đổi model dễ dùng hơn
        messages: [
          {
            role: "system",
            content: "Bạn là nhân viên CSKH, trả lời ngắn gọn, thân thiện."
          },
          {
            role: "user",
            content: text
          }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return res.data.choices[0].message.content;

  } catch (err) {
    console.log("AI error:", err.response?.data || err.message);
    return "Xin lỗi, hiện tại mình không thể trả lời.";
  }
}

module.exports = aiBot;