'use strict';

const express = require('express');
const router = express.Router();
// const Chest = mongoose.model('Chest');//Get the Chest model
const http = require('http');

//Parameters of the request
const optionsGet = {
    host: 'localhost',
    port: 3000,
    path: '/chests',
    method: 'GET'
};



//Show table result of the Chest list with result request
//Call API Armor
router.get('/list', (req, res) => {
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
    console.log(req.body.Name);
    const optionsPost = {
        host: 'localhost',
        port: 3000,
        path: '/chests/add?name='+req.body.Name+'&value='+req.body.Value,
        method: 'POST'
    };
    http.request(optionsPost, function (result) {
        console.log('STATUS: ' + result.statusCode);
        console.log('HEADERS: ' + JSON.stringify(result.headers));
        result.setEncoding('utf8');
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


router.get('/add', (req, res) => {
    res.render("layouts/chest/addOrEdit", {
        viewTitle: "Insert Task"
    });
});

module.exports = router;