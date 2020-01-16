'use strict';

const mongoose = require('mongoose');

const armorSchema = new mongoose.Schema({
 id: { type: String, required: true, unique: true, trim: true },
 name: { type: String, required: true, unique: true, trim: true },
 composition: {
   helmet: { type: mongoose.Types.ObjectId, ref: "Helmet" },
   chest: { type: mongoose.Types.ObjectId, ref: "Chest" },
   cloak: { type: mongoose.Types.ObjectId, ref: "Cloak" },
   legs: { type: mongoose.Types.ObjectId, ref: "Legs" },
   arm: { type: mongoose.Types.ObjectId, ref: "Arm" }
 }

});

mongoose.model('Armor', armorSchema);
