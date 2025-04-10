const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const app = express();
const port = 3000;
const userRoute = require('./src/routes/userRoute');

app.use(cors());
app.use(express.json());
app.use('/api', userRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
