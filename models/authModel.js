let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    phone : String,
    email: String,
    password: String,
    isAdmin: Boolean
});

module.exports = mongoose.model('User', UserSchema);
