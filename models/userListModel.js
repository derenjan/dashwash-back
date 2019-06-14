let mongoose = require('mongoose');

let UserListSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.Object,
    addressName: { type: [String], index: true },
    firstName: String,
    lastName: String,
    phone: String,
    carLicense: String,
});

module.exports = mongoose.model('userList', UserListSchema);
