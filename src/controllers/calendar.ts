import { google } from 'googleapis';
import dayjs from 'dayjs';

export const listCalendars = async (auth: any) => {
  const calendar = google.calendar({ version: "v3", auth });
  const res2 = await calendar.calendarList.list();
  const calendars = res2.data.items;
  if (!calendars || calendars.length === 0) {
    console.log("No calendars found.");
    return [];
  }
  return calendars.map((calendar: any) => calendar.summary);  
};

export const listTodayEvents = async (auth: any) => {
  const calendar = google.calendar({ version: "v3", auth });
  const res2 = await calendar.calendarList.list();
  const calendars = res2.data.items;
  if (!calendars || calendars.length === 0) {
    console.log("No calendars found.");
    return [];
  }
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate()+1);
  console.log(new Date())
  console.log(tomorrow)
  const events:any[] = []

  for(const _calendar of calendars) {
    const name = _calendar.summary;
    console.log(`${name}-${_calendar.id}----`);
    const _set: any = {
      calendar: name,
      events: []
    }  
    const res = await calendar.events.list({
      calendarId: _calendar.id,
      timeMin: new Date().toISOString(),
      timeMax: tomorrow.toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });  
    const events = res.data.items;
    if (!events || events.length === 0) {
      console.log("No upcoming events found.");      
    }
    for (const event of events) {
      const start = event.start.dateTime || event.start.date;
      const time = dayjs(start).format('HH:mm')
      _set.events.push(`${time} - ${event.summary}`)
      console.log(`${time} - ${event.summary}`);
    }
    events.push(_set)
  } 
  return events;
};

export const listMyEvents = async (auth: any) => {
  const calendar = google.calendar({ version: "v3", auth });
  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });
  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log("No upcoming events found.");
    return;
  }
  console.log("Upcoming 10 events:");
  events.map((event: any) => {
    const start = event.start.dateTime || event.start.date;
    console.log(`${start} - ${event.summary}`);
  });
};
