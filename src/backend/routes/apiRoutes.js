'use strict';
let express = require('express'),
    router = express.Router();

let articleRoutes = require('./articleRoutes');
let authRoutes = require('./authRoutes');
let registerRoutes = require('./registerRoutes');
let groupRoutes = require('./groupRoutes');
let expenseRoutes = require('./expenseRoutes');

router.use('/articles', articleRoutes);
router.use('/auth', authRoutes);
router.use('/groups', groupRoutes);
router.use('/register', registerRoutes);
router.use('/expenses', expenseRoutes);


//removeIf(production)
// E2E cleanDb
router.delete('/clean', function (req, res) {
    let Promise = require('promise'),
        expenseService = require('../services/ExpenseService').instance,
        userService = require('../services/UserService').instance,
        articleService = require('../services/ArticleService').instance,
        groupService = require('../services/GroupService').instance,
        UserManager = require('../manager/UserManager'),
        e2eUser = {
            email: 'e2e@admin.ch',
            username: 'e2eUser',
            password: 'pwd',
            roles: ['user']
        };

    let expensePromise = expenseService.deleteAll(),
        userPromise = userService.deleteAll(),
        articlePromise = articleService.deleteAll(),
        groupPromise = groupService.deleteAll();

    return Promise.all([expensePromise, userPromise, articlePromise, groupPromise])
        .then(() => new UserManager().add(e2eUser))
        .then(() => res.status(200).send({}))
        .catch(() => res.status(400).send());
});
//endRemoveIf(production)


module.exports = router;