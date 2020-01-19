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
        path: '/armors',
        method: 'GET'
    };
    //Parameters of the request
    http.request(optionsGet, function (result) {
        // console.log('STATUS: ' + result.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(result.headers));
        // result.setEncoding('utf8');
        result.on('data', function (chunk) {
            console.log(JSON.parse(chunk));
            res.render("layouts/armor/list", {
                statut: result.statusCode,
                success: JSON.parse(chunk).success,
                message: JSON.parse(chunk).msg,
                list: JSON.parse(chunk).result,
            });
        });
    }).end();
});

router.post('/add', (req, res) => {
    console.log('ROUTERRRRR',req.body);
    if (req.body._id == '') {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
});

function insertRecord(req, res) {
    var allChest;
    var allHelmet;
    var allArm;
    var allCloak;
    var allLegs;
    const optionsGetChest = {
        host: 'localhost',
        port: 3000,
        path: '/chests',
        method: 'GET'
    };
    http.request(optionsGetChest, function (result) {
        result.on('data', function (chunk) {
            allChest = JSON.parse(chunk).result;
        });
    }).end();
    const optionsGetHelmet = {
        host: 'localhost',
        port: 3000,
        path: '/helmets',
        method: 'GET'
    };
    http.request(optionsGetHelmet, function (result) {
        result.on('data', function (chunk) {
            allHelmet = JSON.parse(chunk).result;
        });
    }).end();
    const optionsGetCloak = {
        host: 'localhost',
        port: 3000,
        path: '/cloaks',
        method: 'GET'
    };
    http.request(optionsGetCloak, function (result) {
        result.on('data', function (chunk) {
            allCloak = JSON.parse(chunk).result;
        });
    }).end();
    const optionsGetArms = {
        host: 'localhost',
        port: 3000,
        path: '/arms',
        method: 'GET'
    };
    http.request(optionsGetArms, function (result) {
        result.on('data', function (chunk) {
            allArm = JSON.parse(chunk).result;
        });
    }).end();
    const optionsGetLegs = {
        host: 'localhost',
        port: 3000,
        path: '/legs',
        method: 'GET'
    };
    http.request(optionsGetLegs, function (result) {
        result.on('data', function (chunk) {
            allLegs = JSON.parse(chunk).result;
        });
    }).end();
    console.log('Get to show',req.params);

    const optionsGetById = {
        host: 'localhost',
        port: 3000,
        path: '/armors/'+req.params.id,
        method: 'GET'
    };
    console.log('PATH',optionsGetById);
    console.log('allChest',allChest)
    //Parameters of the request
    http.request(optionsGetById, function (result) {
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            console.log('ARMOR data',JSON.parse(chunk))
            res.render("layouts/armor/addOrEdit", {
                viewTitle: 'Update Armor',
                statut: result.statusCode,
                success: JSON.parse(chunk).success,
                message: JSON.parse(chunk).msg,
                armor: JSON.parse(chunk).result,
                chests: allChest,
                helmets: allHelmet,
                cloaks: allCloak,
                arms: allArm,
                legs: allLegs
            });
        });
    }).end();
}

function updateRecord(req, res) {

}

router.get('/add', (req, res) => {
    console.log('adddddddddddddddddd')
    var allChest;
    var allHelmet;
    var allArm;
    var allCloak;
    var allLegs;
    const optionsGetChest = {
        host: 'localhost',
        port: 3000,
        path: '/chests',
        method: 'GET'
    };
    http.request(optionsGetChest, function (result) {
        result.on('data', function (chunk) {
            allChest = JSON.parse(chunk).result;
        });
    }).end();
    const optionsGetHelmet = {
        host: 'localhost',
        port: 3000,
        path: '/helmets',
        method: 'GET'
    };
    http.request(optionsGetHelmet, function (result) {
        result.on('data', function (chunk) {
            allHelmet = JSON.parse(chunk).result;
        });
    }).end();
    const optionsGetCloak = {
        host: 'localhost',
        port: 3000,
        path: '/cloaks',
        method: 'GET'
    };
    http.request(optionsGetCloak, function (result) {
        result.on('data', function (chunk) {
            allCloak = JSON.parse(chunk).result;
        });
    }).end();
    const optionsGetArms = {
        host: 'localhost',
        port: 3000,
        path: '/arms',
        method: 'GET'
    };
    http.request(optionsGetArms, function (result) {
        result.on('data', function (chunk) {
            allArm = JSON.parse(chunk).result;
        });
    }).end();
    const optionsGetLegs = {
        host: 'localhost',
        port: 3000,
        path: '/legs',
        method: 'GET'
    };
    http.request(optionsGetLegs, function (result) {
        result.on('data', function (chunk) {
            allLegs = JSON.parse(chunk).result;
        });
    }).end();

    res.render("layouts/armor/addOrEdit", {
        viewTitle: "Insert Armor",
        statut: 'NaN',
        success: 'NaN',
        message: 'NaN',
        chests: allChest,
        helmets: allHelmet,
        cloaks: allCloak,
        arms: allArm,
        legs: allLegs
    });
});

//Render view to Update a chest, param is ObjectId and Name and Value
router.get('/:id', (req, res) => {
    console.log('WTF',req.params);
    const optionsGetById = {
        host: 'localhost',
        port: 3000,
        path: '/chests/'+req.params.id,
        method: 'GET'
    };
    console.log('PATH',optionsGetById);
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

//Delete Armor with the url : http://localhost:3000/armors/<id>   Method : DELETE
//With the id auto-increment
//Delete Chest by ObjectID
router.get('/delete/:id', (req, res) => {
    const optionsGetById = {
        host: 'localhost',
        port: 3000,
        path: '/armors/'+req.params.id,
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