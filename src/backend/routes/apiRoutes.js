'use strict';
let express = require('express'),
    router = express.Router();

let shoppingListRoutes = require('./shoppingListRoutes');
let authRoutes = require('./authRoutes');
let registerRoutes = require('./registerRoutes');
let groupRoutes = require('./groupRoutes');

router.use('/shoppingList', shoppingListRoutes);
router.use('/auth', authRoutes);
router.use('/groups', groupRoutes);
router.use('/register', registerRoutes);


module.exports = router;