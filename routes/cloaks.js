'use strict';

const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const Cloak = mongoose.model('Cloak');

router.get('/', (req, res) => {
    Cloak.find((err, docs) => {
        if (!err) {
            if (docs.length != 0) {
                res.status(200);
                res.send({ 'msg': 'the Cloacks list !', 'success': 'true', 'result': docs });
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
    let cloak = new Cloak();
    cloak.type = "Cloack";
    cloak.name = req.body.name;
    cloak.value = req.body.value;

    cloak.save((err, doc) => {
        if (!err) {
            res.status(201).send({ 'msg': 'Chest Added !', 'success': 'true', 'result': doc });
        } else {
            res.status(500).send({ 'msg': 'Smothing goes wrong !', 'success': 'false', 'result': err });
        }
    });
});

router.put('/:id', (req, res) => {
    Cloak.findOneAndUpdate({id: req.params.id}, { name: req.body.name, value: req.body.value }, function (err, doc) {
        if (err) {
            res.status(500).send({ 'msg': 'Error during record update !', 'success': 'false', 'result': err });
        } else {
            res.status(200).send({ 'msg': 'Cloak update !', 'success': 'true', 'result': doc });
        }
    });
});

router.delete('/delete/:id', (req, res) => {
    Cloak.findOne({id: req.params.id}, function (err, doc) {
        if(!err){
            Cloak.findByIdAndDelete(doc._id, (err, doc) => {
                if (!err) {
                    res.status(200).send({ 'msg': 'Cloak Deleted !', 'success': 'true', 'result': doc });
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
