require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const healthCheck = require("./crons/healthCheck");
const { initTelegramWebhook } = require("./lib/telegram");
const { sendTelegramHealthCheck } = require("./handlers/telegramWebhook");

initTelegramWebhook();

healthCheck(
  "https://api.app.reprime.id/api/v2/webs/list-article",
  "*/2 * * * *" // every 2 minutes
);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.post(`/webhook/${process.env.TELEGRAM_BOT_TOKEN}`, sendTelegramHealthCheck);

module.exports = app;
