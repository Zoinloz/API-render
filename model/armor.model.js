'use strict';

const mongoose = require('mongoose');

const armorSchema = new mongoose.Schema({
 id: { type: String, required: true, unique: true, trim: true, default: 0},
 name: { type: String, required: true, unique: true, trim: true },
 composition: {
   helmet: { type: mongoose.Types.ObjectId, ref: "Helmet", required: true},
   chest: { type: mongoose.Types.ObjectId, ref: "Chest", required: true },
   cloak: { type: mongoose.Types.ObjectId, ref: "Cloak", required: true },
   legs: { type: mongoose.Types.ObjectId, ref: "Legs" , required: true},
   arm: { type: mongoose.Types.ObjectId, ref: "Arm" , required: true}
 }

});

mongoose.model('Armor', armorSchema);
