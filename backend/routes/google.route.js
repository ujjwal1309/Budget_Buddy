const express = require("express");
const { passport } = require("../config/google-oauth");
const jwt=require("jsonwebtoken");
const googleRouter = express.Router();
require("dotenv").config();

googleRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

googleRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/loginPage",
    session: false,
  }),
  function (req, res) {
    const token = jwt.sign({ user: req.user.email }, process.env.PRIVATE_KEY, {
      expiresIn: 60 * 60,
    });
    const rtoken = jwt.sign(
      { user: req.user.email },
      process.env.REFRESH_PRIVATE_KEY,
      {
        expiresIn: 60 * 60 * 7,
      }
    );
    res.redirect(`http://127.0.0.1:5500/admin.html?token=${token}&rtoken=${rtoken}`);
  }
);

module.exports = { googleRouter };
