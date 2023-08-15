const express = require("express");
const { Massages, getMassages } = require("../controller/massages");
const app = express();

app.post("/massages",Massages)
app.get("/massages/:conversationId",getMassages)

module.exports=app
