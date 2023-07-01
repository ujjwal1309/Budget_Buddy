const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { redisClient } = require("../helpers/redis");
const { User } = require("../models/user.model");
require("dotenv").config();

const signup = async (req, res) => {
  const { name, email, password, picture, mobile_number } = req.body;
  try {
    const isUser = await User.findOne({ email });

    if (isUser) return res.send({ msg: "User already exist, Please login" });

    const hashedPass = bcrypt.hashSync(password, 5);

    const newUser = new User({
      name,
      email,
      password: hashedPass,
      picture,
      mobile_number,
    });

    await newUser.save();

    res.send({ msg: "User successfully created" });
  } catch (error) {
    console.log({ msg: "error", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUser = await User.findOne({ email });

    if (!isUser) return res.send({ msg: "Email and password doesn't match" });

    const isPassword = bcrypt.compareSync(password, isUser.password);

    if (!isPassword) return res.send({ msg: "Password doesn't match" });

    const token = jwt.sign({ user: isUser.email }, process.env.PRIVATE_KEY);

    const refreshToken = jwt.sign(
      { userId: isUser._id },
      process.env.REFRESH_PRIVATE_KEY
    );

    res.send({ msg: "Successfully logged in", token, refreshToken });
  } catch (error) {
    res.send({ msg: "error", error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const email = req.user;
    const user = await User.find({ email });
    res.send(user);
  } catch (error) {
    res.send({ msg: "error", error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(403);

    redisClient.set(token, 1);

    res.send({ msg: "Logout successful" });
  } catch (error) {
    res.send({ msg: "error", error: error.message });
  }
};

module.exports = { signup, login, logout, getUser };
