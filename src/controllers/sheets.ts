const { google } = require("googleapis");
/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */

// spreadsheetId : "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
// range: "Class Data!A2:E"

export const getSpreadsheet = async (
  auth: any,
  spreadsheetId: string,
  range: string
) => {
  const sheets = google.sheets({ version: "v4", auth });
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const rows = response.data.values;
    if (!rows || rows.length === 0) return;
    return rows;
  } catch (err: any) {
    throw err;
  }
};

export const updateSpreadsheet = async (
  auth: any,
  spreadsheetId: string,
  range: string,
  resource: any
): Promise<number> => {
  const sheets = google.sheets({ version: "v4", auth });
  try {
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      majorDimension: "ROWS",
      resource,
    });
    return response.data.updatedCells;
  } catch (err: any) {
    throw err;
  }
};
