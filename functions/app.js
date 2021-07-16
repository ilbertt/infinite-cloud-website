const express = require("express");
const cors = require("cors");
const functions = require("firebase-functions");
const Telegraf = require("telegraf");

const bot = new Telegraf.Telegraf(functions.config().telegram.token);

const app = express();

// Automatically allow cross-origin requests
app.use(cors({origin: true}));

app.get("/getFilesystem", async (req, res) => {
  const userId = req.query.userId;
  const chat = await bot.telegram.getChat(userId);
  console.log(chat.pinned_message.document);
  res.send(chat.pinned_message.document);
});

exports.app = app;
