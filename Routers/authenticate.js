module.exports = {
  ensureAuthentication: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    }
    res.send("Error.");
  },
};
