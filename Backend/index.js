const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const db = require("./db"); // Import the db.js module
const LocalBars = require("./models/localBars"); // Import the LocalBars model
require('dotenv').config();

app.use(express.json());
app.use(cors());

// Require the routers
const barRouter = require('./routes/barRouter');
// Use the routers
app.use('/api/bars', barRouter); // gets bars and posts to database

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

db.connectToDatabase()
  .then(async () => {
    const port = 8000;

    // Retrieve bars from the database
    const bars = await LocalBars.find();
    console.log('Bars retrieved:', bars);
    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
 
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });