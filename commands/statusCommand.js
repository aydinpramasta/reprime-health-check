import config from "../lib/config.js";
import { healthCheck } from "../lib/helper.js";
import bot from "../lib/telegraf.js";

const statusCommandHandler = async (context) => {
  const endpoints = config.healthCheckUrls;
  const chatId = context.message.chat.id;

  const message = await healthCheck(endpoints);

  await bot.telegram.sendMessage(chatId, message);
};

export default statusCommandHandler;
