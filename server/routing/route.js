var express=require("express");
var loginControllers=require("../Modules/login/login.controller");
var jwt=require("jsonwebtoken");
var router=express.Router();

// login router
router.post("/login",loginControllers.loginUser);
router.post("/register",loginControllers.registerUser);

//data router




router.get("/get",loginControllers.getRequest);
router.get("/getData",loginControllers.getRequestData);
// router.post("/register",verifyRegister,loginControllers.registerUser);  //only check for middleware response hitting or not
router.get("/events",loginControllers.getEvents);
router.get("/specialEvents",verifyToken,loginControllers.getSpecailEvents);

module.exports=router;

function verifyRegister(req,res,next)
{
    return res.status(401).send("unAuthorization request");
}

function verifyToken(req,res,next)
{
    
    if(!req.headers.authorization)
    {
        return res.status(401).send("unAuthorized request");
    }
    let token=req.headers.authorization.split(" ")[1];
    
    if(token==="null")
    {
        return res.status(401).send("unAuthorization request");
    }
    
    let payload=jwt.verify(token,"kiranpwr143@gmail.com");
    
    if(!payload)
    {
        return res.status(401).send("unAuthorization request");
    }
    res.userId=payload.subject;
    next();
}