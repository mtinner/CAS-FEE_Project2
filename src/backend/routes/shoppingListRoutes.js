'use strict';

let express = require('express'),
    router = express.Router();

let articleRouting = require('./articleRouting'),
    shoppingListService = require('../services/shoppingListService');


router.get('/', function (req, res) {
    res.status(200).send(['Deadpool', 'Batman', 'Spiderman']);
});

router.get('/groupes', function (req, res) {
    res.status(200).send(shoppingListService.getShoppingListGroupes());
});

router.use('/article', articleRouting);

module.exports = router;