const mongoose = require('mongoose');

const massagesSchema = new mongoose.Schema({
  conversationId: { 
    type: String,
    required: true 
    },
  senderId: { 
    type: String,
    required: true 
    },
  massage: { 
    type: String,
    required: true 
    },

});

const massagesModel = mongoose.model('massages', massagesSchema);

module.exports = massagesModel;