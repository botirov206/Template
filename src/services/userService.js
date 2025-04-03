const jwt = require('jsonwebtoken');

const users = [
    {
        id: 1,
        username: 'botirov206',
        password: 'hello world',
        email: 'botirovali206@gmail.com'
    },
];

exports.register = (username, email, password) => {
    let newUser = {
        id: users.length + 1,
        username,
        email,
        password,
    };
    users.push(newUser);
    return {...newUser};
}

const secretKey = 'qwerty';

exports.login = (email, password) => {
    const foundUser = users.find(
        (user) => user.email === email && user.password === password

    );
    if (!foundUser) {
        return null;
    }
    const token = jwt.sign(foundUser, secretKey, {
        expiresIn: '1h',
    });
    return token;
}