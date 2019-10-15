const mongoose = require('mongoose');
const Order = require('./order.model');

exports.orders_get_all = (req, res, next) => {
    Order.find().exec().then( docs => {
        console.log(docs);
        const response = {
            count: docs.length,
            orders: docs
        };
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    
};

exports.orders_create_order = (req, res, next) => {
    // const order = {
    //     name: req.body.name,
    //     price: req.body.price
    // };
console.log('reqqqqqq',req.body)
    const order = new Order({
        _id: new mongoose.Types.ObjectId,
        LineOfItems:req.body.LineOfItems,
        Amount:req.body.Amount,
    });

    order.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created order successfully',
            createdOrder: result
            });
        })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });

    
};


exports.orders_get_order = (req, res, next) => {
    const id = req.params.orderId;

    Order.findById(id)
    .exec()
    .then(doc => {
        console.log("From database ",doc);
        if(doc){
            res.status(200).json({
                order: doc
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





exports.orders_delete_order = (req, res, next) => {
    const id = req.params.orderId;
    Order.remove({_id:id}).exec().then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Order Deleted'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};


exports.orders_update_order = (req, res, next) => {
    const id = req.params.orderId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Order.update({_id:id},{$set: updateOps})
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