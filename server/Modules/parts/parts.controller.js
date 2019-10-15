const mongoose = require('mongoose');
const Part = require('./parts.model');

exports.parts_get_all = (req, res, next) => {
    Part.find().select('name price _id partImage').exec().then( docs => {
        console.log(docs);
        const response = {
            count: docs.length,
            parts: docs
        };
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    
};


exports.parts_create_part_with_img = (req, res, next) => {
    // const part = {
    //     name: req.body.name,
    //     price: req.body.price
    // };
    console.log(req.file);
    const part = new Part({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price,
        partImage: req.file.path 

    });

    part.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created part successfully',
            createdPart: {
                name:result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET',
                    url:'http://localhost:3000/parts/'+result._id
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });  
};


exports.parts_create_part_no_img = (req, res, next) => {
    // const part = {
    //     name: req.body.name,
    //     price: req.body.price
    // };
console.log('reqqqqqq',req.body)
    const part = new Part({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price

    });

    part.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created part successfully',
            createdPart: result
            });
        })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });

    
};


exports.parts_get_part = (req, res, next) => {
    const id = req.params.partId;

    Part.findById(id)
    .select('name price _id partImage')
    .exec()
    .then(doc => {
        console.log("From database ",doc);
        if(doc){
            res.status(200).json({
                part: doc,
                request: {
                    type: 'GET',
                    description: 'Get all parts',
                    url: 'http://localhost:3000/parts'
                }
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





exports.parts_delete_part = (req, res, next) => {
    const id = req.params.partId;
    Part.remove({_id:id}).exec().then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Part Deleted',
            request: {
                type:'POST',
                url:  'http://localhost:3000/parts',
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


exports.parts_update_part = (req, res, next) => {
    const id = req.params.partId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Part.update({_id:id},{$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'part updated',
            url: 'http://localhost:3000/parts/'+id
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};