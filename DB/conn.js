const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successfull To Database");
  })
  .catch((err) => {
    console.log("No Connection To Database");
  });
