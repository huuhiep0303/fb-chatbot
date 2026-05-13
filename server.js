require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const ruleBot = require("./bot/ruleBot");
const aiBot = require("./bot/aiBot");

const User = require("./models/User");
const Message = require("./models/Message");

const sendMessage = require("./utils/sendMessage");

const app = express();
app.use(express.json());

// ================== DB CONNECT ==================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// ================== VERIFY WEBHOOK ==================
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    console.log("Webhook verified!");
    return res.status(200).send(challenge);
  }

  res.sendStatus(403);
});

// ================== MAIN WEBHOOK ==================
app.post("/webhook", async (req, res) => {
  const body = req.body;

  if (body.object === "page") {
    for (const entry of body.entry) {
      const event = entry.messaging[0];

      const senderId = event.sender.id;
      const text = event.message?.text;

      if (!text) continue;

      console.log("USER:", text);

      // 1. save user
      await saveUser(senderId);

      // 2. save user message
      await saveMessage(senderId, text, "user");

      // 3. rule bot
      let reply = ruleBot(text);

      // 4. AI fallback
      if (!reply) {
        reply = await aiBot(text);
      }

      // 5. save bot message
      await saveMessage(senderId, reply, "bot");

      // 6. send message
      await sendMessage(senderId, reply);
    }

    return res.sendStatus(200);
  }

  res.sendStatus(404);
});

// ================== HELPERS ==================
async function saveUser(psid) {
  const user = await User.findOne({ psid });

  if (!user) {
    await User.create({ psid });
  }
}

async function saveMessage(psid, text, sender) {
  await Message.create({
    psid,
    text,
    sender
  });
}

// ================== START SERVER ==================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});