const functions = require("firebase-functions");

const request = require("request");
const express = require("express");
const cors = require("cors");
const Telegraf = require("telegraf");

const mapFiles = (files, formattedFileSys, path) => {
  if (files.length === 0) {
    const emptyFile = {
      key: path + "/",
    };
    formattedFileSys.push(emptyFile);
    return;
  }
  for (const file of files) {
    const newFile = {
      key: path + "/" + file.name,
      modified: file.createdAt,
      size: 1 * 1024 ** 2,
      messageId: file.messageId,
    };
    formattedFileSys.push(newFile);
  }
};

const formatFileSys = (fileSystem, formattedFileSys, path) => {
  for (const dir in fileSystem) {
    if (dir === ".") {
      mapFiles(fileSystem[dir], formattedFileSys, path);
    } else {
      formatFileSys(
          fileSystem[dir],
          formattedFileSys,
          path + "/" + dir,
      );
    }
  }
};

const bot = new Telegraf.Telegraf(functions.config().telegram.token);

const app = express();

// Automatically allow cross-origin requests
app.use(cors({origin: true}));

app.get("/getFilesystem", async (req, res) => {
  const userId = req.query.userId;
  const chat = await bot.telegram.getChat(userId);
  const fileId = chat.pinned_message.document.file_id;
  const downloadUrl = await bot.telegram.getFileLink(fileId);

  // console.log("DOWNLOAD URL", downloadUrl.href);

  request.get(downloadUrl.href, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const fileSystem = JSON.parse(body);
      const formattedFileSys = [];
      formatFileSys(fileSystem["/"], formattedFileSys, "");
      console.log(formattedFileSys);
      res.send({data: formattedFileSys});
    }
  });
});
app.post("/downloadFile", async (req, res) => {
  const userId = req.body.userId;
  const messageId = req.body.messageId;
  bot.telegram.sendMessage(userId,
      `Requested file at \`${new Date().toISOString()}\` from website.`,
      {
        reply_to_message_id: messageId,
        parse_mode: "Markdown",
      });
  res.sendStatus(200);
});

exports.api = functions.https.onRequest(app);
