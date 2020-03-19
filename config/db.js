const mongoose = require('mongoose');

const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   
    });
    console.log('mongodb is connnected...')
  } catch (err) {
    console.err(err.message);
    process.exit(1); //exit with failure
  }
}

module.exports = connectDB;