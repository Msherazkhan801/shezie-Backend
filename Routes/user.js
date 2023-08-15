const express = require("express");
const { SignUp, SignIn, getUser } = require("../controller/userController.js");
const app = express();


app.post("/signup", SignUp);
  
  app.post("/login", SignIn);
  app.get('/users',getUser)
  
 module.exports = app;
  