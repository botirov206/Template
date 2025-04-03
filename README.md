# Simple Authentication System

A full-stack authentication project built with Express.js backend and vanilla frontend technologies.

## Features

- User registration with email and password
- Protected routes and authentication middleware

## Tech Stack

### Backend
- Express.js
- JSON Web Tokens (JWT)
- express-session for session management

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API for HTTP requests

## Getting Started

### Prerequisites
- Node.js (v14 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/botirov206/Template.git
   ```

2. Install dependencies:
   ```bash
   cd Template
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

## Project Structure
```
project/
├── public/
│   ├── css/
│   ├── js/
│   └── index.html
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
├── .env
└── server.js
```

## API Endpoints

- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
