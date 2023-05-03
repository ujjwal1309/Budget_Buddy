
const express = require("express");
const cors = require("cors");
const path = require("path");
const { connection } = require("./config/db");
const jwt=require("jsonwebtoken");
const { googleRouter } = require("./routes/google.route");
const {DataRouter} = require('./routes/data.route');
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors())



app.use("/user",googleRouter);
app.use("/budget", DataRouter);

port = process.env.PORT || 4000;

app.listen(port, async () => {
  try {
    console.log(`server is running at http://localhost:${port}`);
    await connection;
    
  } catch (error) {
    
    console.log(error);

  }
})
