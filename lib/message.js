const axios = require("axios");

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

const sendMessageToTelegram = async (message) => {
  if (!token || !chatId) {
    throw new Error(
      "Telegram Bot Token and Chat ID is not defined in environment variable."
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

module.exports = { sendMessageToTelegram };
