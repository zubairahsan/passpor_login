const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("../Routers/passport_auth");
const User = require("../models/User");
const ensureAuthentication = require("./authenticate").ensureAuthentication;
// const validateData = require('../validation/validateReg')

/** @ Register User  */
router.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw res.status(400).send("user with this email already exist.");

  try {
    const newUser = new User({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    newUser.password = hashedPassword;

    const saveUser = await newUser.save();
    if (!saveUser) throw res.status(400).send("error occur while saving user");
    res.send(saveUser);
  } catch (err) {
    console.log(err.message);
  }
});

/** @ Login  User  */

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

router.get("/about", ensureAuthentication, (req, res) => {
  res.send(req.user);
});

module.exports = router;
