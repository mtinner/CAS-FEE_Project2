'use strict';
let express = require('express'),
    router = express.Router();

let articleRoutes = require('./articleRoutes');
let authRoutes = require('./authRoutes');
let registerRoutes = require('./registerRoutes');
let groupRoutes = require('./groupRoutes');

router.use('/articles', articleRoutes);
router.use('/auth', authRoutes);
router.use('/groups', groupRoutes);
router.use('/register', registerRoutes);


module.exports = router;