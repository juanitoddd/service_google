import { authorize } from "src/controllers/auth";
import { RabbitMsg } from "../types/rabbit";
import { listCalendars, listTodayEvents } from "src/controllers/calendar";
import { listMajors } from "src/controllers/sheets";
import { rabbitPublish } from "./rabbit";

const consumer = async (_msg: RabbitMsg) => {
  console.log("[consumer] Google");
  console.log(_msg);
  const { action } = _msg
  const client = await authorize()
  let msg: any = {
    format: 'string',
    payload: {}
  }
  switch (action) {
    case 'calendar':
      const calendars = await listCalendars(client)
      console.log(calendars);
      msg.format = 'json'
      msg.payload = calendars
      await rabbitPublish('telegram', calendars)
      break;
    case 'events':
      const events = await listTodayEvents(client)
      console.log(events);
      msg.format = 'json'
      msg.payload = events
      await rabbitPublish('telegram', events)
      break;
    case 'sheets':
      const majors = await listMajors(client)
      console.log(majors);
      msg.format = 'json'
      msg.payload = majors
      // await rabbitPublish('telegram', majors)
      break;
    default:
      break;
  }
};

export default consumer;
