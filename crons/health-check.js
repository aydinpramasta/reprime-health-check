const cron = require("node-cron");
const axios = require("axios");

const healthCheck = (endpoint, schedule) => {
  if (!cron.validate(schedule)) {
    throw new Error(`Cron schedule on ${endpoint} is not valid.`);
  }

  const job = cron.schedule(schedule, async () => {
    await axios.get(endpoint).catch((error) => {
      // Server returns a response
      if (error.response) {
      } else {
        // Server doesn't return any response
      }
    });
  });

  job.start();
};

module.exports = healthCheck;
