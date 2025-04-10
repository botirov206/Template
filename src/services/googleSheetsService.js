// filepath: c:\Users\Dell\OneDrive\Desktop\Template-1\src\services\googleSheetsService.js
const { google } = require('googleapis');
const path = require('path');

const sheets = google.sheets('v4');

const auth = new google.auth.GoogleAuth({
    keyFile: path.resolve(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || './google-service-account.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const getSheetData = async (range) => {
    try {
        const client = await auth.getClient();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        const response = await sheets.spreadsheets.values.get({
            auth: client,
            spreadsheetId,
            range,
        });

        const rows = response.data.values || [];
        // Remove header row and empty rows
        return rows.filter((row) => row.length > 0 && row[0] !== 'ID');
    } catch (error) {
        console.error('Error fetching sheet data:', error.message);
        throw error;
    }
};

const appendToSheet = async (range, values) => {
    try {
        const client = await auth.getClient();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        await sheets.spreadsheets.values.append({
            auth: client,
            spreadsheetId,
            range: 'Sheet1!A:D', // Replace 'Sheet1' with your actual tab name
            valueInputOption: 'RAW',
            resource: {
                values: [values],
            },
        });
    } catch (error) {
        console.error('Error appending to sheet:', error.message);
        throw error;
    }
};

module.exports = {
    getSheetData,
    appendToSheet,
};