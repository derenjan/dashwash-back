var express = require('express');
const router = express.Router ();
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
router.use (bodyParser.urlencoded ({extended: true}));
router.use (bodyParser.json ());
const Address = require('../models/addressWashModel');



router.post('/address', (req, res) => {
    let address = new Address(
        {
            userId: req.body.userId,
            name: req.body.name,
            address: req.body.address
        }
    );
    address.save((err) => {
        if(err){
            return err
        }
        res.send('Address created successfully')
    })
});

router.get('/:userId/address', (req, res) => {
    const userId = req.params.userId;

    Address.find({
        userId: userId,
    }, (error, address) => {
        if (error) {
            return res.status(400);
        }

        res.send(address);
    });
});


router.put('/address/:id',  (req, res) => {
    const body = req.body;
    Address.findByIdAndUpdate(req.params.id, body,{new: true}, (err, address) => {
        if (err) return next(err);
        res.json(address);
    });
});

router.delete('/address/:id', (req, res) => {
    Address.findByIdAndRemove(req.params.id, (err, address) => {
        if (err) return next(err);
        res.json(address);
    });
});


module.exports = router;
