import axios from "axios";
import { DateTime } from "luxon";
import config from "./config.js";
import bot from "./telegraf.js";

const telegramHealthCheck = async (
  endpoints,
  chatId = config.telegramGlobalChatId,
  sendAll = false
) => {
  const now = DateTime.now().setLocale("id").toFormat("DDDD T");
  let message = "Reprime Health Check\n" + `${now}\n`;

  let allSuccess = true;
  for (const entry of Object.entries(endpoints)) {
    const [title, endpoint] = entry;

    try {
      await axios.get(endpoint);

      message += `${title}: OK ✅\n`;
    } catch (error) {
      allSuccess = false;

      message += `${title}: OFF ‼️\n`;
    }
  }

  // If 'sendAll' argument is true or if any of the endpoints request is failed
  if (sendAll || !allSuccess) {
    await bot.telegram.sendMessage(chatId, message);
  }
};

export { telegramHealthCheck };
