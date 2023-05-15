import dotenv from "dotenv";

dotenv.config();

const config = {
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  telegramGlobalChatId: process.env.TELEGRAM_GLOBAL_CHAT_ID,
  healthCheckUrls: {
    "API Mobile": "https://api.app.reprime.id/api/v2/webs/list-article",
    "Website Reprime": "https://reprime.id",
  },
};

export default config;