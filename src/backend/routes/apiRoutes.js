'use strict';
let express = require('express'),
    router = express.Router();

let articleRoutes = require('./articleRoutes');
let authRoutes = require('./authRoutes');
let registerRoutes = require('./registerRoutes');
let groupRoutes = require('./groupRoutes');
let expenseRoutes = require('./expenseRoutes');

router.use('/articles', articleRoutes);
router.use('/auth', authRoutes);
router.use('/groups', groupRoutes);
router.use('/register', registerRoutes);
router.use('/expenses', expenseRoutes);


module.exports = router;