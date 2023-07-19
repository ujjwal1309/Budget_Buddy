
const express = require("express");
const cors = require("cors");
const path = require("path");
const { connection } = require("./config/db");
const jwt=require("jsonwebtoken");
const {googleRouter} = require("./routes/google.route");
const {DataRouter} = require('./routes/data.route');
const { userRouter } = require("./routes/user.routes");
require("dotenv").config();

const  {auth}= require("./middlewares/auth")

const app = express();
app.use(express.json());
app.use(cors());





app.use("/auth",googleRouter);
app.use("/users",userRouter);
app.use("/budget",auth, DataRouter);

port = process.env.PORT || 4000;

app.listen(port, async () => {
  try {
    console.log(`server is running at http://localhost:${port}`);
    await connection;
  } catch (error) {
    console.log(error);
  }
})
