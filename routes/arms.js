'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Arm = mongoose.model('Arm');

router.get('/', (req, res) => {
    Arm.find((err, docs) => {
        if (!err) {
            // res.status(200);
            // res.send({ 'msg': 'success', 'success': 'true', 'result': docs });
            res.render("layouts/arm/list", {
                list: docs
            });
        } else {
            console.log('Error in retrieving arm list : ' + err);
        }
    });

});

router.post('/add', (req, res) => {
    if (req.body._id == '') {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
});

function insertRecord(req, res) {
    let arm = new Arm();
    arm.id = req.body.Id;
    arm.type = req.body.Type;
    arm.name = req.body.Name;
    arm.value = req.body.Value;

    arm.save((err, doc) => {
        if (!err) {
            res.redirect('/arms');
        } else {
            console.log('Error during record insertion arm : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Arm.findOneAndUpdate( req.body._id , {name: req.body.Name, value: req.body.Value, id:req.body.Id}, function(err, result){
        if(err){
            console.log('Error during record update : ' + err);
        }else{
            res.redirect('/arms');
        }
    });
}

router.get('/add', (req, res) => {
    res.render("layouts/arm/addOrEdit", {
        viewTitle: "Add a arm"
    });
});

router.get('/:id', (req, res) => {
    Arm.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("layouts/arm/addOrEdit", {
                viewTitle: "Update arm",
                arms: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Arm.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/arms');
        } else {
            console.log('Error in arm delete : ' + err);
        }
    });
});

module.exports = router;