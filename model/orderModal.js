const mongoose = require('mongoose');
const  productModel =require('./ProductModal.js')
const schemaOrder = mongoose.Schema({
    id:String,
    fname: String,
    lname: String,
    cn: String,
    houseadd: String,
    apartment: String,
    city: String,
    state: String,
    zip: Number,
    phone: String,
    email: String,
    pname:String,
    qty:String,
    price:String,
    cartItem:[],
    approved:{
        type:Boolean,
        default:false
    },
    status:String

    // product:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: productModel
    // },
   
},
    {timeStamps:true},
);

const orderdProductModel = mongoose.model("order", schemaOrder);

module.exports = orderdProductModel;