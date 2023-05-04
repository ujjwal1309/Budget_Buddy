
const express = require("express");
const cors = require("cors");
const path = require("path");
const { connection } = require("./config/db");
const jwt=require("jsonwebtoken");
const { googleRouter } = require("./routes/google.route");
const {DataRouter} = require('./routes/data.route');
const { userRouter } = require("./routes/user.routes");
require("dotenv").config();



const app = express();
app.use(express.json());
app.use(cors());
app.set("views", __dirname + "/public");
app.set("view engine", "ejs");
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.use("/users",userRouter);
app.use("/auth",googleRouter);
app.use("/budget",authenticateUser, DataRouter);

port = process.env.PORT || 4000;

app.listen(port, async () => {
  try {
    console.log(`server is running at http://localhost:${port}`);
    await connection;
    
  } catch (error) {
    
    console.log(error);

  }
})
