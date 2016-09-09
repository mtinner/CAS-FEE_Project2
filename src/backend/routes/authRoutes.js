'use strict';

let express = require('express'),
    router = express.Router(),
    authService = require('../services/authService');

router.get('/token', authService.signIn);

router.get('/test',
    authService.protect('admin'),
    function (req, res) {
        res.status(200).send(req.user);
    }
);

module.exports = router;