import axios from "axios";
import { DateTime, Settings } from "luxon";
import config from "./config.js";
import bot from "./telegraf.js";

Settings.defaultZone = "Asia/Jakarta";
Settings.defaultLocale = "id";

const telegramHealthCheck = async (
  endpoints,
  chatId = config.telegramGlobalChatId,
  sendAll = false
) => {
  let message =
    "Reprime Health Check\n" + `${DateTime.now().toFormat("DDDD T")}\n\n`;

  let allSuccess = true;
  for (const entry of Object.entries(endpoints)) {
    const [title, endpoint] = entry;

    const start = DateTime.now();
    try {
      await axios.get(endpoint);

      const finish = DateTime.now();
      const duration = finish.diff(start).toFormat("s.SSS 's'"); // 0.333 s

      message += `${title}: OK ✅ (${duration})\n`;
    } catch (error) {
      allSuccess = false;

      const finish = DateTime.now();
      const duration = finish.diff(start).toFormat("s.SSS 's'"); // 0.333 s

      message += `${title}: OFF ‼️ (${duration})\n`;
    }
  }

  // If 'sendAll' argument is true or if any of the endpoints request is failed
  if (sendAll || !allSuccess) {
    await bot.telegram.sendMessage(chatId, message);
  }
};

export { telegramHealthCheck };
