let mongoose =  require('mongoose');

let AddressWashSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    name: String,
    address: String,
});

module.exports = mongoose.model('addressWash', AddressWashSchema);
