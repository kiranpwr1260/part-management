var databaseOperation=require("./login.service");
var jwt=require("jsonwebtoken");

module.exports={
    getRequest : (req,res,next)=>{
        console.log("/get request...");
        res.status(200).send({
            result : "/get request"
        });
    },
    registerUser : (req,res,next)=>{
        console.log("/register request...",req.body);
        databaseOperation.registerUser(req.body,(error,data)=>{
            if(error)
            {
                console.log("error : ",error);
            }
            else
            {
                console.log("data : ",data);
                
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
        console.log("/login request...",req.body);
        databaseOperation.loginUser(req.body,(error,data)=>{
            var tempStatus=false;
            let payload=null;
            let token=null;
            if(error)
            {
                console.log("error : ",error);
            }
            else
            {
                console.log("user login data : ",data);
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
        console.log("/getEvents request...");
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
        console.log("/getSpecailEvents request...");
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