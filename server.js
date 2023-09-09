const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 5000;
// const {errorHandler} = require('./middleware/errorMiddleware');
// const connectDB = require('./config/db');

// connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

// Create a sub-router for API version 1
const apiV1Router = express.Router();

// Mount the sub-router with the /api/v1 prefix
app.use('/api/v1', apiV1Router);

// Define your routes for API version 1 here
// apiV1Router.use('/goals', require('./routes/goalRoutes'));
// apiV1Router.use('/users', require('./routes/userRoutes'));

// testing route
app.get('/test', (req, res) => {
    res.send('API is working')
  })

  apiV1Router.get('/', (req, res) => {
    res.send('API Version 1');
  });

  // Redirect root path to /api/v1
app.get('/', (req, res) => {
    res.redirect('/api/v1');
  });

// app.use('/api/goals',require('./routes/goalRoutes'));
//app.use('/api/users',require('./routes/userRoutes'));


// app.use('/api',require('./routes/loginRoutes'));
// app.use('/api/drivers',require('./routes/driverRoutes'));
// app.use('/api/emergencycontacts',require('./routes/emergencyContactRoutes'));
// app.use('/api/ambulances',require('./routes/ambulanceRoutes'));
// app.use('/api/accident',require('./routes/accidentRoutes'));

// app.use(errorHandler);

app.listen(port,() => console.log(`Server Started on Port ${port}`));