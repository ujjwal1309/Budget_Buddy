const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {

    name:{type:String},
    email: {type:String},
    mobile_number:{type:Number},
    picture:{type:String},
    password: {type:String},

  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = { User };
