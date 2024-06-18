import { google } from "googleapis";
import dayjs from "dayjs";

// Core calendar Functions

export const listCalendars = async (auth: any) => {
  const calendar = google.calendar({ version: "v3", auth });
  const response = await calendar.calendarList.list();
  const calendars = response.data.items;
  if (!calendars || calendars.length === 0) return [];
  return calendars;
};

export const getCalendar = async (auth: any, calendarId: string) => {
  const calendar = google.calendar({ version: "v3", auth });
  const response = await calendar.calendars.get({ calendarId });
  return response.data;
};

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
export const getEvents = async (
  auth: any,
  calendarId: string,
  limit: number = 10
) => {
  const calendar = google.calendar({ version: "v3", auth });
  const response = await calendar.events.list({
    calendarId,
    timeMin: new Date().toISOString(),
    maxResults: limit,
    singleEvents: true,
    orderBy: "startTime",
  });
  const events = response.data.items;
  if (!events || events.length === 0) return [];
  return events;
};

export const listTodayEvents = async (auth: any) => {
  const calendar = google.calendar({ version: "v3", auth });
  const res2 = await calendar.calendarList.list();
  const calendars = res2.data.items;
  if (!calendars || calendars.length === 0) {
    console.log("No calendars found.");
    // return [];
  }
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const allEvents: any[] = [];
  for (const _calendar of calendars) {
    const name = _calendar.summary;
    console.log(`${name}-----`);
    const res = await calendar.events.list({
      calendarId: _calendar.id,
      timeMin: new Date().toISOString(),
      timeMax: tomorrow.toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });
    const events = res.data.items;
    // if (!events || events.length === 0) console.log("No upcoming events found.");
    for (const event of events) {
      const start = event.start.dateTime || event.start.date;
      const time = dayjs(start).format("HH:mm");
      // _set.events.push(`${time} - ${event.summary}`)
      console.log(`${time} - ${event.summary}`);
      allEvents.push(`${time} - ${event.summary}`);
    }
  }
  console.log("events");
  console.log(allEvents);
  return allEvents;
};
