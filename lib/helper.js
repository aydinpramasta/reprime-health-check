import axios from "axios";
import env from "./environment.js";
import bot from "./telegraf.js";

const telegramHealthCheck = async (
  endpoint,
  chatId = env.telegramGlobalChatId,
  withSuccess = false
) => {
  try {
    const response = await axios.get(endpoint);

    if (withSuccess) {
      // Send message even if the health check status is success (for the '/status' command)
      const message =
        "✅ Health Check ✅\n\n" +
        `Status: ${response.status} ${response.statusText}\n\n` +
        `URL: ${response.config.url}`;

      await bot.telegram.sendMessage(chatId, message);
    }
  } catch (error) {
    if (error.response) {
      // Server returns an error response
      const message =
        "❗️ Danger ❗️\n\n" +
        `Status: ${error.response.status} ${error.response.statusText}\n\n` +
        `URL: ${error.response.config.url}`;

      await bot.telegram.sendMessage(chatId, message);
    } else {
      // Server doesn't return any response
      const message =
        "❗️ Danger ❗️\n\n" +
        "Server tidak mengembalikan response, kemungkinan server sedang down.\n \n" +
        `URL: ${endpoint}`;

      await bot.telegram.sendMessage(chatId, message);
    }
  }
};

export { telegramHealthCheck };
