'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Helmet = mongoose.model('Helmet');

router.get('/', (req, res) => {
    Helmet.find((err, docs) => {
        if (!err) {
            // res.status(200);
            // res.send({ 'msg': 'success', 'success': 'true', 'result': docs });
            res.render("layouts/helmet/list", {
                list: docs
            });
        } else {
            console.log('Error in retrieving helmet list : ' + err);
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
    let helmet = new Helmet();
    helmet.id = req.body.Id;
    helmet.type = req.body.Type;
    helmet.name = req.body.Name;
    helmet.value = req.body.Value;

    helmet.save((err, doc) => {
        if (!err) {
            res.redirect('/helmets');
        } else {
            console.log('Error during record insertion helmet : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Helmet.findOneAndUpdate( req.body._id , {name: req.body.Name, value: req.body.Value, id:req.body.Id}, function(err, result){
        if(err){
            console.log('Error during record update : ' + err);
        }else{
            res.redirect('/helmets');
        }
    });
}

router.get('/add', (req, res) => {
    res.render("layouts/helmet/addOrEdit", {
        viewTitle: "Add a helmet"
    });
});

router.get('/:id', (req, res) => {
    Helmet.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("layouts/helmet/addOrEdit", {
                viewTitle: "Update helmet",
                helmet: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Helmet.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/helmets');
        } else {
            console.log('Error in helmet delete : ' + err);
        }
    });
});

module.exports = router;