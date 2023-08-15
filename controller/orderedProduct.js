const express = require("express");
const orderdProductModel=require('../model/orderModal.js')
const app = express();
const Stripe = require('stripe');


 const CreateOrder=async(req,res)=>{
    const data = await orderdProductModel(req.body)
    const datasave = await data.save()
    res.send({message : "order successfully"})
}


const getOrder=async(req,res)=>{
    try{
      const data = await orderdProductModel.find({})
       res.send(JSON.stringify(data))
  }
    catch (err){
        res.status(err.statusCode || 500).json(err.message)
      }
  }

  const CancelOrder=async(req,res)=>{
    try{
      const data = await orderdProductModel.deleteOne()
    res.send({massage:'Product Order Cancel'})
  }
    catch (err){
        res.status(err.statusCode || 500).json(err.message)
      }
  }

  const Approveorder = async (req, res) => {
    const id = req.params.id; 
    try {
      const approveData = await orderdProductModel.findByIdAndUpdate(
        id,
        { approved: true , status:'your order is accepted will soon collect  or contact us'}, 
        { new: true } 
      );
    console.log(approveData);
      res.status(200).json(approveData);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
  
const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)

const paymentStripe=async(req,res)=>{
    const myData=req.body
       try{
        const params = {
            submit_type : 'pay',
            mode : "payment",
            payment_method_types : ['card'],
            billing_address_collection : "auto",
            shipping_options : [{shipping_rate : "shr_1NSlmwEYDLJJFOUDQe5VGPqc"}],
  
            line_items : myData.map((item)=>{
  
              return{
                price_data : {
                  currency : "USD",
                  product_data : {
                    name : item.name,
                    // images : [item.image]
                  },
                  unit_amount : item.price * 100,
                },
                adjustable_quantity : {
                  enabled : true,
                  minimum : 1,
                },
                quantity : item.qty
              }
            }),
  
            success_url : `${process.env.FRONTEND_URL}/success`,
            cancel_url : `${process.env.FRONTEND_URL}/cancel`,
          }
  
        
        const session = await stripe.checkout.sessions.create(params)
        res.status(200).json(session.id)
       }
       catch (err){
          res.status(err.statusCode || 500).json(err.message)
       }
  
  }

module.exports={CreateOrder,getOrder,CancelOrder,paymentStripe,Approveorder}