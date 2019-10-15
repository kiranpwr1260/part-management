var userSchema=require("./login.model");
var eventService=require("../../service/eventService");

module.exports={
    registerUser : (obj,callback)=>{
        new userSchema(obj).save(callback);
    },
    loginUser : (obj,callback)=>{
        userSchema.findOne({
            "$and" : [
                {"email" : obj.email},
                {"password" : obj.password}
            ]
        },callback);
    },
    getEvents : (callback)=>{
        // userSchema.find(callback);
        callback(null,eventService.getEvents());
    },
    getSpecailEvents : (callback)=>{
        // userSchema.find(callback);
        callback(null,eventService.getEvents());
    }
}