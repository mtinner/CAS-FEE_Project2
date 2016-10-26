'use strict';

let express = require('express'),
    router = express.Router(),
    ArticleManager = require('../manager/ArticleManager'),
    authService = require('../services/authService'),
    articleManager = new ArticleManager();

router.get('/',
    authService.protect('user'),
    function (req, res) {
        articleManager.getAll(req.user)
            .then(articles => res.status(200).send(articles))
            .catch(() => res.status(400).send());
    });

router.post('/',
    authService.protect('user'),
    function (req, res) {
        articleManager.add(req.body, req.user)
            .then(article => res.status(201).send(article));
    });

router.delete('/:id',
    authService.protect('user'),
    function (req, res) {
        articleManager.remove(req.params.id)
            .then(article => res.status(200).send(article))
            .catch(() => res.status(400).send());
    });

router.get('/groups', function (req, res) {
    res.status(200).send(articleManager.getGroups());
});

module.exports = router;