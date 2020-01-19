'use strict';

const express = require('express');
const router = express.Router();
const http = require('http');

//Show table result of the Cloak list with result request
//Call API Armor
router.get('/list', (req, res) => {
    const optionsGet = {
        host: 'localhost',
        port: 3000,
        path: '/cloaks',
        method: 'GET'
    };
    //Parameters of the request
    http.request(optionsGet, function (result) {
        // console.log('STATUS: ' + result.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(result.headers));
        // result.setEncoding('utf8');
        result.on('data', function (chunk) {
            console.log(JSON.parse(chunk));
            res.render("layouts/cloak/list", {
                statut: result.statusCode,
                success: JSON.parse(chunk).success,
                message: JSON.parse(chunk).msg,
                list: JSON.parse(chunk).result,
            });
        });
    }).end();
});

router.post('/', (req, res) => {
    console.log('ROUTERRRRR',req.body);
    if (req.body._id == '') {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
});

function insertRecord(req, res) {
    console.log('INSERTTTT',req.body);
    const optionsPost = {
        host: 'localhost',
        port: 3000,
        path: '/cloaks/add'+req.body.Name+'&'+req.body.Value,
        method: 'POST'
    };
    console.log('PATHHH',optionsPost)
    http.request(optionsPost, function (result) {
        console.log('STATUS: ' + result.statusCode);
        console.log('HEADERS: ' + JSON.stringify(result.headers));
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            console.log(JSON.parse(chunk));
            res.render("layouts/cloak/info", {
                viewTitle: 'Result of Add cloak',
                statut: result.statusCode,
                success: JSON.parse(chunk).success,
                message: JSON.parse(chunk).msg,
                cloak: JSON.parse(chunk).result,
            });
        });
    }).end();
}

function updateRecord(req, res) {
    console.log('UPDATEEEE',req.body);
    const optionsPost = {
        host: 'localhost',
        port: 3000,
        path: '/cloaks/'+req.body.Id+'&'+req.body.Name+'&'+req.body.Value,
        method: 'PUT'
    };
    console.log('PATHHH',optionsPost)
    http.request(optionsPost, function (result) {
        console.log('STATUS: ' + result.statusCode);
        console.log('HEADERS: ' + JSON.stringify(result.headers));
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            console.log(JSON.parse(chunk));
            res.render("layouts/cloak/info", {
                viewTitle: 'Result of Updated cloak',
                statut: result.statusCode,
                success: JSON.parse(chunk).success,
                message: JSON.parse(chunk).msg,
                cloak: JSON.parse(chunk).result,
            });
        });
    }).end();
}

//Render the view to add cloak
router.get('/add', (req, res) => {
    res.render("layouts/cloak/addOrEdit", {
        viewTitle: "Insert Cloak",
        statut: 'NaN',
        success: 'NaN',
        message: 'Create your Cloak',
    });
});

//Render view to Update a cloak, param is ObjectId and Name and Value
router.get('/:id', (req, res) => {
    console.log('WTF',req.params);
    const optionsGetById = {
        host: 'localhost',
        port: 3000,
        path: '/cloaks/'+req.params.id,
        method: 'GET'
    };
    console.log('PATH',optionsGetById);
    //Parameters of the request
    http.request(optionsGetById, function (result) {
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            res.render("layouts/cloak/addOrEdit", {
                viewTitle: 'Update cloak',
                statut: result.statusCode,
                success: JSON.parse(chunk).success,
                message: JSON.parse(chunk).msg,
                cloak: JSON.parse(chunk).result,
            });
        });
    }).end();
});

//Delete cloak by ObjectID
router.get('/delete/:id', (req, res) => {
    const optionsGetById = {
        host: 'localhost',
        port: 3000,
        path: '/cloaks/'+req.params.id,
        method: 'DELETE'
    };
    console.log('PATH',optionsGetById.path);
    //Parameters of the request
    http.request(optionsGetById, function (result) {
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            res.render("layouts/cloak/info", {
                viewTitle: 'Info from the Deleted cloak',
                statut: result.statusCode,
                success: JSON.parse(chunk).success,
                message: JSON.parse(chunk).msg,
                cloak: JSON.parse(chunk).result,
            });
        });
    }).end();
});

module.exports = router;
