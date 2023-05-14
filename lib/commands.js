import env from "./environment.js";
import { telegramHealthCheck } from "./helper.js";

const startCommandHandler = (context) => {
  context.reply("Welcome to Reprime Health Check Bot!");
};

const statusCommandHandler = async (context) => {
  const endpoint = env.healthCheckUrl;
  const chatId = context.message.chat.id;

  await telegramHealthCheck(endpoint, chatId, true);
};

export { startCommandHandler, statusCommandHandler };
