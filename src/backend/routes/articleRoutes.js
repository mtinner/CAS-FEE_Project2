'use strict';

let express = require('express'),
    router = express.Router(),
    shoppingListService = require('../services/shoppingListService');

router.get('/:id?', function (req, res) {
    shoppingListService.getArticle(req.params.id, article => {
        res.status(200).send(article);
    });
});

router.post('/', function (req, res) {
    shoppingListService.addArticle(req.body, article => {
        res.status(201).send(article);
    });
});

router.put('/:id?', function (req, res) {
    shoppingListService.updateArticle(req.params.id, req.body, article => {
        res.status(200).send(article);
    });
});

router.delete('/:id', function (req, res) {
    try {
        shoppingListService.deleteArticle(req.params.id, article => {
            res.status(200).send(article);
        });
    }
    catch (e) {
        console.log(e);
        res.status(404).send();
    }
});

module.exports = router;