'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const Chest = mongoose.model('Chest');

router.get('/', (req, res) => {
    res.json("Hellow Cloak");
});

module.exports = router;