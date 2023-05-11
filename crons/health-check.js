const cron = require("node-cron");
const axios = require("axios");
const sendMessage = require("../lib/telegram");

const healthCheck = (endpoint, schedule) => {
  if (!cron.validate(schedule)) {
    throw new Error(`Cron schedule on ${endpoint} is not valid.`);
  }

  const job = cron.schedule(schedule, async () => {
    await axios.get(endpoint).catch((error) => {
      // Server returns an error response
      if (error.response) {
        const message =
          "❗️ Danger ❗️\n \n" +
          `Status: ${error.response.status} ${error.response.statusText}\n \n` +
          `URL: ${error.response.config.url}`;

        sendMessage(message);
      } else {
        // Server doesn't return any response
        const message =
          "❗️ Danger ❗️\n \n" +
          "Server tidak mengembalikan response, kemungkinan server sedang down.\n \n" +
          `URL: ${endpoint}`;

        sendMessage(message);
      }
    });
  });

  job.start();
};

module.exports = healthCheck;
