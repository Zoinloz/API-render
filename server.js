//Imports
const express = require('express');
const fs = require('fs');
const path = require('path'); //adapte le chemin en fonction de l'os

//Instanciate
const server = express();
const http = require('http').createServer(server);


require('./routes/armors.js')(server);

server.use(express.static(path.join(__dirname, 'routes'))); //Récupère l'index.html dans le dossier maître "client"

// require('./routes/armors.js')(server,fs);
// require('./routes/armors.js')(server,fs);
// require('./routes/armors.js')(server,fs);

// server.get('/db', function (req, res) {
//     console.log('Get Users');
//     res.setHeader('Content-Type', 'text/json');
//     res.status(200);
//     res.send('{"success": "true","msg": "Users", "result":[]}');
// });

// //Configure routes
// server.get('/db', function (req, res) {
//     if (req) {

//     }
//     if (res) {

//     }
//     fs.readFile('/', function (err, data) {
//         console.log('Get DB');
//         if (data) {
//             res.setHeader('Content-Type', 'text/json');
//             res.status(200);
//             res.send('{"success": "true","msg": "File loaded", "result":' + data + '}');
//         }
//         if (err) {
//             res.setHeader('Content-Type', 'text/json');
//             res.status(500);
//             res.send('{"success": "false","msg": "Failure read = ' + path + '", "result":' + data + '}');
//         }
//     });
// });

// function getData(path, res) {

// }


// server.get('/db', function (req, res) {
//     console.log('Get Users');
//     res.setHeader('Content-Type', 'text/json');
//     res.status(200);
//     res.send('{"success": "true","msg": "Users", "result":[]}');
// });

// //Lunch server
// server.listen(3000, function () {
//     console.log('server started on port 3000');
// });