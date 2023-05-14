import cron from "node-cron";
import bot from "./lib/telegraf.js";
import { startCommandHandler, statusCommandHandler } from "./lib/commands.js";
import { healthCheckCronHandler } from "./lib/crons.js";

cron.schedule("*/2 * * * *", healthCheckCronHandler);

bot.start(startCommandHandler);
bot.command("status", statusCommandHandler);

await bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
