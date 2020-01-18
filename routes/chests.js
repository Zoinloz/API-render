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
        path: '/chests',
        method: 'GET'
    };
    //Parameters of the request
    http.request(optionsGet, function (result) {
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
});


router.post('/', (req, res) => {
    console.log(req.body);
    const optionsPost = {
        host: 'localhost',
        port: 3000,
        path: '/chests/add'+req.body.Name+'&'+req.body.Value,
        method: 'POST'
    };
    console.log('PATHHH',optionsPost)
    http.request(optionsPost, function (result) {
        console.log('STATUS: ' + result.statusCode);
        console.log('HEADERS: ' + JSON.stringify(result.headers));
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            console.log(JSON.parse(chunk));
            res.render("layouts/chest/info", {
                viewTitle: 'Result of Add chest',
                statut: result.statusCode,
                success: JSON.parse(chunk).success,
                message: JSON.parse(chunk).msg,
                chest: JSON.parse(chunk).result,
            });
        });
    }).end();
});

//Render the view to add chest
router.get('/add', (req, res) => {
    res.render("layouts/chest/addOrEdit", {
        viewTitle: "Insert Chest",
        statut: 'NaN',
        success: 'NaN',
        message: 'Create your Chest',
    });
});

//Render view to Update a chest, param is ObjectId
router.get('/:id', (req, res) => {
    const optionsGetById = {
        host: 'localhost',
        port: 3000,
        path: '/chests/'+req.params.id,
        method: 'GET'
    };
    console.log('PATH',optionsGetById.path);
    //Parameters of the request
    http.request(optionsGetById, function (result) {
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            res.render("layouts/chest/addOrEdit", {
                viewTitle: 'Update Chest',
                statut: result.statusCode,
                success: JSON.parse(chunk).success,
                message: JSON.parse(chunk).msg,
                chest: JSON.parse(chunk).result,
            });
        });
    }).end();
});

//Delete Chest by ObjectID
router.get('/delete/:id', (req, res) => {
    const optionsGetById = {
        host: 'localhost',
        port: 3000,
        path: '/chests/'+req.params.id,
        method: 'DELETE'
    };
    console.log('PATH',optionsGetById.path);
    //Parameters of the request
    http.request(optionsGetById, function (result) {
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            res.render("layouts/chest/info", {
                viewTitle: 'Info from the Deleted chest',
                statut: result.statusCode,
                success: JSON.parse(chunk).success,
                message: JSON.parse(chunk).msg,
                chest: JSON.parse(chunk).result,
            });
        });
    }).end();
});

module.exports = router;