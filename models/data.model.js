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