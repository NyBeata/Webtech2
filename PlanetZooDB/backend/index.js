const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const userRoute = require('./routes/user');
const dlcRoute = require('./routes/dlc');
const animalRoute = require('./routes/animal');
const dashboardRoute = require('./routes/dashboard');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/user', userRoute);
app.use('/dlc', dlcRoute);
app.use('/animal', animalRoute);
app.use('/dashboard',dashboardRoute);

module.exports = app;