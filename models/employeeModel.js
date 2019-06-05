let mongoose =  require('mongoose');

let EmployeeSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    workDay: Date,
    timeStart: Date,
    timeFinished: Date,
    status: String,
    employee_id: String,
});

module.exports = mongoose.model('employees', EmployeeSchema);
