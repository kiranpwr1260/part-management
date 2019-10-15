const mongoose = require('mongoose');

const partSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type:String, required:true},
    price:{type:Number, required:true},
    // partImage:{type:String, required:true},
    
},{
    timestamps: true,
  });

module.exports = mongoose.model('Part',partSchema);