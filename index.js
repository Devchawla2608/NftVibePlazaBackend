//  ------------------------------- Require Express -------------------------------
const express = require("express");

//  ------------------------------- Require Path -------------------------------
const path = require("path");

//  ------------------------------- Define Port -------------------------------
const port = 8000;

//  ------------------------------- Start App -------------------------------
const app = express();

// ---------------------- Cors -------------------------- 

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

// -------------To tell that we will get json ----------------
app.use(express.json()) 
//  ------------------------------- Setting DB -------------------------------
const db = require("./config/mongoose.js");

//  ------------------------------- Parser Middleware (set data in req.body) -------------------------------
app.use(express.urlencoded({ extended: true }));

//  ------------------------------- Statics files (assets) -------------------------------
app.use(express.static("./assets"));

// -------------------------------Make the uploades path avaiable to server ---------------------------------
app.use('/uploads' , express.static(__dirname + '/uploads'));


const jwt = require('jsonwebtoken');

//  ------------------------------- Router (EJS) -------------------------------
app.use("/api", require("./routes"));


//  ------------------------------- Listen Port -------------------------------
app.listen(port, function (err) {
  if (err) {
    console.log("Error in starting server");
    return;
  }
  console.log("Server is live on port ", port);
});
