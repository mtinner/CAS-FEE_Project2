'use strict';

let express = require('express'),
    router = express.Router();

let shoppingListService = require('../services/shoppingListService');

router.get('/:id?', function (req, res) {
    res.status(200).send(shoppingListService.getArticle(req.params.id));
});

//todo test
router.post('/', function (req, res) {
    res.status(201).send(shoppingListService.addArticle(req.body));
});

router.put('/:id?', function (req, res) {
    res.status(200).send(shoppingListService.updateArticle(req.params.id, req.body));
});

router.delete('/:id', function (req, res) {
    try {
        res.status(204).send(shoppingListService.deleteArticle(req.params.id));
    }
    catch (e) {
        console.log(e);
        res.status(404).send();
    }
});

module.exports = router;