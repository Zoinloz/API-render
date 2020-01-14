'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const Chest = mongoose.model('Chest');

router.get('/', (req, res) => {
    Chest.find((err, docs) => {
        if (!err) {
            console.log(docs);
            docs.forEach(element => {
                console.log(element.name);
            });
            res.status(200);
            res.send({ 'msg': 'success', 'success': 'true', 'result': docs });
            res.render("layouts/legs/list", {
                list: docs
            });
        } else {
            console.log('Error in retrieving Chest list : ' + err);
        }
    });
});



module.exports = router;