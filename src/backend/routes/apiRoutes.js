'use strict';
let express = require('express'),
    router = express.Router();

let shoppingListRoutes = require('./shoppingListRoutes');
let authRoutes = require('./authRoutes');

router.use('/shoppingList', shoppingListRoutes);
router.use('/auth', authRoutes);

module.exports = router;