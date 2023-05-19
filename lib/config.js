import dotenv from "dotenv";

dotenv.config();

const config = {
  database: {
    dialect: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  healthCheckUrls: {
    "API Mobile": "https://api.app.reprime.id/api/v2/webs/list-article",
    "Web Reprime": "https://reprime.id",
    "BE Reprime": "https://app.reprime.id",
    IDcloudhost: "https://console.idcloudhost.com/hub/login",
  },
};

export default config;
