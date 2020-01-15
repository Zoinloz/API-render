'use strict';

const mongoose = require('mongoose');

const armorSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true},
    name: { type: String, required: true },
    value: { type: Number, required: true },
    helmet: { type: String, required: true },
    chest: { type: String, required: true },
    arm: { type: String, required: true },
    cloak: { type: String, required: true },
    legs: { type: String, required: true },
    
});

mongoose.model('Armor', armorSchema);