let express = require('express');
var mongoose = require('mongoose');
var router =  express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
let db = require('./db');

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(__dirname + '/'));


app.set('view engine', 'ejs');


let AuthController = require('./controllers/auth');
app.use('/auth', AuthController);


let AddressController = require('./controllers/addressWash');
app.use('/api', AddressController);


let EmployeeController = require('./controllers/employees');
app.use('/api', EmployeeController);

let AdminController = require('./controllers/admin');
app.use('/api', AdminController);

let WashingController = require('./controllers/washingList');
app.use('/api', WashingController);

let UserListController = require('./controllers/userList');
app.use('/api', UserListController);

let ServiceController = require('./controllers/service');
app.use('/api', ServiceController);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'public')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });
}

module.exports = app;
