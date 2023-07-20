const express = require("express");
const Stripe = require('stripe')
const productModel=require('../model/ProductModal.js')

const CreateProduct=async(req,res)=>{
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({message : "Upload successfully"})
}

const getProducts=async(req,res)=>{
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
  }

  const deleteProduct=async(req,res)=>{
    const data=await productModel.deleteOne()
   res.send({massage:'product deleted..'})
   }

module.exports={CreateProduct,getProducts,deleteProduct}