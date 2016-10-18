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
        UserService.instance.addGroup(req.body, req.user).then(group => {
            res.status(201).send(group);
        }).catch(() => {
            res.status(404).send();
        });
    });

router.put('/join/:id',
    authService.protect('user'),
    function (req, res) {
        UserService.instance.joinGroup(req.params.id, req.user, req.body).then(() => {
            res.status(200).send({});
        }).catch(() => {
            res.status(400).send();
        });
    });

router.get('/:id/members',
    authService.protect('user'),
    function (req, res) {
        UserService.instance.getGroupMembers(req.params.id, req.user)
            .then((users) => {
                res.status(200).send(users);
            }).catch(() => {
            res.status(400).send();
        });
    });

router.post('/active/:id',
    authService.protect('user'),
    function (req, res) {
        UserService.instance.setActiveGroup(req.params.id, req.user, req.body).then(() => {
            res.status(200).send({});
        }).catch(() => {
            res.status(400).send();
        });
    });

module.exports = router;