'use strict';

require('./mongo'); //Connection to MongoDB
//Imports
const express = require('express');
const path = require('path'); //adapte le chemin en fonction de l'os
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const app = express();

// Controller requires
const Racine = require(path.join(__dirname, 'routes', 'racine'));
const Armors = require(path.join(__dirname, 'routes', 'armors'));
const Arms = require(path.join(__dirname, 'routes', 'arms'));
const Cloaks = require(path.join(__dirname, 'routes', 'cloaks'));
const Helmets = require(path.join(__dirname, 'routes', 'helmets'));
const Legs = require(path.join(__dirname, 'routes', 'legs'));
const Chests = require(path.join(__dirname, 'routes', 'chests'));

//------------------------------------------------LOCALHOST----------------------------------
app.use(bodyparser.urlencoded({
	extended: true
}));
app.use(bodyparser.json());
app.set('views' , path.join(__dirname, '/views/'));
app.engine('hbs' , exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts' }));
app.set('view engine', 'hbs');

//Creation server localhost
app.listen(3000, () => {
	console.log('Express server started on port 3000');
})

//Configure routes
app.use('/', Racine);
app.use('/Arms', Arms);
app.use('/Cloaks', Cloaks);
app.use('/Helmets', Helmets);
app.use('/Legs', Legs);
app.use('/Chests', Chests); // Armure pour se protéger le torse
app.use('/Armors', Armors);

