'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Chest = mongoose.model('Chest');

router.get('/', (req, res) => {
    Chest.find((err, docs) => {
        if (!err) {
            res.render("layouts/chest/list", {
                list: docs
            });
        } else {
            console.log('Error in retrieving Chest list : ' + err);
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
    let chest = new Chest();
    chest.id = req.body.Id;
    chest.type = req.body.Type;
    chest.name = req.body.Name;
    chest.value = req.body.Value;

    chest.save((err, doc) => {
        if (!err) {
            res.redirect('/chests');
        } else {
            console.log('Error during record insertion Chest : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Chest.findOneAndUpdate( req.body._id , {name: req.body.Name, value: req.body.Value, id:req.body.Id}, function(err, result){
        if(err){
            console.log('Error during record update : ' + err);
        }else{
            res.redirect('/chests');
        }
    });
}

router.get('/add', (req, res) => {
    res.render("layouts/chest/addOrEdit", {
        viewTitle: "Add a Chest"
    });
});

router.get('/:id', (req, res) => {
    Chest.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("layouts/chest/addOrEdit", {
                viewTitle: "Update Task",
                chest: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Chest.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/chest');
        } else {
            console.log('Error in task delete : ' + err);
        }
    });
});

module.exports = router;