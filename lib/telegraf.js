import { Telegraf } from "telegraf";
import config from "./config.js";

const bot = new Telegraf(config.telegramBotToken);

export default bot;
