const express = require('express');
const router = express.Router ();
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
router.use (bodyParser.urlencoded ({extended: true}));
router.use (bodyParser.json ());
const Washing = require('../models/washingListModel');



router.post('/washing', (req, res) => {
    let wash = new Washing(
        {
            userId: req.body.userId,
            spotName: req.body.spotName,
            spotNumber: req.body.spotNumber,
        }
    );
   wash.save((err) => {
        if(err){
            return err
        }
        res.send('Washing ceated succesfully')
    })
});

router.get('/:userId/washing', (req, res) => {
    const userId = req.params.userId;
    Washing.find({
        userId: userId,
    }, (error, wash) => {
        if (error) {
            return res.status(400);
        }

        res.send(wash);
    });
});


router.put('/washing/:id',  (req, res) => {
    const body = req.body;
    Washing.findByIdAndUpdate(req.params.id, body,{new: true}, (err, wash) => {
        if (err) return next(err);
        res.json(wash);
    });
});

router.delete('/washing/:id', (req, res) => {
    Washing.findByIdAndRemove(req.params.id, (err, wash) => {
        if (err) return next(err);
        res.json(wash);
    });
});

module.exports = router;
