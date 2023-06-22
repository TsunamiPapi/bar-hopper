const mongoose = require('mongoose');

const localBarsSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  latitude: { type: Number, required: false},
  longitude: { type: Number, required: false },
  zipcode: { type: Number, required: true }
});

localBarsSchema.index({ latitude: 1, longitude: 1 }, { unique: true }); // makes a compound index

const LocalBars = mongoose.model('Bars', localBarsSchema);

module.exports = LocalBars;
