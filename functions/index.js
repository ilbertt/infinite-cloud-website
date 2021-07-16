const functions = require("firebase-functions");

const request = require("request");
const express = require("express");
const cors = require("cors");
const Telegraf = require("telegraf");

const bot = new Telegraf.Telegraf(functions.config().telegram.token);

const app = express();

// Automatically allow cross-origin requests
app.use(cors({origin: true}));

app.get("/getFilesystem", async (req, res) => {
  const userId = req.query.userId;
  const chat = await bot.telegram.getChat(userId);
  const fileId = chat.pinned_message.document.file_id;
  const downloadUrl = await bot.telegram.getFileLink(fileId);

  console.log("DOWNLOAD URL", downloadUrl.href);

  request.get(downloadUrl.href, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send(JSON.parse(body));
    }
  });
});

exports.api = functions.https.onRequest(app);
