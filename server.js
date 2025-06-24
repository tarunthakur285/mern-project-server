require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(error));

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS config
const corsOptions = {
  origin: process.env.CLIENT_ENDPOINT, // Frontend port (usually 3000)
  credentials: true
};
console.log('CORS origin:', process.env.CLIENT_ENDPOINT);
app.use(cors(corsOptions));

// Routes
app.use('/auth', authRoutes);
  
// Start server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
