const mongoose = require("mongoose")

const DataSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true
      },
      type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
      },
      purpose: {
        type: String,
        enum: ['Income', 'Grocery', 'Insurence','Electricity Bill','Room Rent','Tution Fee','Petrol','Gas-Cylinder','Others'],
        required: true
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }

})

const DataModel = mongoose.model("data", DataSchema)

module.exports={DataModel}

