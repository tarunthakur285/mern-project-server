const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS config
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend port (usually 3000)
  credentials: true
};
app.use(cors(corsOptions));

// Routes
app.use('/auth', authRoutes);
  
// Start server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
