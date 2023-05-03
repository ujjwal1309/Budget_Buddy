const passport2 = require("passport");
const { User } = require("../models/user.model");
const MicrosoftStrategy = require("passport-microsoft").Strategy;

const strategy = new MicrosoftStrategy(
  {
    clientID: "758bd616-d187-4adf-ac3d-38d179d96703",
    clientSecret: "ktJ8Q~7AOKMjwIiAqO21PcLoaLOBCo-ybYa0Db_Y",
    callbackURL: "http://localhost:4000/auth/microsoft/callback",
    scope: ["openid", "profile", "email"],
  },
  async (accessToken, refreshToken, profile, cb) => {
    const { name, email, picture } = profile._json;
    const userData = await User.find({ email });
    console.log(userData);
    if (userData.length) {
      return cb(null, userData);
    } else {
      const newUser = new User({
        name,
        email,
        picture,
      });
      await newUser.save();
      return cb(null, newUser);
    }
  }
);

passport2.use(strategy);

module.exports = { passport2 };
