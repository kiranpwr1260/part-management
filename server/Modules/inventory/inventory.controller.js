const mongoose = require('mongoose');
const Inventory = require('./inventory.model');

exports.inventorys_get_all = (req, res, next) => {
    Inventory.find().populate('part').exec().then( docs => {
        console.log(docs);
        const response = {
            count: docs.length,
            inventorys: docs
        };
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    
};

exports.inventorys_create_inventory = (req, res, next) => {
    // const inventory = {
    //     name: req.body.name,
    //     price: req.body.price
    // };
console.log('reqqqqqq',req.body)
    const inventory = new Inventory({
        _id: new mongoose.Types.ObjectId,
        batchNo:req.body.batchNo,
        part:req.body.part,
        quantity:req.body.quantity,
        inStock:req.body.quantity,
        out:0
    });

    inventory.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created inventory successfully',
            createdInventory: result.populate('part')
            });
        })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });

    
};


exports.inventorys_get_inventory = (req, res, next) => {
    const id = req.params.inventoryId;

    Inventory.findById(id)
    .populate('part')
    .exec()
    .then(doc => {
        console.log("From database ",doc);
        if(doc){
            res.status(200).json({
                inventory: doc
            });
        }else{
            res.status(404).json({message:'No valid entry found for provided ID'});
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });


    // if(id === 'special'){
    //     res.status(200).json({

    //         message: 'You discovered the special ID',
    //         id:id
    //     });
    // }else{
    //     res.status(200).json({

    //         message: 'You passed an ID'
    //     });
    // }
    
}





exports.inventorys_delete_inventory = (req, res, next) => {
    const id = req.params.inventoryId;
    Inventory.remove({_id:id}).exec().then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Inventory Deleted',
            request: {
                type:'POST',
                url:  'http://localhost:3000/inventorys',
                body: { name:'String', price:'Number' }

            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};


exports.inventorys_update_inventory = (req, res, next) => {
    console.log(req.body, req.params.inventoryId)
    const id =req.params.inventoryId;
    Inventory.findByIdAndUpdate({'_id':id},req.body)
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};