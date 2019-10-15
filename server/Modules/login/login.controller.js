var databaseOperation=require("./login.service");
var jwt=require("jsonwebtoken");

module.exports={
    getRequest : (req,res,next)=>{
        res.status(200).send({
            result : "/get request"
        });
    },
    registerUser : (req,res,next)=>{
        databaseOperation.registerUser(req.body,(error,data)=>{
            if(error)
            {
            }
            else
            {
                
                if(data)
                {
                    tempStatus=true;
                }
            }
            res.status(200).send({
                result : tempStatus,
                data : data,
            });
        });
    },
    loginUser : (req,res,next)=>{
        databaseOperation.loginUser(req.body,(error,data)=>{
            var tempStatus=false;
            let payload=null;
            let token=null;
            if(error)
            {
            }
            else
            {
                if(data)
                {
                    tempStatus=true;
                    payload={subject : data._id, email: data.email };
                    token=jwt.sign(payload,"kiranpwr143@gmail.com");
                }
            }
            res.status(200).send({
                request : "/login request",
                result : tempStatus,
                data : data,
                error : error,
                token : token
            });
        });
    },
    getEvents : (req,res,next)=>{
        databaseOperation.getEvents((error,data)=>{
            var tempStatus=false;
            res.status(200).send({
                request : "/getEvents request",
                result : tempStatus,
                data : data,
                error : error
            });
        });
    },
    getSpecailEvents : (req,res,next)=>{
        databaseOperation.getSpecailEvents((error,data)=>{
            var tempStatus=false;
            res.status(200).send({
                request : "/getSpecailEvents request",
                result : tempStatus,
                data : data,
                error : error
            });
        });
    },
    getRequestData : (req,res,next)=>{
        databaseOperation.getSpecailEvents((error,data)=>{
            var tempStatus=false;
            res.status(200).send({
                request : "/getRequestData request",
                result : tempStatus,
                data : data,
                error : error
            });
        });
    }
}