const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");

const UserController = {
  signupUser: async (req, res) => {
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
        const user = new User({
          name,
          email,
          phone,
          work,
          password,
          cpassword,
        });

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
  },

  loginUser: async (req, res) => {
    try {
      let token;
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

        token = await userLogin.generateAuthToken();
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });

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
  },

  getUser: async (req, res) => {
    try {
      const data = await User.find({}).exec();

      res.json({
        message: "Data Get Successfully",
        status: true,
        data: data,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: `Internal Server Error: ${err}`,
        status: false,
      });
    }
  },
};

module.exports = UserController;
