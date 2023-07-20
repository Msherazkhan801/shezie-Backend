const express = require("express");
const  {CreateOrder,getOrder,CancelOrder,Approveorder}  = require("../controller/orderedProduct.js");
const orderdProductModel=require('../model/orderModal.js')
const app = express();

app.post("/orderd-product",CreateOrder)
app.get("/order-products",getOrder)
app.delete("/order-products/:id",CancelOrder)
app.put("/order-products/:id/aprove",Approveorder)

module.exports=app
