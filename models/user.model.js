const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: {type:String},
    last_name:{type:String},
    email: {type:String},
    mobile_number:{type:Number},
    password: {type:String},
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = { User };
