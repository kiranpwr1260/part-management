var express=require("express");
var router=express.Router();
const multer = require('multer');
const partsController = require('./parts.controller');
const checkAuth = require('../../middleware/check-auth');

const storage = multer.diskStorage({
    destination:function(req, file, cb){
       cb(null,'./uploads/');
    },
    filename:function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const filefilter =(req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
        cb(null,true);
    }else{
        cb(null,false);
    }
}


const upload = multer({
    storage: storage,
     limits:{
    fileSize:1024 * 1024 *5
    },
    fileFilter: filefilter
});


router.get('/', partsController.parts_get_all);

router.get('/:partId', partsController.parts_get_part);

// for adding part with image
//router.post('/', checkAuth, upload.single('partImage') , partsController.parts_create_part_with_img);

// for adding part without image

router.post('/', checkAuth ,partsController.parts_create_part_no_img);

router.delete('/:partId', checkAuth ,partsController.parts_delete_part);




router.patch('/:partId', checkAuth,);
module.exports=router;