'use strict';

let express = require('express'),
    router = express.Router();

let articleRouting = require('./articleRoutes'),
    shoppingListService = require('../services/shoppingListService');

router.get('/groups', function (req, res) {
    res.status(200).send(shoppingListService.getShoppingListGroups());
});

router.use('/article', articleRouting);

module.exports = router;