const express = require("express");
const router = express.Router();

// User Model
const user = require("../../models/user");
const { User } = require("../../models/user");

// Auth
const { auth } = require("../../middleware/auth");

// Requests

// @route  GET api/users
// @desc   Authorized User
// @access Public
router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
  });
});

// @route  POST api/users
// @desc   Register New User
// @access Private
router.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });

    return res.status(200).json({ success: true, userData: doc });
  });
});

// @route  POST api/users
// @desc   Login User
// @access Private w/ authorization and token generation
router.post("/login", (req, res) => {
  // Find user email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Authorization failed: email not found.",
      });

    // Check password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "Wrong password.",
        });

      // Generate token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
        });
      });
    });
  });
});

// @route  GET api/users
// @desc   Logout
// @access Public
router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

module.exports = router;
