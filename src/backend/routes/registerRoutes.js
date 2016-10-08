'use strict';

let express = require('express'),
    router = express.Router(),
    UserService = require('../services/UserService');

router.post('/',function (req,res) {
    UserService.instance.add(req.body).then(user => {
        res.status(201).send(user);
    }).catch(() => {
        res.status(404).send();
    });
});

module.exports = router;