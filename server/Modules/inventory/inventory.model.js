const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    batchNo:{type:Number, required:true},
    part:{type:mongoose.Schema.Types.ObjectId, ref:'Part' ,required:true},
    inDate:{type:Date, required:true, default: new Date()},
    quantity:{type:Number, required:true},
    inStock:{type:Number, required:true},
    out:{type:Number, required:true},
    // partImage:{type:String, required:true},
    
},{
    timestamps: true,
  });

module.exports = mongoose.model('Inventory',inventorySchema);