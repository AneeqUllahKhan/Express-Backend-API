const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

require("../DB/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("The Server Is For Router");
});

// Using ASync

router.post("/api/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body || {};

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({
      message: "Plz Filled All The Required Fields",
      status: false,
    });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({
        message: "Email Address Already Exist",
        status: false,
      });
    } else if (password != cpassword) {
      return res.status(422).json({
        message: "Password Doesn't Match",
        status: false,
      });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      const userRegister = await user.save();

      if (userRegister) {
        res.status(201).json({
          message: "User Successfully Registered",
          status: true,
        });
      } else {
        res.status(500).json({
          message: "Failed To Registered",
          status: false,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please Filled All The Fields",
        status: false,
      });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({
          message: "Inavlid Credentials",
          status: false,
        });
      } else {
        res.json({
          message: "User Signin Successfully",
          status: true,
        });
      }
    } else {
      res.status(400).json({
        message: "Error In Signing",
        status: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

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
