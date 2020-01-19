'use strict';
//root to racine of project views/layouts/racine/racine
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("layouts/racine/racine", {
        viewTitle: "API project"
    });
});



module.exports = router;
