const { google } = require("googleapis");

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
