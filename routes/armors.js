'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Armor = mongoose.model('Armor');
const Helmet = mongoose.model('Helmet');
const Chest = mongoose.model('Chest');
const Cloak = mongoose.model('Cloak');
const Arm = mongoose.model('Arm');
const Leg = mongoose.model('Legs');

router.get('/', (req, res) => {
    Armor.find((err, docs) => {
        if (!err) {
            // res.status(200);
            // console.log(test);
            // res.send({ 'msg': 'success', 'success': 'true', 'result': test });
            res.render("layouts/armor/list", {
                list: docs,
            });
        } else {
            console.log('Error in retrieving arm list : ' + err);
        }
    });

});

router.post('/add', (req, res) => {
    if (req.body._id == '') {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
});

function insertRecord(req, res) {
    armor.id = req.body.Id;
    armor.type = req.body.Type;
    armor.name = req.body.Name;
    armor.composition.helmet = req.body.lstCasque;
    armor.composition.cloak = req.body.lstCape;
    armor.composition.legs = req.body.lstLeg;
    armor.composition.chest = req.body.lstTorse;
    armor.composition.arm = req.body.lstArm;

    armor.save((err, doc) => {
        if (!err) {
            res.redirect('/armors');
        } else {
            console.log('Error during record insertion arm : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Armor.findOneAndUpdate( req.body._id , {name: req.body.Name, value: req.body.Value, id:req.body.Id}, function(err, result){
        if(err){
            console.log('Error during record update : ' + err);
        }else{
            res.redirect('/armors');
        }
    });
}

router.get('/add', (req, res) => {
    var monChest;
    var maCloak;
    var monHelmet;
    var monLeg;
    Chest.find((err, docs) => {
        monChest = docs;
    });
    Cloak.find((err, docs) => {
        maCloak = docs;
    });
    Helmet.find((err, docs) => {
        monHelmet = docs;
    });
    Leg.find((err, docs) => {
        monLeg = docs;
    });
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
    Armor.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("layouts/armor/addOrEdit", {
                viewTitle: "Update armor",
                arm: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Armor.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/armors');
        } else {
            console.log('Error in arm delete : ' + err);
        }
    });
});

module.exports = router;
