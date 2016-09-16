'use strict';

let express = require('express'),
    router = express.Router(),
    expressJwt = require('express-jwt'),
    jwt = require('jsonwebtoken'),
    shoppingListService = require('../services/shoppingListService');

router.get('/:id?', function (req, res) {
    res.status(200).send(shoppingListService.getArticle(req.params.id));
});

/*router.get('/:id?', expressJwt({
 secret: 'secret1',
 credentialsRequired: false
 }), function (req, res) {
 if (!req.user) return res.sendStatus(401);
 res.status(200).send(shoppingListService.getArticle(req.params.id));
 });*/

/*router.get('/', function (req, res) {
 var token = jwt.sign('myData', 'secret1'); // 60*5 minutes
 res.status(200).send({token: token});
 });*/

router.post('/', function (req, res) {
    res.status(201).send(shoppingListService.addArticle(req.body));
});

router.put('/:id?', function (req, res) {
    res.status(200).send(shoppingListService.updateArticle(req.params.id, req.body));
});

router.delete('/:id', function (req, res) {
    try {
        res.status(200).send(shoppingListService.deleteArticle(req.params.id));
    }
    catch (e) {
        console.log(e);
        res.status(404).send();
    }
});

module.exports = router;