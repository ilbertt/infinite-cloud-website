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

app.get("/v1/getFilesystem", async (req, res) => {
  console.log("handling GETFILESYSTEM request");
  try {
    const userId = req.query.userId;
    const chat = await bot.telegram.getChat(userId);
    const fileId = chat.pinned_message.document.file_id;
    const downloadUrl = await bot.telegram.getFileLink(fileId);

    // console.log("DOWNLOAD URL", downloadUrl.href);

    request.get(downloadUrl.href, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        throw new Error(error);
      }
      const fileSystem = JSON.parse(body);
      const formattedFileSys = [];
      formatFileSys(fileSystem["/"], formattedFileSys, "");
      res.send({data: formattedFileSys});
    });
  } catch (err) {
    console.log("ERROR", err);
    res.status(500).send(err.message);
  }
  return;
});
app.post("/v1/downloadFile", async (req, res) => {
  console.log("handling DOWNLOADFILE request");
  try {
    const userId = req.body.userId;
    const messageId = req.body.messageId;
    await bot.telegram.sendMessage(userId,
        `Requested file.\nTime: \`${new Date().toISOString()}\`
        \nFrom: website.`,
        {
          reply_to_message_id: messageId,
          parse_mode: "Markdown",
        });
    res.sendStatus(200);
  } catch (err) {
    console.log("ERROR", err);
    res.status(500).send(err.message);
  }
  return;
});

exports.api = functions.https.onRequest(app);
