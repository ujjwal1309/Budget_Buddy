const authenticateUser = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401).json({ error: true, message: "Unauthorized" });
    }
  };

  module.exports={authenticateUser}