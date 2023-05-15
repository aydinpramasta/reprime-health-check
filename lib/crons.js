import config from "./config.js";
import { telegramHealthCheck } from "./helper.js";

const healthCheckPerTwoMinutesCronHandler = async () => {
  const endpoints = config.healthCheckUrls;

  await telegramHealthCheck(endpoints);
};

const healthCheckPerOneHourCronHandler = async () => {
  const endpoints = config.healthCheckUrls;

  await telegramHealthCheck(endpoints, config.telegramGlobalChatId, true);
};

export {
  healthCheckPerTwoMinutesCronHandler,
  healthCheckPerOneHourCronHandler,
};
