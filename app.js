import cron from "node-cron";
import bot from "./lib/telegraf.js";
import healthCheckPerTwoMinutesCronHandler from "./crons/healthCheckPerTwoMinutes.js";
import healthCheckPerOneHourCronHandler from "./crons/healthCheckPerOneHour.js";
import startCommandHandler from "./commands/startCommand.js";
import statusCommandHandler from "./commands/statusCommand.js";
import subscribeCommandHandler from "./commands/subscribeCommand.js";
import unsubscribeCommandHandler from "./commands/unsubscribeCommand.js";

const cronOptions = { timezone: "Asia/Jakarta" };

cron.schedule("*/2 * * * *", healthCheckPerTwoMinutesCronHandler, cronOptions); // every 2 minutes
cron.schedule("0 6-18 * * *", healthCheckPerOneHourCronHandler, cronOptions); // every hour from 06.00 to 18.00

bot.start(startCommandHandler);
bot.command("status", statusCommandHandler);
bot.command("subscribe", subscribeCommandHandler);
bot.command("unsubscribe", unsubscribeCommandHandler);

await bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
