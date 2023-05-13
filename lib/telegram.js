const axios = require("axios");
const initTelegramWebhook = async () => {
  const apiUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
  const webhookUrl = `${process.env.APP_URL}/webhook/${process.env.TELEGRAM_BOT_TOKEN}`;
  const setWebhookUrl = `${apiUrl}/setWebhook?url=${webhookUrl}`;

  await axios.get(setWebhookUrl).catch((error) => {
    throw new Error(`Failed init Telegram webhook with URL: ${setWebhookUrl}.`);
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

module.exports = { initTelegramWebhook, sendTelegramMessage };
