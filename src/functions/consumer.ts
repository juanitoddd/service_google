import { authorize } from "src/controllers/auth";
import { RabbitMsg } from "../types/rabbit";
import { listCalendars } from "src/controllers/calendar";
import { listMajors } from "src/controllers/sheets";
import { rabbitPublish } from "./rabbit";

const consumer = async (_msg: RabbitMsg) => {
  console.log("[consumer] Google");
  console.log(_msg);
  const { action } = _msg
  const client = await authorize()
  switch (action) {
    case 'calendar':
      const calendars = await listCalendars(client)
      console.log(calendars);
      await rabbitPublish('telegram', calendars)
      break;
    case 'sheets':
      const majors = await listMajors(client)
      console.log(majors);
      // await rabbitPublish('telegram', majors)
      break;
    default:
      break;
  }
};

export default consumer;
