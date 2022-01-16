const mongoose =require("mongoose");

const connectDB = async () => {
  // Connecting to the database
  const { MONGO_URI } = process.env;
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    })
    .then((data) => {
      console.log(`mongodb connection established with server: ${data.connection.host}`);
    })
};

module.exports = connectDB;
