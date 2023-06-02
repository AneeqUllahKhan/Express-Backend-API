const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

dotenv.config({ path: "./config.env" });
require("./DB/conn");
// const User = require("./model/userSchema");

app.use(express.json());

// Link To Router File
app.use(require("./router/auth"));

const PORT = process.env.PORT || 5000;

const middleware = (req, res, next) => {
  console.log("The Middleware Is Testing");
  next();
};

app.get("/", (req, res) => {
  res.send("The Server Is For Testing Purpose");
});

app.get("/about", middleware, (req, res) => {
  res.send("The Server Is On About Page");
});

app.listen(PORT, () => {
  console.log(`The Server Is Running On The This PORT : ${PORT}`);
});
