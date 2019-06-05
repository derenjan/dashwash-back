let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean
});

module.exports = mongoose.model('User', UserSchema);
