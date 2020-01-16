'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Arm = mongoose.model('Arm');

router.get('/', (req, res) => {
    Arm.find((err, docs) => {
        if (!err) {
            if (docs.length != 0) {
                res.status(200);
                res.send({ 'msg': 'the Arms list !', 'success': 'true', 'result': docs });
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
    let arm = new Arm();
    arm.type = "Arm";
    arm.name = req.body.name;
    arm.value = req.body.value;

    arm.save((err, doc) => {
        if (!err) {
            res.status(201).send({ 'msg': 'Arm Added !', 'success': 'true', 'result': doc });
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
    Arm.findOneAndUpdate({id: req.params.id}, { name: req.body.name, value: req.body.value }, function (err, doc) {
        if (err) {
            res.status(500).send({ 'msg': 'Error during record update !', 'success': 'false', 'result': err });
        } else {
            res.status(200).send({ 'msg': 'Arm update !', 'success': 'true', 'result': doc });
        }
    });
});

router.delete('/delete/:id', (req, res) => {
    Arm.findOne({id: req.params.id}, function (err, doc) {
        if(!err){
            Arm.findByIdAndDelete(doc._id, (err, doc) => {
                if (!err) {
                    res.status(200).send({ 'msg': 'Arm Deleted !', 'success': 'true', 'result': doc });
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