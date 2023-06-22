const mongoose = require('mongoose');
const LocalBars = require('./models/localBars');
const barRouter = require('./routes/barRouter');

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to the database');

    // Delete all existing bars
    //so when the line below is active, the database will get cleared before the index.js function gets around to retreving the bars
    //await LocalBars.deleteMany();
    //console.log('All bars deleted successfully');
  
    // Call the barRouter to post new bars to the database
  
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    throw error; // Propagate the error to the calling function
  }
}

module.exports = {
  connectToDatabase,
};
