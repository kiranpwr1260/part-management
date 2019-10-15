var express=require("express");
var router=express.Router();
const orderController = require('./order.controller');
const checkAuth = require('../../middleware/check-auth');



router.get('/', orderController.orders_get_all);

router.get('/:orderId', orderController.orders_get_order);

// for adding order with image
//router.post('/', checkAuth, upload.single('orderImage') , orderController.orders_create_order_with_img);

// for adding order without image

router.post('/', checkAuth ,orderController.orders_create_order);

router.delete('/:orderId', checkAuth ,orderController.orders_delete_order);




router.patch('/:orderId', checkAuth,);
module.exports=router;