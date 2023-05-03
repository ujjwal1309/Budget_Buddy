const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: {type:String,required:true},
    last_name:{type:String,required:true},
    email: {type:String,required:true},
    mobile_number:{type:Number,required:true},
    password: {type:String,required:true},
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = { User };
