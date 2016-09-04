'use strict';

let express = require('express'),
    router = express.Router(),
    authService = require('../services/authService');

router.get('/token', function (req, res) {
    let token = authService.signIn(
        req.query.username,
        req.query.password);
    if (token) {
        res.setHeader('X-Auth-Token', token);
        res.status(200).send();
    }
    res.status(401).send();
});

router.get('/test',
    authService.protect('admin'),
    function (req, res) {
        res.status(200).send(req.user);
    });

module.exports = router;