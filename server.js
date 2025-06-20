const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser()); 
app.use('/auth', authRoutes); // 

const PORt = 5001;

app.listen(5001, (error) => {
    if (error) {
        console.log("Error in server setup", error);
    } else {
        console.log("Server is running on port", PORt);
    }
});
