'use strict';

let express = require('express'),
    router = express.Router();

let articleRouting = require('./articleRoutes'),
    shoppingListService = require('../services/shoppingListService');

router.get('/groupes', function (req, res) {
    res.status(200).send(shoppingListService.getShoppingListGroupes());
});

router.use('/article', articleRouting);

module.exports = router;