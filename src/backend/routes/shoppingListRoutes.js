'use strict';

let express = require('express'),
    router = express.Router();

let articleRouting = require('./articleRoutes');

router.use('/article', articleRouting);

module.exports = router;