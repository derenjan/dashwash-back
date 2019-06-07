const express = require('express');
const router = express.Router ();
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
router.use (bodyParser.urlencoded ({extended: true}));
router.use (bodyParser.json ());
const UserList = require('../models/userListModel');

router.post('/UserList', (req, res) => {
    let userList = new UserList(
        {
            userId: req.body.userId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            carLicense: req.body.carLicense,
        }
    );
    userList.save((err) => {
        if(err){
            return err
        }
        res.send('User List ceated successfully')
    })
});

router.get('/:userId/UserList', (req, res) => {
    const userId = req.params.userId;

    UserList.find({
        userId: userId,
    }, (error, userList) => {
        if (error) {
            return res.status(400);
        }

        res.send(userList);
    });
});


router.put('/UserList/:id',  (req, res) => {
    const body = req.body;
    UserList.findByIdAndUpdate(req.params.id, body,{new: true}, (err, userList) => {
        if (err) return next(err);
        res.json(userList);
    });
});

router.delete('/UserList/:id', (req, res) => {
    UserList.findByIdAndRemove(req.params.id, (err, userList) => {
        if (err) return next(err);
        res.json(userList);
    });
});

module.exports = router;
