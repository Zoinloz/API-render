'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cloak = mongoose.model('Cloak');

router.get('/', (req, res) => {
    Cloak.find((err, docs) => {
        if (!err) {
            console.log(docs);
            docs.forEach(element => {
                console.log(element.name);
            });
            // res.json(docs);
            res.render("layouts/cloak/list", {
                list: docs
            });
        } else {
            console.log('Error in retrieving Cloak list: ' + err);
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
    let cloak = new Cloak();
    cloak.id = req.body.Id;
    cloak.type = req.body.Type;
    cloak.name = req.body.Name;
    cloak.value = req.body.Value;

    cloak.save((err, doc) => {
        if (!err) {
            res.redirect('/cloaks');
        } else {
            console.log('Error during record insertion Cloak : ' + err);
        }
    });
}

function updateRecord(req, res) {
    console.log('id',req.body._id);
    Cloak.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('/cloaks');
        } else {
            console.log('Error during record update : ' + err);
            res.redirect('/cloaks');
        }
    });
}

router.get('/add', (req, res) => {
    res.render("layouts/cloak/addOrEdit", {
        viewTitle: "Add a Cloak"
    });
});

router.get('/:id', (req, res) => {
    Cloak.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("layouts/cloak/addOrEdit", {
                viewTitle: "Update Task",
                task: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Cloak.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/cloak/list');
        } else {
            console.log('Error in task delete : ' + err);
        }
    });
});

module.exports = router;