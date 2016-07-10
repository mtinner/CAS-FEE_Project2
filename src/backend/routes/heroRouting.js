'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.status(200).send(['Deadpool', 'Batman', 'Spiderman']);
});

module.exports = router;