'use strict';

let jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt'),
    guard = require('express-jwt-permissions')({permissionsProperty: 'roles'}),
    UserService = require('./UserService');

let authService = (function () {
    const SECRET = 'c4ntT0uchTh1s';
    const JWT_RESPONSE_HEADER = 'X-Auth-Token';
    const users = [ //todo: get from DB
        {
            email: 'admin',
            username: 'admin',
            password: 'pwd',
            roles: ['user', 'admin']
        },
        {
            email: 'appUser',
            username: 'appUser',
            password: 'pwd',
            roles: ['user']
        }
    ];


    //Temp
    users.forEach(user=> {
        UserService.instance.add(user);
    });
    //end

    return {
        protect: protect,
        signIn: signIn
    };

    function protect(guardedRoles) {
        return function (req, res, next) {
            expressJwt({secret: SECRET})(req, res, function () {
                if (!req.user) {
                    res.status(401).send();
                    return;
                }
                // to get user updates as fast as possible, we fetch it each time from the DB
                UserService.instance.get({email: req.user.email})
                    .then(
                        (matchedUser)=> {
                            if (matchedUser) {
                                res.setHeader(JWT_RESPONSE_HEADER, createToken(matchedUser));
                                guard.check(guardedRoles)(req, res, next);
                            } else {
                                res.status(500).send(`email-address ${req.email} not found`);
                            }
                        }
                    );
            });
        };
    }

    function signIn(req, res) {
        UserService.instance.get({email: req.query.email, password: req.query.password})
            .then(matchedUser=> {
                if (matchedUser) {
                    res.setHeader(JWT_RESPONSE_HEADER, createToken(matchedUser));
                    res.status(200).send();
                } else {
                    res.status(401).send('email and/or password wrong');
                }
            });
    }

    function createToken(user) {
        let signedInUser = Object.assign({}, user);
        delete signedInUser.password;
        return jwt.sign(signedInUser, SECRET);
    }
})();

module.exports = authService;