'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Helmet = mongoose.model('Helmet');

router.get('/', (req, res) => {
    Helmet.find((err, docs) => {
        if (!err) {
            if (docs.length != 0) {
                res.status(200);
                res.send({ 'msg': 'the Helmet list !', 'success': 'true', 'result': docs });
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
    let helmet = new Helmet();
    helmet.type = "Helmet";
    helmet.name = req.body.name;
    helmet.value = req.body.value;

    helmet.save((err, doc) => {
        if (!err) {
            res.status(201).send({ 'msg': 'Helmet Added !', 'success': 'true', 'result': doc });
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
    Helmet.findOneAndUpdate({id: req.params.id}, { name: req.body.name, value: req.body.value }, function (err, doc) {
        if (err) {
            res.status(500).send({ 'msg': 'Error during record update !', 'success': 'false', 'result': err });
        } else {
            res.status(200).send({ 'msg': 'Helmet update !', 'success': 'true', 'result': doc });
        }
    });
});

router.delete('/delete/:id', (req, res) => {
    Helmet.findOne({id: req.params.id}, function (err, doc) {
        if(!err){
            Helmet.findByIdAndDelete(doc._id, (err, doc) => {
                if (!err) {
                    res.status(200).send({ 'msg': 'Helmet Deleted !', 'success': 'true', 'result': doc });
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
