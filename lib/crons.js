import env from "./environment.js";
import { telegramHealthCheck } from "./helper.js";

const healthCheckCronHandler = async () => {
  const endpoint = env.healthCheckUrl;

  await telegramHealthCheck(endpoint);
};

export { healthCheckCronHandler };
