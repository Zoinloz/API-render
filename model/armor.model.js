'use strict';

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const armorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, trim: true, default: 0 },
  name: { type: String, required: true, unique: true, trim: true },
  composition: {
    helmet: { type: mongoose.Types.ObjectId, ref: "Helmet", required: true },
    chest: { type: mongoose.Types.ObjectId, ref: "Chest", required: true },
    cloak: { type: mongoose.Types.ObjectId, ref: "Cloak", required: true },
    legs: { type: mongoose.Types.ObjectId, ref: "Legs", required: true },
    arm: { type: mongoose.Types.ObjectId, ref: "Arm", required: true }
  }
});


armorSchema.plugin(autoIncrement.plugin, {
  model: 'Armor',
  field: 'id',
  startAt: 0,
  incrementBy: 1
});
mongoose.model('Armor', armorSchema);
