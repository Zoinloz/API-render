'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Chest = mongoose.model('Chest');

router.get('/', (req, res) => {
    Chest.find((err, docs) => {
        if (!err) {
            if (docs.length != 0) {
                res.status(200);
                res.send({ 'msg': 'the Chests list !', 'success': 'true', 'result': docs });
            } else {
                res.status(200);
                res.send({ 'msg': 'No data !', 'success': 'true', 'result': docs });
            }
        } else {
            res.status(500);
            res.send({ 'msg': 'Something goes wrong !', 'success': 'false', 'result': err });
        }
    });

});

router.post('/add', (req, res) => {
    insertRecord(req, res);
});

function insertRecord(req, res) {
    let chest = new Chest();
    chest.id = req.body.id;
    chest.type = "Chest";
    chest.name = req.body.name;
    chest.value = req.body.value;

    chest.save((err, doc) => {
        if (!err) {
            console.log(req.body);
            res.status(201).send({ 'msg': 'Chest Added !', 'success': 'true', 'result': doc });
        } else {
            res.status(500).send({ 'msg': 'Smothing goes wrong !', 'success': 'false', 'result': err });
        }
    });
}

function updateRecord(req, res) {
    Chest.findOneAndUpdate({name: req.params.name}, { name: req.body.name, value: req.body.value }, function (err, doc) {
        if (err) {
            res.status(500).send({ 'msg': 'Error during record update !', 'success': 'false', 'result': err });
        } else {
            res.status(200).send({ 'msg': 'Chest update !', 'success': 'true', 'result': doc });
        }
    });
}

router.put('/:id', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    updateRecord(req, res);
    // Chest.findById({name: req.params.name}, (err, doc) => {
    //     if (!err) {
    //         res.status(200).send({ 'msg': 'Chest update !', 'success': 'true', 'result': doc });
    //     }
    // });
});

router.delete('/delete', (req, res) => {
    Chest.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.setHeader("Content-Type", "application/json");
            console.log(req.body);
            res.status(200).send(req.body);
            //res.redirect('/chests');
        } else {
            console.log('Error in chest delete : ' + err);
        }
    });
});

router.delete('/delete/:id', (req, res) => {
    Chest.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/chests');
        } else {
            console.log('Error in chest delete : ' + err);
        }
    });
});

module.exports = router;