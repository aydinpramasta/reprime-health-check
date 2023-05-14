import dotenv from "dotenv";

dotenv.config();

const env = {
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  telegramGlobalChatId: process.env.TELEGRAM_GLOBAL_CHAT_ID,
  healthCheckUrl: process.env.HEALTH_CHECK_URL,
};

export default env;
