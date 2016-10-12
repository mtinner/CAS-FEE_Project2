'use strict';

let express = require('express'),
    router = express.Router(),
    authService = require('../services/authService'),
    UserService = require('../services/UserService');

router.get('/',
    authService.protect('user'),
    function (req, res) {
        UserService.instance.getGroups(req.user).then(groups => {
            res.status(200).send(groups);
        }).catch(() => {
            res.status(404).send();
        });
    });

router.post('/',
    authService.protect('user'),
    function (req, res) {
        UserService.instance.addGroup(req.body, req.user).then(user => {
            res.status(201).send(user);
        }).catch(() => {
            res.status(404).send();
        });
    });

router.post('/join/:id',
    authService.protect('user'),
    function (req, res) {
        UserService.instance.joinGroup(req.params.id, req.user,req.body).then(user => {
            res.status(200).send(user);
        }).catch(() => {
            res.status(400).send();
        });
    });

module.exports = router;