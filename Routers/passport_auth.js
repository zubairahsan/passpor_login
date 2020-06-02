const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    /** Check User Exist With This Email */
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return done(null, false);
        }

        /** Compare Password  */
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) {
            return done(null, false, { message: "password dose not match." });
            
          }

          return done(null, user);
        });
      })
      .catch((err) => {
        return done(null, false, { message: "failed to login." });
      });
  })
);
passport.serializeUser((user, next) => {
  return next(null, user.id);
});
passport.deserializeUser((userId, next) => {
  User.findOne({ _id: userId })
    .then((user) => {
      return next(null, user);
    })
    .catch((err) => {
      next(err, null);
    });
});

module.exports = passport;
