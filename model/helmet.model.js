'use strict';

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const helmetSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true, default: 0},
    type: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: Number, required: true }
});

helmetSchema.plugin(autoIncrement.plugin, {
    model: 'Helmet',
    field: 'id',
    startAt: 0,
    incrementBy: 1
});
mongoose.model('Helmet', helmetSchema);