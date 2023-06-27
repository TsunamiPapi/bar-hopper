const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Enable CORS
app.use(cors());

// Proxy the geocode request
app.get('/api/geocode', async (req, res) => {
  const { address, apiKey } = req.query;
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;

  try {
    const response = await axios.get(geocodeUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error making geocode API call:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Proxy the nearby places request
app.get('/api/places', async (req, res) => {
  const { lat, lng, apiKey } = req.query;
  const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=bar&key=${apiKey}`;

  try {
    const response = await axios.get(placesUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error making places API call:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
const port = 3000; // Choose a suitable port number
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
