var express = require('express');
const router = express.Router ();
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
router.use (bodyParser.urlencoded ({extended: true}));
router.use (bodyParser.json ());
const Employee = require('../models/employeeModel');



router.post('/employee', (req, res) => {
    let employee = new Employee(
        {
            userId:req.body.userId,
            addressName: req.body.addressName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            workDay: req.body.workDay,
            timeStart: req.body.timeStart,
            timeFinished: req.body.timeFinished,
            status: req.body.status,
            employee_id: req.body.employee_id
        }
    );
    employee.save((err) => {
        if(err){
            return err
        }
        res.send('Employee ceated successfully')
    })
});

router.get('/:userId/:addressName/employee', (req, res) => {
    const userId = req.params.userId;
    const addressName = req.params.addressName;

    Employee.find({
        userId: userId,
        addressName:addressName
    }, (error, employees) => {
        if (error) {
            return res.status(400);
        }

        res.send(employees);
    });
});


router.put('/employee/:id',  (req, res) => {
    const body = req.body;
    Employee.findByIdAndUpdate(req.params.id, body,{new: true}, (err, employee) => {
        if (err) return next(err);
        res.json(employee);
    });
});

router.delete('/employee/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, employee) => {
        if (err) return next(err);
        res.json(employee);
    });
});


module.exports = router;
