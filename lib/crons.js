import config from "./config.js";
import { telegramHealthCheck } from "./helper.js";

const healthCheckCronHandler = async () => {
  const endpoints = config.healthCheckUrls;

  await telegramHealthCheck(endpoints);
};

export { healthCheckCronHandler };
