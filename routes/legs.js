'use strict';

const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const Legs = mongoose.model('Legs');

router.get('/', (req, res) => {
    Legs.find((err, docs) => {
        if (!err) {
            if (docs.length != 0) {
                res.status(200);
                res.send({ 'msg': 'the Legs list !', 'success': 'true', 'result': docs });
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
    let legs = new Legs();
    legs.type = "Legs";
    legs.name = req.body.name;
    legs.value = req.body.value;

    legs.save((err, doc) => {
        if (!err) {
            res.status(201).send({ 'msg': 'Legs Added !', 'success': 'true', 'result': doc });
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
    Legs.findOneAndUpdate({id: req.params.id}, { name: req.body.name, value: req.body.value }, function (err, doc) {
        if (err) {
            res.status(500).send({ 'msg': 'Error during record update !', 'success': 'false', 'result': err });
        } else {
            res.status(200).send({ 'msg': 'Legs update !', 'success': 'true', 'result': doc });
        }
    });
});

router.delete('/delete/:id', (req, res) => {
    Legs.findOne({id: req.params.id}, function (err, doc) {
        if(!err){
            Legs.findByIdAndDelete(doc._id, (err, doc) => {
                if (!err) {
                    res.status(200).send({ 'msg': 'Legs Deleted !', 'success': 'true', 'result': doc });
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
