const express = require('express');
const router = express.Router();

// Middleware function for handling POST request to /api/bars
router.post('/bars', (req, res) => {
const { zipcode } = req.body;
  console.log('Received zipcode:', zipcode);

  // Handle the request and send the response
  // ...
  
  res.sendStatus(200); // Send a response indicating success (HTTP status code 200)
});

module.exports = router;
