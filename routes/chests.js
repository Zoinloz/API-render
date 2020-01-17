'use strict';

const express = require('express');
const router = express.Router();
// const Chest = mongoose.model('Chest');//Get the Chest model
const http = require('http');

//Parameters of the request
const options = {
    host: 'localhost',
    port: 3000,
    path: '/chests',
    method: 'GET'
};

//Show table result of the Chest list with result request
//Call API Armor
router.get('/list', (req, res) => {
    http.request(options, function (result) {
        // console.log('STATUS: ' + result.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(result.headers));
        // result.setEncoding('utf8');
        result.on('data', function (chunk) {
            console.log(JSON.parse(chunk));
            res.render("layouts/chest/list", {
                statut: result.statusCode,
                success: JSON.parse(chunk).success,
                message: JSON.parse(chunk).msg,
                list: JSON.parse(chunk).result,
            });
        });
    }).end();
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
    Chest.findOne({name: req.params.name}, (err, doc) => {
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

});

router.get('/add', (req, res) => {
    res.render("layouts/chest/addOrEdit", {
        viewTitle: "Insert Task"
    });
});

module.exports = router;