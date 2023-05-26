import cron from "node-cron";
import bot from "./lib/telegraf.js";
import healthCheckCronHandler from "./crons/healthCheckCron.js";
import startCommandHandler from "./commands/startCommand.js";
import statusCommandHandler from "./commands/statusCommand.js";
import subscribeCommandHandler from "./commands/subscribeCommand.js";
import unsubscribeCommandHandler from "./commands/unsubscribeCommand.js";

cron.schedule("*/2 * * * *", healthCheckCronHandler, {
  timezone: "Asia/Jakarta",
}); // every 2 minutes

bot.start(startCommandHandler);
bot.command("status", statusCommandHandler);
bot.command("subscribe", subscribeCommandHandler);
bot.command("unsubscribe", unsubscribeCommandHandler);

await bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
