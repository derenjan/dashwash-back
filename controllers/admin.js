const express = require('express');
const router = express.Router ();
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
router.use (bodyParser.urlencoded ({extended: false}));
router.use (bodyParser.json ());
const Users = require('../models/authModel');



router.post('/admin/users', (req, res) => {
    const isAdmin = req.params.isAdmin;
    if(isAdmin === true) {
        Users.find((error, users) => {
            if (error) {
                return res.status(400);
            }
            res.send(users);
        });
    }else{
        res.send("No access")
    }
})

router.put('/admin/users/:id',  (req, res) => {
    const body = req.body;
    Users.findByIdAndUpdate(req.params.id, body,{new: true}, (err, user) => {
        if (err) return next(err);
        res.json(user);
    });
});

router.delete('/amin/users/:id', (req, res) => {
    Users.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) return next(err);
        res.json(user);
    });
});

module.exports = router ;
