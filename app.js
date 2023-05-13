require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cron = require("node-cron");
const {
  initTelegramWebhook,
  telegramWebhookHandler,
  telegramHealthCheck,
} = require("./lib/telegram");

const app = express();

// Run health check every 2 minutes
cron.schedule("*/2 * * * *", async () => {
  await telegramHealthCheck(
    "https://api.app.reprime.id/api/v2/webs/list-article"
  );
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const telegramWebhookUrl = `/webhook/${process.env.TELEGRAM_BOT_TOKEN}`;
initTelegramWebhook(telegramWebhookUrl);
app.post(telegramWebhookUrl, telegramWebhookHandler);

module.exports = app;
