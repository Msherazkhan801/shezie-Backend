const express = require("express");
const { Conversation ,getConversation} = require("../controller/conversation.js");

const app = express();

app.post("/conversation",Conversation)
app.get("/conversation/:id",getConversation)


module.exports=app
