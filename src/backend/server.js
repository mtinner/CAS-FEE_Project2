'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var heroRouting = require('./routes/heroRouting');

var app = module.exports.app = exports.app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/hero', heroRouting);

var port = 9090;
app.listen(port);
console.log('API listening on port ' + port + ' ...');