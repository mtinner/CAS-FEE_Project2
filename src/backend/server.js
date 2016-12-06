'use strict';
let express = require('express'),
    bodyParser = require('body-parser'),
    app = module.exports.app = exports.app = express(),
    compression = require('compression');

let apiRouting = require('./routes/apiRoutes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(compression());

app.get('/favicon.ico', function(req, res) {
    res.sendFile(__dirname + '/favicon.ico');
});
app.get('/manifest.json', function(req, res) {
    res.sendFile(__dirname + '/manifest.json');
});

app.use('/api', apiRouting);

//removeIf(production)
app.use('/frontend', express.static(__dirname + '/frontend'));
app.use('/node_modules/@angular', express.static('node_modules/@angular'));
app.use('/node_modules/rxjs', express.static('node_modules/rxjs'));
app.use(require('connect-livereload')());
//endRemoveIf(production)

//removeIf(development)
app.use('/images', express.static('./prod/images'));
app.use('/styles', express.static('./prod/styles'));
app.use('/scripts', express.static('./prod/scripts'));
app.use('/fonts', express.static('./prod/fonts'));
//endRemoveIf(development)

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


let port = 8080;
app.listen(port);
console.log('API listening on port ' + port + ' ...');
