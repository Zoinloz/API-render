
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/API',{ useNewUrlParser: true, useUnifiedTopology: true }, error => {
    if(!error) { console.log('MongoDB Connection Succeeded')}
    else { console.log('Error in DB Connection : ' + error)}
});

require('./model/arm.model');
require('./model/armor.model');
require('./model/cloak.model');
require('./model/chest.model');
require('./model/helmet.model');
require('./model/legs.model');