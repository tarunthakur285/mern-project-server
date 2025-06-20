const express = require('express'); // Include the express module
const cookieParser = require('cookie-parser'); // Include the cookie-parser module
const cors = require('cors'); // Include the cors module
const authRoutes = require('./src/routes/authRoutes'); // Include your auth routes

const app = express(); // Instantiate express app

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5001',
  credentials: true
};

app.use(cors(corsOptions));

// Use the auth routes
app.use('/auth', authRoutes);

// Set up the server to listen
const PORT = 5001;
