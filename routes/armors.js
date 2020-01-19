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
router.get('/:name', (req, res) => {
    Armor.findOne({ name: req.params.name }, (err, doc) => {
        if (!err && doc != null) {
            res.status(200).send({ 'msg': 'Armor found !', 'success': 'true', 'result': doc });
        } else {
            res.status(500).send({ 'msg': 'Armor not found', 'success': 'false', 'result': err });
        }
    });
});

router.post('/add', (req, res) => {
        insertRecord(req, res);
});

function insertRecord(req, res) {
    console.log(req.body);
    const armor = new Armor();
    const monTab = new Array();
    var monChest ;
    var maCloak;
    var monHelmet;
    var monLeg;
    var myArm;
    
    Chest.findOne({id: req.body.idChest}, (err, doc) => {
        monChest = doc;
    });
    console.log('leChest ',monChest);
    Cloak.findOne({id: req.body.idCloak }, (err, doc) => {
        maCloak = doc;
    });
    Helmet.findOne({id: req.body.idHelmet }, (err, doc) => {
        monHelmet = doc;
    });
    Leg.findOne({id: req.body.idLegs }, (err, doc) => {
        monLeg = doc;
    });
    Arm.findOne({id: req.body.idArms }, (err, doc) => {
        myArm = doc;
    });

    armor.id = req.body.Id;
    armor.type = req.body.Type;
    armor.name = req.body.Name;
    armor.composition.helmet = monHelmet._id;
    armor.composition.cloak = maCloak._id;
    armor.composition.legs = monLeg._id;
    armor.composition.chest = monChest._id;
    armor.composition.arm = myArm._id;

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