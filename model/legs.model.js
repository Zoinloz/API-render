'use strict';

const mongoose = require('mongoose');

const legsSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true},
    type: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: Number, required: true }
});

mongoose.model('Legs', legsSchema);