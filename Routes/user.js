const express = require("express");
const { SignUp, SignIn } = require("../controller/userController.js");
const app = express();


app.post("/signup", SignUp);
  
  app.post("/login", SignIn);
  
 module.exports = app;
  