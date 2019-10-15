const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    LineOfItems:{type:mongoose.Schema.Types.Mixed,required:true},
    Amount:{type:Number, required:true},
    // partImage:{type:String, required:true},
},{
    timestamps: true,
  });

module.exports = mongoose.model('Order',orderSchema);