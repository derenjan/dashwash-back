const express = require('express');
const router = express.Router ();
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
router.use (bodyParser.urlencoded ({extended: false}));
router.use (bodyParser.json ());
const nodemailer = require("nodemailer");
const Users = require('../models/authModel');
const jwt = require ('jsonwebtoken');


router.get('/admin/users/', async (req, res) => {

    let data = req.headers.authorization;
    data=data.split(" ")[1];
    let decoded=jwt.decode(data);

    if(decoded.isAdmin == true) {
        let users = await Users.find({isAdmin : false}).select('-password');
        res.send(users);
    }else{
        res.send("No access")
    }
});

router.post('/admin/users/email', (req, res) => {
    let email = req.body.email;
    let mess = req.body.mess;
    console.log(req.body.mess);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'petrosyankhachatur1@gmail.com',
            pass: ''
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    let HelperOptions ={
        from: 'petrosyankhachatur1@gmail.com',
        to: email,
        subject: "Helloewf",
        html: mess
    };

    transporter.sendMail(HelperOptions, (error, info)=>{
        if(error){
            console.log(error)
        }
        console.log("ok");
        res.json("sent");
    });

});

router.put('/admin/users/:id',  (req, res) => {
    const body = req.body;
    Users.findByIdAndUpdate(req.params.id, body,{new: true}, (err, user) => {
        if (err) return next(err);
        res.json(user);
    });
});

router.delete('/admin/users/:id', (req, res) => {
    Users.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) return next(err);
        res.json(user);
    });
});





module.exports = router ;
