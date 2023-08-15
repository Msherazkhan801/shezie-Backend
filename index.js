const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const User=require('./Routes/user.js')
const Products=require('./Routes/product.js')
const Orders=require('./Routes/orderedProduct.js');
const  Conversation  = require("./Routes/conversation.js");
const Massages=require('./Routes/massages.js')
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8000;

//mongodb connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to Databse"))
  .catch((err) => console.log(err));
app.use('/',User)
app.use('/',Products)
app.use('/',Orders)
app.use('/',Conversation)
app.use('/',Massages)


app.listen(PORT, () => console.log("server is running at port : " + PORT));
