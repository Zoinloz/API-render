'use strict';

const express = require('express');
const router = express.Router();
const http = require('http');

//Show table result of the Chest list with result request
//Call API Armor
router.get('/list', (req, res) => {
    const optionsGet = {
        host: 'localhost',
        port: 3000,
        path: '/legs',
        method: 'GET'
    };
    //Parameters of the request
    http.request(optionsGet, function (result) {
        // console.log('STATUS: ' + result.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(result.headers));
        // result.setEncoding('utf8');
        result.on('data', function (chunk) {
            console.log(JSON.parse(chunk));
            res.render("layouts/legs/list", {
                statut: result.statusCode,
                success: JSON.parse(chunk).success,
                message: JSON.parse(chunk).msg,
                list: JSON.parse(chunk).result,
            });
        });
    }).end();
});

//call Api to Add a Chest by the View
router.post('/', (req, res) => {
    console.log(req.body);
    const optionsPost = {
        host: 'localhost',
        port: 3000,
        path: '/legs/add'+req.body.Name+'&'+req.body.Value,
        method: 'POST'
    };
    console.log('PATHHH',optionsPost)
    http.request(optionsPost, function (result) {
        console.log('STATUS: ' + result.statusCode);
        console.log('HEADERS: ' + JSON.stringify(result.headers));
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            console.log(JSON.parse(chunk));
            res.render("layouts/legs/info", {
                viewTitle: 'Result of Add legs',
                statut: result.statusCode,
                success: JSON.parse(chunk).success,
                message: JSON.parse(chunk).msg,
                legs: JSON.parse(chunk).result,
            });
        });
    }).end();
});
router.post('', (req, res) => {
    
});

//Render the view to add chest
router.get('/add', (req, res) => {
    res.render("layouts/legs/addOrEdit", {
        viewTitle: "Insert legs",
        statut: 'NaN',
        success: 'NaN',
        message: 'Create your legs',
    });
});

//Render view to Update a chest, param is ObjectId and Name and Value
router.get('/:id', (req, res) => {
    const optionsGetById = {
        host: 'localhost',
        port: 3000,
        path: '/legs/'+req.params.id+'&'+req.body.Name+'&'+req.body.Value,
        method: 'PUT'
    };
    console.log('PATH',optionsGetById);
    //Parameters of the request
    http.request(optionsGetById, function (result) {
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            res.render("layouts/legs/list", {
                viewTitle: 'Update legs',
                statut: result.statusCode,
                success: JSON.parse(chunk).success,
                message: JSON.parse(chunk).msg,
                legs: JSON.parse(chunk).result,
            });
        });
    }).end();
});

//Delete Chest by ObjectID
router.get('/delete/:id', (req, res) => {
    const optionsGetById = {
        host: 'localhost',
        port: 3000,
        path: '/legs/'+req.params.id,
        method: 'DELETE'
    };
    console.log('PATH',optionsGetById.path);
    //Parameters of the request
    http.request(optionsGetById, function (result) {
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            res.render("layouts/legs/info", {
                viewTitle: 'Info from the Deleted legs',
                statut: result.statusCode,
                success: JSON.parse(chunk).success,
                message: JSON.parse(chunk).msg,
                legs: JSON.parse(chunk).result,
            });
        });
    }).end();
});

module.exports = router;