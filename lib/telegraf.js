import { Telegraf } from "telegraf";
import config from "./config.js";

const bot = new Telegraf(config.telegramBotToken, {
  handlerTimeout: 9_000_000, // timeout 9.000.000 ms
});

// channel can invoke commands
bot.on("channel_post", (context, next) => {
  context.update.message = context.update.channel_post;

  return next();
});

export default bot;
