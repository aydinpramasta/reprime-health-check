import { Telegraf } from "telegraf";
import env from "./environment.js";

const bot = new Telegraf(env.telegramBotToken);

export default bot;
