const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

app.use(express.json());
app.use(cors());

// Define your routes here
app.use('/api', require('./routes/zip'));

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});


////////////////////////
// Endpoint to handle the request and make the API call to Google Places
app.post('/api/longlat', (req, res) => {
  const { zipcode } = req.body;
  console.log('Received zipcode:', zipcode);

  // Make the API call to Google Places to get latitude and longitude
  const apiKey = process.env.API_KEY;
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${apiKey}`;

  axios
    .get(geocodeUrl)
    .then(response => {
      // Extract the latitude and longitude from the API response
      const { lat, lng } = response.data.results[0].geometry.location;

      // Log the latitude and longitude
      console.log('Latitude:', lat);
      console.log('Longitude:', lng);

      // Make the API call to Google Places to get bars
      const placesApiKey = process.env.API_KEY;
      const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=bar&key=${placesApiKey}`;

      return axios.get(placesUrl);
    })
    .then(response => {
      // Extract the list of bars from the API response
      const bars = response.data.results;
      
      // Log the list of bars
      console.log('Bars:', bars);
      
      // Send the list of bars as a response to the frontend
      res.status(200).json(bars);
    })
    .catch(error => {
      console.error('Error making API call:', error);
      res.status(500).send('Internal Server Error'); // Send an error response
    });
});
///////////////////////
// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
