const axios = require("axios");
const { getRecentMessages } = require("./messageService");

async function aiBot(senderId, text) {
  try {
    const history = await getRecentMessages(senderId);

    const messages = history.reverse().map(msg => ({
      role: msg.role === "assistant" ? "assistant" : "user",
      content: msg.content
    }));

    messages.push({
      role: "user",
      content: text
    });

    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "Bạn là chatbot CSKH, nhớ ngữ cảnh hội thoại và trả lời tự nhiên."
          },
          ...messages
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return res.data.choices[0].message.content;

  } catch (err) {
    console.log("AI error FULL:", err.response?.data || err.message);
    return "Xin lỗi, hiện tại mình không thể trả lời.";
  }
}

module.exports = aiBot;