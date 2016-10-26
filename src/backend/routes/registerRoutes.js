'use strict';

let express = require('express'),
    router = express.Router(),
    UserManager = require('../manager/UserManager'),
    userManager = new UserManager();

router.post('/', function (req, res) {
    userManager.add(req.body)
        .then(user => res.status(201).send(user))
        .catch(() => res.status(400).send());
});

module.exports = router;