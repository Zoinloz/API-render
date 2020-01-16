'use strict';

const mongoose = require('mongoose');

const armorSchema = new mongoose.Schema({
 id: { type: String, required: true, unique: true, trim: true },
 name: { type: String, required: true, unique: true, trim: true },
 cost: { type: Number, required: true },  
        }],
                                        
        helmet: [{
            type: mongoose.Types.ObjectId,
            ref: "Helmet"
        }],
});

mongoose.model('Armor', armorSchema);
