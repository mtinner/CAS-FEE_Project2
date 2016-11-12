'use strict';

let express = require('express'),
    router = express.Router(),
    ExpenseManager = require('../manager/ExpenseManager'),
    authService = require('../services/authService'),
    expenseManager = new ExpenseManager();

router.get('/',
    authService.protect('user'),
    function (req, res) {
        const year = +req.query.year;
        const month = +req.query.month;
        if (!year || !month) {
            res.status(400).send();
            return;
        }
        expenseManager.getAll(req.user, year, month)
            .then(expenses => res.status(200).send(expenses))
            .catch(() => res.status(400).send());
    });

router.post('/',
    authService.protect('user'),
    function (req, res) {
        expenseManager.add(req.body, req.user.id)
            .then(expense => res.status(201).send(expense))
            .catch(() => res.status(400).send());
    });

router.delete('/:id',
    authService.protect('user'),
    function (req, res) {
        expenseManager.remove(req.params.id)
            .then(article => res.status(200).send(article))
            .catch(() => res.status(400).send());
    });

module.exports = router;