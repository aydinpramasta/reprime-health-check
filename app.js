import cron from "node-cron";
import bot from "./lib/telegraf.js";
import { startCommandHandler, statusCommandHandler } from "./lib/commands.js";
import {
  healthCheckPerOneHourCronHandler,
  healthCheckPerTwoMinutesCronHandler,
} from "./lib/crons.js";

cron.schedule("*/2 * * * *", healthCheckPerTwoMinutesCronHandler); // every 2 minutes
cron.schedule("0 * * * *", healthCheckPerOneHourCronHandler); // every hour

bot.start(startCommandHandler);
bot.command("status", statusCommandHandler);

await bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
