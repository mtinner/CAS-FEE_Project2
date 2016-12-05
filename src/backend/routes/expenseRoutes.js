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
            .catch((err) => res.status(err.status || 400).send(err));
    });

router.post('/',
    authService.protect('user'),
    function (req, res) {
        expenseManager.add(req.body, req.user)
            .then(expense => res.status(201).send(expense))
            .catch((err) => res.status(err.status || 400).send(err));
    });

router.delete('/:id',
    authService.protect('user'),
    function (req, res) {
        expenseManager.remove(req.params.id, req.user)
            .then(article => res.status(200).send(article))
            .catch((err) => res.status(err.status || 400).send(err));
    });

module.exports = router;