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

//Get one Armor with the name   url: http://localhost:3000/armors/<name>   Method : GET
router.get('/:id', (req, res) => {
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
            console.log(JSON.parse(chunk));
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
            console.log(JSON.parse(chunk));
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
            console.log(JSON.parse(chunk));
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
            console.log(JSON.parse(chunk));
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
            console.log(JSON.parse(chunk));
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
    console.log(req.body);
    armor.save((err, doc) => {
        if (!err) {
            res.status(201).send({ 'msg': 'Armor Added !', 'success': 'true', 'result': doc });
        } else {
            res.status(500).send({ 'msg': 'Smothing goes wrong !', 'success': 'false', 'result': err });
        }
    });
}

function updateRecord(req, res) {
    Armor.findOneAndUpdate(req.body._id, { name: req.body.Name, value: req.body.Value, id: req.body.Id }, function (err, result) {
        if (err) {
            console.log('Error during record update : ' + err);
        } else {
            res.redirect('/armors');
        }
    });
}

router.get('/add', (req, res) => {
    Arm.find((err, docs) => {
        if (!err) {
            res.render("layouts/armor/addOrEdit", {
                viewTitle: "Add a armor",
                list1: docs,
                list2: monChest,
                list3: maCloak,
                list4: monHelmet,
                list5: monLeg
            });
        }
    });
});

router.get('/:id', (req, res) => {
    //A voir avec l'insert
    Armor.findOneAndUpdate({ id: req.params.id }, { name: req.body.name, value: req.body.value }, function (err, doc) {
        if (err) {
            res.status(500).send({ 'msg': 'Error during record update !', 'success': 'false', 'result': err });
        } else {
            res.status(200).send({ 'msg': 'Chest update !', 'success': 'true', 'result': doc });
        }
    });
});

//Delete Armor with the url : http://localhost:3000/armors/<id>   Method : DELETE
//With the id auto-increment
router.delete('/:id', (req, res) => {
    Armor.findOne({ id: req.params.id }, function (err, doc) {
        if (!err && doc != null) {
            Armor.findByIdAndDelete(doc._id, (err, doc) => {
                if (!err) {
                    res.status(200).send({ 'msg': 'Armor Deleted !', 'success': 'true', 'result': doc });
                } else {
                    res.status(500).send({ 'msg': 'Error while delete', 'success': 'false', 'result': err });
                }
            });
        } else {
            res.status(500).send({ 'msg': 'Error Object not found', 'success': 'false', 'result': err });
        }
    });
});

module.exports = router;