import config from "../lib/config.js";
import { healthCheck } from "../lib/helper.js";
import Subscriber from "../models/subscriber.js";
import bot from "../lib/telegraf.js";

const healthCheckPerTwoMinutesCronHandler = async () => {
  const endpoints = config.healthCheckUrls;

  const message = await healthCheck(endpoints);

  if (message.includes("OFF")) {
    const subscribers = await Subscriber.findAll();
    for (const subscriber of subscribers) {
      const chatId = subscriber.get("telegram_chat_id");

      await bot.telegram.sendMessage(chatId, message);
    }
  }
};

export default healthCheckPerTwoMinutesCronHandler;
