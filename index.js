const express = require('express');
const mongoose = require('mongoose');
const {DataRouter} = require('./routes/data.route');
const {connection} = require("./config/db")
require('dotenv').config()
const app = express();


app.use(express.json());
app.use('/budgetbuddy', DataRouter);

app.listen(process.env.PORT,async(res,err)=>{
  try{
      await connection
      
      console.log(`connected to db ${process.env.PORT}`);
  }catch(err){
      console.log(err);
  }
})
