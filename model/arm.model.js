'use strict';

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const armSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true, default: 0},
    type: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: Number, required: true }
});

armSchema.plugin(autoIncrement.plugin, {
    model: 'Arm',
    field: 'id',
    startAt: 0,
    incrementBy: 1
});
mongoose.model('Arm', armSchema);