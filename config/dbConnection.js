const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
