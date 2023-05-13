const axios = require("axios");
const { sendTelegramMessage } = require("../lib/telegram");
const { response } = require("express");
const sendTelegramHealthCheck = async (req, res) => {
  const chatId = req.body.message.chat.id;
  const text = req.body.message.text;

  if (text.includes("/status")) {
    await axios
      .get("https://api.app.reprime.id/api/v2/webs/list-article")
      .then((response) => {
        const message =
          "✅ Health Check ✅\n \n" +
          `Status: ${response.status} ${response.statusText}\n \n` +
          `URL: ${response.config.url}`;

        sendTelegramMessage(message, chatId);
      })
      .catch((error) => {
        // Server returns an error response
        if (error.response) {
          const message =
            "❗️ Danger ❗️\n \n" +
            `Status: ${error.response.status} ${error.response.statusText}\n \n` +
            `URL: ${error.response.config.url}`;

          sendTelegramMessage(message, chatId);
        } else {
          // Server doesn't return any response
          const message =
            "❗️ Danger ❗️\n \n" +
            "Server tidak mengembalikan response, kemungkinan server sedang down.\n \n" +
            `URL: https://api.app.reprime.id/api/v2/webs/list-article`;

          sendTelegramMessage(message, chatId);
        }
      });
  }

  res.send();
};
module.exports = { sendTelegramHealthCheck };
