import axios from "axios";
import { DateTime, Settings } from "luxon";

Settings.defaultZone = "Asia/Jakarta";
Settings.defaultLocale = "id";

const generateHealthCheckMessage = async (endpoints) => {
  let message =
    "Reprime Health Check\n" + `${DateTime.now().toFormat("DDDD T")}\n\n`;

  for (const [title, endpoint] of Object.entries(endpoints)) {
    const start = DateTime.now();
    let finish, duration;

    try {
      await axios.get(endpoint);

      finish = DateTime.now();
      duration = finish.diff(start).toFormat("s.SSS 's'"); // 0.333 s

      if (finish.diff(start).milliseconds > 2000) {
        // response time is above 2 seconds
        message += `${title}: SLOW 🟡`;
      } else {
        message += `${title}: OK 🟢`;
      }
    } catch (error) {
      finish = DateTime.now();
      duration = finish.diff(start).toFormat("s.SSS 's'"); // 0.333 s

      message += `${title}: OFF 🔴`;
    } finally {
      message += ` (${duration})\n`;
    }
  }

  return message;
};

export { generateHealthCheckMessage };
