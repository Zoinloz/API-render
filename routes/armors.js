'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Armor = mongoose.model('Armor');

router.get('/', (req, res) => {
    Armor.find((err, docs) => {
        if (!err) {
            // res.status(200);
            // res.send({ 'msg': 'success', 'success': 'true', 'result': docs });
            res.render("layouts/armor/list", {
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
    let armor = new Armor();
    armor.id = req.body.Id;
    armor.type = req.body.Type;
    armor.name = req.body.Name;
    armor.value = req.body.Value;

    armor.save((err, doc) => {
        if (!err) {
            res.redirect('/armors');
        } else {
            console.log('Error during record insertion arm : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Armor.findOneAndUpdate( req.body._id , {name: req.body.Name, value: req.body.Value, id:req.body.Id}, function(err, result){
        if(err){
            console.log('Error during record update : ' + err);
        }else{
            res.redirect('/armors');
        }
    });
}

router.get('/add', (req, res) => {
    res.render("layouts/armor/addOrEdit", {
        viewTitle: "Add a armor"
    });
});

router.get('/:id', (req, res) => {
    Armor.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("layouts/armor/addOrEdit", {
                viewTitle: "Update armor",
                arm: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Armor.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/armors');
        } else {
            console.log('Error in arm delete : ' + err);
        }
    });
});

module.exports = router;
