const express = require("express");
const conversationModel=require('../model/conversation.js');
const userModel = require("../model/userModal.js");
const mongoose = require('mongoose');
const app = express();



 const Conversation=async(req,res)=>{
  const {senderId, reciverId}=req.body;
try{
    if(!senderId|| !reciverId)return res.status(402).json("field required")
    const newConversation = await conversationModel({members:[senderId, reciverId]})
    await newConversation.save()
    console.log(newConversation,"<<");
    res.status(200).json({message : "succes"})

}catch(err){
    res.status(500).json({message : err})
}
}

const getConversation = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const newConversation = await conversationModel.find({ members: { $in: [userId] } });
  
      const conversationList = Promise.all(
        newConversation.map(async (conversation) => {
          const ReciverId = conversation.members.find((member) => member !== userId);
          try {
            const user = await userModel.findById(ReciverId);
            if (!user) {
              throw new Error('User not found for conversation participant');
            }
  
            return {
              user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                image: user.image
              },
              conversationId: conversation._id
            };
          } catch (error) {
            console.error(error);
            return null;
          }
        })
      );
  
      const resolvedConversationList = await conversationList;
      const filteredConversationList = resolvedConversationList.filter((item) => item !== null);
  
      res.status(200).json(filteredConversationList);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
  
  module.exports = { Conversation, getConversation };
  


module.exports={Conversation,getConversation}
