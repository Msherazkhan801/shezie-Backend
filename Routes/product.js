const express = require("express");
const { paymentStripe } = require("../controller/orderedProduct.js");
const { CreateProduct, getProducts, deleteProduct } = require("../controller/productController.js");
const app = express();


app.post("/uploadProduct",CreateProduct)
app.get("/product",getProducts)
app.delete('/product/:id',deleteProduct)
app.post("/create-checkout-session",paymentStripe)

module.exports=app