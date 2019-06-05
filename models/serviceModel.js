let mongoose =require('mongoose');

let ServiceSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.Object,
    serviceName: String,
    serviceType: String,
});

module.exports = mongoose.model('Service', ServiceSchema);
