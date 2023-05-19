import { Telegraf } from "telegraf";
import config from "./config.js";

const bot = new Telegraf(config.telegramBotToken, {
  handlerTimeout: 9_000_000, // timeout 9.000.000 ms
});

export default bot;
