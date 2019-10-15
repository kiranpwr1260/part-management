var express=require("express");
var router=express.Router();
const inventoryController = require('./inventory.controller');
const checkAuth = require('../../middleware/check-auth');



router.get('/', inventoryController.inventorys_get_all);

router.get('/:inventoryId', inventoryController.inventorys_get_inventory);

// for adding inventory with image
//router.post('/', checkAuth, upload.single('inventoryImage') , inventoryController.inventorys_create_inventory_with_img);

// for adding inventory without image

router.post('/', checkAuth ,inventoryController.inventorys_create_inventory);
router.put('/:inventoryId', checkAuth ,inventoryController.inventorys_update_inventory);

router.delete('/:inventoryId', checkAuth ,inventoryController.inventorys_delete_inventory);




router.patch('/:inventoryId', checkAuth,);
module.exports=router;