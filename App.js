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

app.listen(PORT, () => {
  console.log(`The Server Is Running On The This PORT : ${PORT}`);
});
