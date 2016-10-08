'use strict';

let express = require('express'),
    router = express.Router(),
    authService = require('../services/authService');

router.get('/token', authService.signIn);

module.exports = router;