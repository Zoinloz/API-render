'use strict';

//Imports
const express = require('express');
const fs = require('fs');
const path = require('path'); //adapte le chemin en fonction de l'os

//Instanciate
const server = express();
const http = require('http').createServer(server);


require('./routes/armors.js')(server);
require('./routes/arms.js')(server);
//server.use(express.static(path.join(__dirname, 'routes'))); //Récupère l'index.html dans le dossier maître "client"

// require('./routes/armors.js')(server,fs);
// require('./routes/armors.js')(server,fs);
// require('./routes/armors.js')(server,fs);

//Configure routes
server.get('/db', function (req, res) {
    if (req) {
        console.log('test1');
    }
    if (res) {
        console.log('test2');
    }
    fs.readFile('./db.json', function (err, data) {
        console.log('Get DB');
        if (data) {
            res.setHeader('Content-Type', 'text/json');
            res.status(200);
            res.send('{"success": "true","msg": "File loaded", "result":' + data + '}');
        }
        if (err) {
            res.setHeader('Content-Type', 'text/json');
            res.status(500);
            res.send('{"success": "false","msg": "Failure read file", "result": null}');
        }
    });
});


//Lunch server
server.listen(3000, function () {
    console.log('server started on port 3000');
});