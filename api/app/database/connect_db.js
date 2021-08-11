const { config } = require("../config/config");
const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(config.url, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => console.log("Connected to Db"))
    .catch(e => console.log(`Error: ${e}`));
};

module.exports = connectDB;
