const express=require('express');//include the express module
const authRoutes = require('./src/routes/authRoutes');
const cookieParser = require('cookie-parser'); //include the cookie-parser module

const app=express(); //instantiate an express application

app.use(express.json()); //middleware to parse JSON request bodies or convert json to javascript object
app.use(cookieParser()); //middleware to parse cookies attached to the client request object
const PORt=5001;

app.listen(5001,(error)=>{
    if(error){
        console.log("Error in server setup",error);
    }
    else{
        console.log("Server is running on port",PORt);
    }
});