var express=require("express");
var cors=require("cors");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var router=require("./routing/route");
const partsRoutes =  require('./Modules/parts/parts.router');
const inventoryRoutes =  require('./Modules/inventory/inventory.router');
const orderRoutes =  require('./Modules/orders/order.router');
var app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(router);
app.use('/parts',partsRoutes)
app.use('/inventory',inventoryRoutes)
app.use('/order',orderRoutes)

mongoose.connect("mongodb://localhost:27017/parts",{ useNewUrlParser: true, useFindAndModify:false },(error,db)=>{
    if(error)
        console.log("not connectd...",error);
    else
        console.log("connected succesfully..."+db);
});

app.listen(3000,()=>{
    console.log("server listen on 3000...");
});

console.log("hiii to master...");

console.log("Done");

