import cron from "node-cron";
import bot from "./lib/telegraf.js";
import startCommandHandler from "./commands/startCommand.js";
import statusCommandHandler from "./commands/statusCommand.js";
import healthCheckPerTwoMinutesCronHandler from "./crons/healthCheckPerTwoMinutes.js";
import healthCheckPerOneHourCronHandler from "./crons/healthCheckPerOneHour.js";
import subscribeCommandHandler from "./commands/subscribeCommand.js";
import unsubscribeCommandHandler from "./commands/unsubscribeCommand.js";

cron.schedule("* * * * *", healthCheckPerTwoMinutesCronHandler); // every 2 minutes
cron.schedule("0 * * * *", healthCheckPerOneHourCronHandler); // every hour

bot.start(startCommandHandler);
bot.command("status", statusCommandHandler);
bot.command("subscribe", subscribeCommandHandler);
bot.command("unsubscribe", unsubscribeCommandHandler);

await bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
