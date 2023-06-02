const jwt = require("jsonwebtoken");
const express = require("express");
const UserController = require("../controller/user");
const router = express.Router();
const bcrypt = require("bcryptjs");

require("../DB/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("The Server Is For Router");
});

// Using ASync

router.post("/api/register", UserController.signupUser);

router.post("/api/login", UserController.loginUser);

router.get("/api/users", UserController.getUser);

module.exports = router;

// Using Promise

// router.post("/api/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body || {};

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({
//       message: "Plz Filled All The Required Fields",
//       status: false,
//     });
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({
//           message: "Email Address Already Exist",
//           status: false,
//         });
//       }

//       const user = new User({ name, email, phone, work, password, cpassword });
//       user
//         .save()
//         .then(() => {
//           res.status(201).json({
//             message: "User Successfully Registered",
//             status: true,
//           });
//         })
//         .catch((err) => {
//           res.status(500).json({
//             message: "Failed To Registered",
//             status: false,
//           });
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
