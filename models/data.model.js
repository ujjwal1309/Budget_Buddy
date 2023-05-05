const mongoose = require("mongoose")

const DataSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  category: {
    type: String,
    enum: ['food', 'housing', 'transportation', 'utilities', 'entertainment', 'education', 'healthcare', 'other'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  note: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
    })
    
    const DataModel = mongoose.model("data", DataSchema)
    
module.exports={DataModel}

