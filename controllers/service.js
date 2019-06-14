var express = require('express');
const router = express.Router ();
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
router.use (bodyParser.urlencoded ({extended: true}));
router.use (bodyParser.json ());
const Service = require('../models/serviceModel');

router.post('/service', (req, res) => {
    let service = new Service(
        {
            userId:req.body.userId,
            addressName: req.body.addressName,
            serviceName: req.body.serviceName,
            serviceType: req.body.serviceType,
        }
    );
    service.save((err) => {
        if(err){
            return err
        }
        res.send('Service ceated successfully')
    })
});

router.get('/:userId/:addressName/service', (req, res) => {
    const userId = req.params.userId;
    const addressName = req.params.addressName;
    Service.find({
        userId: userId,
        addressName: addressName,
    }, (error, service) => {
        if (error) {
            return res.status(400);
        }
        res.send(service);
    });
});

router.put('/service/:id',  (req, res) => {
    const body = req.body;
    Service.findByIdAndUpdate(req.params.id, body,{new: true}, (err, service) => {
        if (err) return next(err);
        res.json(service);
    });
});

router.delete('/service/:id', (req, res) => {
    Service.findByIdAndRemove(req.params.id, (err, service) => {
        if (err) return next(err);
        res.json(service);
    });
});

module.exports = router;
