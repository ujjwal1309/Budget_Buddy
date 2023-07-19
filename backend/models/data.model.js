const mongoose = require("mongoose")

const DataSchema = mongoose.Schema({
  user: {
    type: String,
    ref: 'User',
    required: true
  },
  title:{
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Income', 'Expense'],
    required: true
  },
  category: {
    type: String,
    enum: ['Groceries', 'Housing', 'Travelling', 'Utilities', 'Entertainment','Clothing','Subscriptions', 'Education', 'Healthcare', 'Other','Salary','Freelancing','Investments','Commissions','Stock','Youtube'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  comment: {
    type: String
  },
  date: {
    type: Date,
    default:Date.now,
    required: true
  }
    },{
      timestamps: true
    })
    
    const DataModel = mongoose.model("data", DataSchema)
    
module.exports={DataModel}

