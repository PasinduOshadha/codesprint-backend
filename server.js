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

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

// app.use('/api/goals',require('./routes/goalRoutes'));
//app.use('/api/users',require('./routes/userRoutes'));


// app.use('/api',require('./routes/loginRoutes'));
// app.use('/api/drivers',require('./routes/driverRoutes'));
// app.use('/api/emergencycontacts',require('./routes/emergencyContactRoutes'));
// app.use('/api/ambulances',require('./routes/ambulanceRoutes'));
// app.use('/api/accident',require('./routes/accidentRoutes'));

// app.use(errorHandler);

app.listen(port,() => console.log(`Server Started on Port ${port}`));