import config from "./config.js";
import { telegramHealthCheck } from "./helper.js";

const startCommandHandler = (context) => {
  context.reply("Welcome to Reprime Health Check Bot!");
};

const statusCommandHandler = async (context) => {
  const endpoints = config.healthCheckUrls;
  const chatId = context.message.chat.id;

  await telegramHealthCheck(endpoints, chatId, true);
};

export { startCommandHandler, statusCommandHandler };
