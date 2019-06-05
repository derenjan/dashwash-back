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


const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
];

// Separating Angular routes
app.get('*', (req, res) => {
    fixRoutes(req, res);
});

fixRoutes = (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        let url = `/var/www/html/secret_south/secret_south_angular/dist/front/${req.url}`;
        res.sendFile(url);
    } else {
        console.log(req.url)
        res.sendFile(path.join(__dirname, '../../secret_south/secret_south_angular/dist/front/index.html'));
    }
};

module.exports = app;
