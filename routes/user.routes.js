const express = require("express");
const { signup, login, logout } = require("../controller/user.controller");
const { auth } = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", auth, logout);

module.exports = { userRouter };
