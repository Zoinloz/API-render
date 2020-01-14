'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Legs = mongoose.model('Legs');

router.get('/', (req, res) => {
    Legs.find((err, docs) => {
        if (!err) {
            console.log(docs);
            docs.forEach(element => {
                console.log(element.name);
            });
            // res.json(docs);
            res.render("layouts/legs/list", {
                list: docs
            });
        } else {
            console.log('Error in retrieving Legs list: ' + err);
        }
    });

});

router.post('/add', (req, res) => {
    console.log("ADD");
    console.log(req.body._id,req.body._id == '');
    console.log(req.body.Name);
    if (req.body._id == '') {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
});

function insertRecord(req, res) {
    let legs = new Legs();
    legs.id = req.body.Id;
    legs.type = req.body.Type;
    legs.name = req.body.Name;
    legs.value = req.body.Value;

    legs.save((err, doc) => {
        if (!err) {
            res.redirect('/legs');
        } else {
            console.log('Error during record insertion Legs : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Legs.findOneAndUpdate( req.body._id , {name: req.body.Name, value: req.body.Value, id:req.body.Id}, function(err, result){
        if(err){
            console.log('Error during record update : ' + err);
        }else{
            res.redirect('/legs');
        }
    });
}

router.get('/add', (req, res) => {
    res.render("layouts/legs/addOrEdit", {
        viewTitle: "Add a Legs"
    });
});

router.get('/:id', (req, res) => {
    Legs.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("layouts/legs/addOrEdit", {
                viewTitle: "Update Legs",
                legs: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Legs.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/legs');
        } else {
            console.log('Error in legs delete : ' + err);
        }
    });
});

module.exports = router;