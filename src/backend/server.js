'use strict';
let express = require('express'),
    bodyParser = require('body-parser'),
    app = module.exports.app = exports.app = express();

let apiRouting = require('./routes/apiRoutes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use('/api', apiRouting);

app.use('/frontend', express.static('./src/.dist/frontend'));
app.use('/@angular', express.static('node_modules/@angular'));
app.use('/rxjs', express.static('node_modules/rxjs'));


let port = 8080;
app.listen(port);
console.log('API listening on port ' + port + ' ...');