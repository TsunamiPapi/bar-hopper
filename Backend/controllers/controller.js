const Bar = require('../models/localBars');

function saveBarsToDatabase(bars, zipcode) {
  return Promise.all(
    bars.map(barData => {
      const bar = new Bar({
        name: barData.name,
        latitude: barData.geometry.location.lat, // gets the nested latitude and longitude
        longitude: barData.geometry.location.lng,
        zipcode: zipcode
        // Set other fields as needed
      });

      return bar.save();
    })
  );
}

module.exports = {
  saveBarsToDatabase
};
