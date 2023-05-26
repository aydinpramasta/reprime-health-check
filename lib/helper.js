import axios from "axios";
import { DateTime, Settings } from "luxon";

Settings.defaultZone = "Asia/Jakarta";
Settings.defaultLocale = "id";

axios.defaults.timeout = 10_000; // 10 seconds

const generateHealthCheckMessage = async (endpoints) => {
  let message =
    "Reprime Health Check\n" + `${DateTime.now().toFormat("DDDD T")}\n\n`;

  for (const [title, endpoint] of Object.entries(endpoints)) {
    const start = DateTime.now();
    let finish, duration;

    try {
      await axios.get(endpoint);

      finish = DateTime.now();

      finish.diff(start).milliseconds > 2000 // response time is above 2 seconds
        ? (message += `${title}: SLOW 🟡`)
        : (message += `${title}: OK 🟢`);
    } catch (error) {
      finish = DateTime.now();

      message += `${title}: OFF 🔴`;
    } finally {
      duration = finish.diff(start).toFormat("s.SSS 's'"); // example: 0.333 s

      message += ` (${duration})\n`;
    }
  }

  return message;
};

export { generateHealthCheckMessage };
