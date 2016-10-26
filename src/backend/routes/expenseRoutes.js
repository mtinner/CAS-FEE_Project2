'use strict';

let express = require('express'),
    router = express.Router(),
    ExpenseManager = require('../manager/ExpenseManager'),
    authService = require('../services/authService'),
    expenseManager = new ExpenseManager();

router.get('/',
    authService.protect('user'),
    function (req, res) {
        expenseManager.getAll(req.user, req.params.year)
            .then(expenses => res.status(200).send(expenses))
            .catch(() => res.status(400).send());
    });

// router.post('/',
//     authService.protect('user'),
//     function (req, res) {
//         expenseManager.add(req.body, req.user)
//             .then(article => res.status(201).send(article));
//     });

// router.delete('/:id',
//     authService.protect('user'),
//     function (req, res) {
//         expenseManager.remove(req.params.id)
//             .then(article => res.status(200).send(article))
//             .catch(() => res.status(400).send());
//     });

module.exports = router;