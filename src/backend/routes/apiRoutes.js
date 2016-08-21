'use strict';
let express = require('express'),
    router = express.Router();

let shoppingListRoutes = require('./shoppingListRoutes');

router.use('/shoppingList', shoppingListRoutes);

module.exports = router;