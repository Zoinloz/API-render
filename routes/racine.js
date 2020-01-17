'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const Chest = mongoose.model('Chest');

router.get('/', (req, res) => {
    res.render("layouts/racine/racine", {
        viewTitle: "API project"
    });
});



module.exports = router;
