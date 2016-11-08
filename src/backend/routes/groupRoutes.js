'use strict';

let express = require('express'),
    router = express.Router(),
    authService = require('../services/authService'),
    GroupManager = require('../manager/GroupManager'),
    groupManager = new GroupManager();

router.get('/',
    authService.protect('user'),
    function (req, res) {
        groupManager.getAll(req.user)
            .then(groups => res.status(200).send(groups))
            .catch(() => res.status(400).send());
    });

router.post('/',
    authService.protect('user'),
    function (req, res) {
        groupManager.add(req.body, req.user)
            .then(group => res.status(201).send(group))
            .catch(() => res.status(400).send());
    });

router.get('/:id',
    authService.protect('user'),
    function (req, res) {
        groupManager.get(req.params.id, req.user)
            .then(group => res.status(200).send(group))
            .catch(() => res.status(400).send());
    });

router.put('/:id/join',
    authService.protect('user'),
    function (req, res) {
        groupManager.join(req.params.id, req.user, req.body)
            .then((user) => res.status(200).send(user))
            .catch(() => res.status(400).send());
    });

router.get('/:id/members',
    authService.protect('user'),
    function (req, res) {
        groupManager.getMembers(req.params.id, req.user)
            .then((users) => res.status(200).send(users))
            .catch(() => res.status(400).send());
    });

router.post('/:id/active',
    authService.protect('user'),
    function (req, res) {
        groupManager.setActive(req.params.id, req.user, req.body)
            .then(() => res.status(200).send({}))
            .catch(() => res.status(400).send());
    });

router.put('/:id',
    authService.protect('user'),
    function (req, res) {
        groupManager.rename(req.params.id, req.user, req.body)
            .then((group) => res.status(200).send(group))
            .catch(() => res.status(400).send());
    });

router.put('/:id/leave',
    authService.protect('user'),
    function (req, res) {
        groupManager.leave(req.params.id, req.user, req.body)
            .then(() => res.status(200).send({}))
            .catch(() => res.status(400).send());
    });

module.exports = router;