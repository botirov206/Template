const { getSheetData, appendToSheet } = require('./googleSheetsService');
const jwt = require('jsonwebtoken');

const secretKey = 'qwerty';

exports.register = async (username, email, password) => {
    const users = await getSheetData('Users!A:D'); // Adjust range based on your sheet structure
    const newUser = [users.length + 1, username, email, password];
    await appendToSheet('Users!A:D', newUser);
    return { id: newUser[0], username, email };
};

exports.login = async (email, password) => {
    const users = await getSheetData('Users!A:D');
    const foundUser = users.find((user) => user[2] === email && user[3] === password);

    if (!foundUser) {
        return null;
    }

    const token = jwt.sign({ id: foundUser[0], username: foundUser[1], email: foundUser[2] }, secretKey, {
        expiresIn: '1h',
    });
    return token;
};