const axios = require("axios");

const initTelegramWebhook = async (
  url = `/webhook/${process.env.TELEGRAM_BOT_TOKEN}`
) => {
  const apiUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
  const webhookUrl = `${process.env.APP_URL}${url}`;

  const telegramSetWebhookUrl = `${apiUrl}/setWebhook?url=${webhookUrl}`;

  await axios.get(telegramSetWebhookUrl).catch((error) => {
    throw new Error(
      `Failed to initialize Telegram webhook with URL: ${telegramSetWebhookUrl}.`
    );
  });
};

const sendTelegramMessage = async (
  message,
  chatId = process.env.TELEGRAM_CHAT_ID
) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token || !chatId) {
    throw new Error(
      "Telegram Bot Token or Chat ID is not defined in environment variable."
    );
  }

  await axios
    .post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: message,
    })
    .catch((error) => {
      console.log(error);
    });
};

const telegramHealthCheck = async (
  endpoint,
  chatId = process.env.TELEGRAM_CHAT_ID,
  withSuccess = false
) => {
  await axios
    .get(endpoint)
    .then((response) => {
      if (withSuccess) {
        // Send message even if the health check status is success (for the /status command)
        const message =
          "✅ Health Check ✅\n \n" +
          `Status: ${response.status} ${response.statusText}\n \n` +
          `URL: ${response.config.url}`;

        sendTelegramMessage(message, chatId);
      }
    })
    .catch((error) => {
      if (error.response) {
        // Server returns an error response
        const message =
          "❗️ Danger ❗️\n \n" +
          `Status: ${error.response.status} ${error.response.statusText}\n \n` +
          `URL: ${error.response.config.url}`;

        sendTelegramMessage(message);
      } else {
        // Server doesn't return any response
        const message =
          "❗️ Danger ❗️\n \n" +
          "Server tidak mengembalikan response, kemungkinan server sedang down.\n \n" +
          `URL: ${endpoint}`;

        sendTelegramMessage(message);
      }
    });
};

const telegramWebhookHandler = async (req, res) => {
  const chatId = req.body.message.chat.id;
  const text = req.body.message.text;

  // If there is a '/status' command in message
  if (text.includes("/status")) {
    await telegramHealthCheck(
      "https://api.app.reprime.id/api/v2/webs/list-article",
      chatId,
      true
    );
  }

  res.send();
};

module.exports = {
  initTelegramWebhook,
  sendTelegramMessage,
  telegramHealthCheck,
  telegramWebhookHandler,
};
