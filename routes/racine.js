'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("layouts/racine/racine", {
        viewTitle: "API project"
    });
});



module.exports = router;
