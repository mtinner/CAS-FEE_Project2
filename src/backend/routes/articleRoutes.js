'use strict';

let express = require('express'),
    router = express.Router(),
    shoppingListService = require('../services/shoppingListService'),
    authService = require('../services/authService');

router.get('/',
    authService.protect('user'),
    function (req, res) {
        shoppingListService.getArticles(req.user).then(articles => {
            res.status(200).send(articles);
        }).catch(() => {
            res.status(404).send();
        });
    });

router.post('/',
    authService.protect('user'),
    function (req, res) {
        shoppingListService.addArticle(req.body,req.user).then(article => {
            res.status(201).send(article);
        });
    });

router.delete('/:id',
    authService.protect('user'),
    function (req, res) {
        try {
            shoppingListService.deleteArticle(req.params.id).then(article => {
                res.status(200).send(article);
            });
        }
        catch (e) {
            console.log(e);
            res.status(404).send();
        }
    });

router.get('/groups', function (req, res) {
    res.status(200).send(shoppingListService.getArticleGroups());
});

module.exports = router;