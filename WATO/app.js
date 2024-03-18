const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv');
const userRoutes = require('./routes/userRoutes');
const userUrlRoutes = require('./routes/userUrlRoutes');
const makeConnection = require('./connection');

//defining the port.
const PORT = process.env.PORT || 1234;

//Starting the app at the port, url : /localhost:1234/
app.listen(PORT, console.log("Server has strated at PORT :" + PORT));

//Connecting the app to Mongodb database.
makeConnection();

// Defining body parsing for transervering json form data,
app.use(bodyParser.json());

//Sending the user register/login request to userRoutes.s
app.use('/api/auth', userRoutes);

//Sending the user register/login request to userRoutes.
app.use('/api/url', userUrlRoutes);

module.exports = app;