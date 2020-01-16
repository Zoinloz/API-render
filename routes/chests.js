'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Chest = mongoose.model('Chest');//Get the Chest model

//Get the list of all Chest with url: http://localhost:3000/chests   Method : GET
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
            res.send({'msg': 'Something goes wrong !', 'success': 'false', 'result': err });
        }
    });
});

//Get one of Chest with the name url: http://localhost:3000/chests/<name>   Method : GET
router.get('/:name', (req, res) => {
    Chest.findById({name: req.params.name}, (err, doc) => {
        if (!err && doc!= null) {
            res.status(200).send({ 'msg': 'Chest found !', 'success': 'true', 'result': doc });
        }else{
            res.status(500).send({ 'msg': 'Chest not found', 'success': 'false', 'result': err });
        }
    });
});


//Add a chest with url : http://localhost:3000/chests/add    Method : POST
//need only 2 parameters in body request : name & value
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

//Update Data of one Chest with the url : http://localhost:3000/chests/<id>   Method : PUT
//With the id auto-increment
router.put('/:id', (req, res) => {
    Chest.findOneAndUpdate({id: req.params.id}, { name: req.body.name, value: req.body.value }, function (err, doc) {
        if (err) {
            res.status(500).send({ 'msg': 'Error during record update !', 'success': 'false', 'result': err });
        } else {
            res.status(200).send({ 'msg': 'Chest update !', 'success': 'true', 'result': doc });
        }
    });
});

//Delete Chest with the url : http://localhost:3000/chests/<id>   Method : DELETE
//With the id auto-increment
router.delete('/:id', (req, res) => {
    Chest.findOne({id: req.params.id}, function (err, doc) {
        console.log(doc);
        if(!err && doc!= null){
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