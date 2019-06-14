var express = require ('express');
var router = express.Router ();
var bodyParser = require ('body-parser');
var mongoose = require('mongoose');
router.use (bodyParser.urlencoded ({extended: false}));
router.use (bodyParser.json ());
var User = require ('../models/authModel');
var jwt = require ('jsonwebtoken');
var bcrypt = require ('bcryptjs');
var config = require ('../config');
var VerifyToken = require('../middlewares/VerifyToken');


const app = express();



router.post('/register', (req, res) => {
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.findOne({email:req.body.email})
        .then(user=>{
        if(user){
            res.send("This email is already registered", 400);
        }else{
            User.create({
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                phone : req.body.phone,
                email : req.body.email,
                password : hashedPassword,
                isAdmin: false
                },
                (err, user) => {
                    if (err) return res.status(500).send("There was a problem registering the user.")
                    var token = jwt.sign({ id: user._id }, config.secret, {
                        expiresIn: 86400
                    });
                    res.status(200).send({ auth: true, token: token });
                });
        }
    })
});

router.get('/me', VerifyToken, (req, res) => {
    User.findById(req.userId, { password: 0 }, (err, user) => {
        if (err) {
            return res.status(500).send("There was a problem finding the user.");
        }
        if (!user) {
            return res.status(404).send("No user found.");
        }

        res.status(200).send(user);
    });
});


router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(500).send('Error on the server.');
        }
        if (!user) {
            return res.status(404).send('No user found.');
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send('No user found.');
        }
        var token = jwt.sign({ id: user._id, isAdmin: user.isAdmin, name: user.name }, config.secret, {
            expiresIn: 86400
        });
        res.status(200).send({token: token });
    });
});

module.exports = router;
