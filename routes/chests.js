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
    let chest = new Chest();
    chest.type = "Chest";
    chest.name = req.body.name;
    chest.value = req.body.value;

    chest.save((err, doc) => {
        if (!err) {
            res.status(201).send({ 'msg': 'Chest Added !', 'success': 'true', 'result': doc });
        } else {
            res.status(500).send({ 'msg': 'Smothing goes wrong !', 'success': 'false', 'result': err });
        }
    });
});

    // Chest.findById({name: req.params.name}, (err, doc) => {
    //     if (!err) {
    //         res.status(200).send({ 'msg': 'Chest update !', 'success': 'true', 'result': doc });
    //     }
    // });

router.put('/:id', (req, res) => {
    Chest.findOneAndUpdate({id: req.params.id}, { name: req.body.name, value: req.body.value }, function (err, doc) {
        if (err) {
            res.status(500).send({ 'msg': 'Error during record update !', 'success': 'false', 'result': err });
        } else {
            res.status(200).send({ 'msg': 'Chest update !', 'success': 'true', 'result': doc });
        }
    });
});

router.delete('/delete/:id', (req, res) => {
    Chest.findOne({id: req.params.id}, function (err, doc) {
        if(!err){
            Chest.findByIdAndDelete(doc._id, (err, doc) => {
                if (!err) {
                    res.status(200).send({ 'msg': 'Chest Deleted !', 'success': 'true', 'result': doc });
                } else {
                    res.status(500).send({ 'msg': 'Error while delete', 'success': 'false', 'result': err });
                }
            });
        }else{
            res.status(500).send({ 'msg': 'Error Object not found', 'success': 'false', 'result': err });
        }
    });

});

module.exports = router;