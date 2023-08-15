const express = require("express");
const conversationModel=require('../model/conversation.js');
const userModel = require("../model/userModal.js");
const massagesModel=require('../model/massages.js')
const app = express();



 const Massages=async(req,res)=>{
  const {conversationId,senderId,massage ,reciverId=''}=req.body;
try{
    if(!senderId||!massage)return res.status(401).json({massage:"filled the field"})
    if(conversationId==='new' &&  reciverId){
        const latestConversation=new conversationModel({members:[senderId,reciverId]})
        await latestConversation.save()
        const latestMassage=new massagesModel({conversationId:conversationId._id,senderId,massage})
        await latestMassage.save()
       res.status(200).json({message : "Massage Sent succesfully"})


    }
    else if(!reciverId){res.status(401).json({massage:"Required field must be filled"})}
    const newMassage = await massagesModel({conversationId,senderId,massage })
    await newMassage.save()
    console.log(newMassage);
    res.status(200).json({message : "Massage Sent succesfully"})

}catch(err){
    res.status(500).json({message : err})
}
}
 const getMassages=async(req,res)=>{
  const conversationId =req.params.conversationId;
try{
    let newConversation=[]
   if(conversationId==='new'){
    const newConversation=conversationModel.find({members:{$in:[req.body.senderId,req.body.reciverId]}})
    if( newConversation.length > 0)return res.status(200).json({conversationId:newConversation[0]._id})
    res.status(200).json([])}
   const newMassage=await massagesModel.find({conversationId})
   const massageList=  Promise.all( newMassage.map(async(massage) => {
       const user=await userModel.findById(massage.senderId);
       return  {user:{
        _id:user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        email: user.email,
        image:user.image} ,massage:massage}
    }))
   res.status(200).json(await massageList)
}catch(err){
    res.status(500).json({message : err})
}
}


module.exports={Massages,getMassages}
