let mongoose = require('mongoose');

let WashingSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    spotName: String,
    spotNumber: Number,
});

module.exports = mongoose.model('Washing', WashingSchema);
