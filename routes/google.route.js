const express = require("express");
const { passport } = require("../config/google-oauth");
const jwt=require("jsonwebtoken");
const { passport2 } = require("../config/microsoft-oauth");
const googleRouter = express.Router();
require("dotenv").config();

googleRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

googleRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  function (req, res) {
    const token = jwt.sign({ user_id: req.user._id }, process.env.PRIVATE_KEY, {
      expiresIn: 60 * 60,
    });
    const rtoken = jwt.sign(
      { user_id: req.user._id },
      process.env.REFRESH_PRIVATE_KEY,
      {
        expiresIn: 60 * 60 * 7,
      }
    );
    res.redirect(`/?token=${token}&rtoken=${rtoken}`);
  }
);

//------------------------------------------------------------------------------------------->
//Microsoft

googleRouter.get(
  "/microsoft",
  passport2.authenticate("microsoft", { scope: ['openid', 'profile', 'email'] })
);

googleRouter.get(
  "/microsoft/callback",
  passport2.authenticate("microsoft", { failureRedirect: "/login" }),
  (req, res) => {
    const token = jwt.sign({ user_id: req.user._id }, process.env.PRIVATE_KEY, {
      expiresIn: 60,
    });
    const rtoken = jwt.sign({ user_id: req.user._id }, process.env.REFRESH_PRIVATE_KEY, {
      expiresIn: 300,
    });
    res.redirect(`/?token=${token}&rtoken=${rtoken}`);
  }
);

module.exports = { googleRouter };
