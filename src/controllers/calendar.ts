const { google } = require("googleapis");

export const listCalendars = async (auth: any) => {
  const calendar = google.calendar({ version: "v3", auth });
  const res2 = await calendar.calendarList.list();
  const calendars = res2.data.items;
  if (!calendars || calendars.length === 0) {
    console.log("No calendars found.");
    return [];
  }
  return calendars.map((calendar: any) => calendar.summary);
  /*
  calendars.map((calendar: any) => {
    const name = calendar.summary;
    console.log(`${name}`);
  });
  */
};

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
export const listEvents = async (auth: any) => {
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
