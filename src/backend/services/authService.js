'use strict';

let jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt'),
    guard = require('express-jwt-permissions')({permissionsProperty: 'roles'});

let authService = (function () {
    const SECRET = 'c4ntT0uchTh1s';
    const users = [ //todo: get from DB
        {
            username: 'admin',
            password: 'pwd',
            roles: ['user', 'admin']
        },
        {
            username: 'appUser',
            password: 'pwd',
            roles: ['user']
        }
    ];

    return {
        protect: protect,
        signIn: signIn
    };

    function protect(guardedRoles) {
        return function (req, res, next) {
            expressJwt({secret: SECRET})(req, res, function () {
                if(!req.user){
                    res.status(401).send();
                }
                let matchedUsers = users.filter(user => user.username === req.user.username);
                if (matchedUsers && matchedUsers.length > 0) {
                    res.setHeader('X-Auth-Token', createToken(matchedUsers[0]));
                    guard.check(guardedRoles)(req, res, next);
                }else {
                    res.status(500).send(`username ${req.username} not found`);
                }
            });
        }
    }

    function signIn(username, password) {
        let matchedUsers = users.filter(user =>
            user.username === username &&
            user.password === password
        );
        if (matchedUsers && matchedUsers.length > 0) {
            return createToken(matchedUsers[0]);
        }
        return null;
    }

    function createToken(user){
        let signedInUser = Object.assign({}, user[0]);
        delete signedInUser.password;
        return jwt.sign(signedInUser, SECRET);
    }
})();

module.exports = authService;