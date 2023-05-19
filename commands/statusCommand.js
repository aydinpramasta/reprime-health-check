import config from "../lib/config.js";
import bot from "../lib/telegraf.js";
import { generateHealthCheckMessage } from "../lib/helper.js";

const statusCommandHandler = async (context) => {
  const endpoints = config.healthCheckUrls;
  const chatId = context.message.chat.id;

  const message = await generateHealthCheckMessage(endpoints);

  await bot.telegram.sendMessage(chatId, message);
};

export default statusCommandHandler;
