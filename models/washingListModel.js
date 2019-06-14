let mongoose = require('mongoose');

let WashingSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    addressName: { type: [String], index: true },
    spotName: String,
    spotNumber: Number,
});

module.exports = mongoose.model('Washing', WashingSchema);
