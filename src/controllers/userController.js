const { register } = require('module');
const userService = require('../services/userService');

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
        .status(400)
        .json({ message: 'Please fill the all required fields.' });
  }

  const user = userService.register(username, email, password);
  return res.status(201).json({
    message: `User ${username} registered successfully`,
    user,
  });
}

exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: 'Please fill the all required fields.' });
    }

    let token = userService.login(email, password);
    if (!token){
        return res
            .status(401)
            .json({ message: 'Invalid email or pasword' });
    }

    return res 
        .status(200)
        .json({ message: 'Login successful with token', token });
        
}