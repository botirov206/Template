const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const { google } = require('googleapis');
const sheets = google.sheets('v4');
const auth = new google.auth.GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});
const secretKey = 'your-secret-key';

const getSheetData = async (range) => {
    try {
        const client = await auth.getClient();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        console.log('Fetching data from range:', range);

        const response = await sheets.spreadsheets.values.get({
            auth: client,
            spreadsheetId,
            range, // Ensure this matches the correct tab name
        });

        const rows = response.data.values || [];
        // Remove header row and empty rows
        return rows.filter((row) => row.length > 0 && row[0] !== 'ID');
    } catch (error) {
        console.error('Error fetching sheet data:', error.message);
        throw error;
    }
};

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Please fill all required fields.' });
  }

  const user = userService.register(username, email, password);
  return res.status(201).json({
    message: `User ${username} registered successfully`,
    user,
  });
};

exports.login = async (email, password) => {
  const users = await getSheetData('Users!A:D');
  console.log('Fetched users:', users);

  const foundUser = users.find(
    (user) => user[2].toLowerCase() === email.toLowerCase() && user[3] === password
  );
  console.log('Found user:', foundUser);

  if (!foundUser) {
    return null;
  }

  const token = jwt.sign(
    { id: foundUser[0], username: foundUser[1], email: foundUser[2] },
    secretKey,
    {
      expiresIn: '1h',
    }
  );
  return token;
};