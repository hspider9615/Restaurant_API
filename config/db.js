const mongoose = require('mongoose');
const colors = require('colors');
// function mongodb database connection
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to the Database ${mongoose.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log('DB Error', error, colors.red.bold);
  }
};

module.exports = connectDb;
