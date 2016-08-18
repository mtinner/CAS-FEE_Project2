'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var heroRouting = require('./routes/heroRouting');

var app = module.exports.app = exports.app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile('src/.dist/index.html');
});

app.use('/hero', heroRouting);

app.use('/frontend', express.static('./src/.dist/frontend'));
app.use('/@angular', express.static('node_modules/@angular'));
app.use('/rxjs', express.static('node_modules/rxjs'));

//TODO remove if no in memory is needed
app.use('/angular2-in-memory-web-api', express.static('node_modules/angular2-in-memory-web-api'));


var port = 8080;
app.listen(port);
console.log('API listening on port ' + port + ' ...');