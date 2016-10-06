'use strict';

let jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt'),
    guard = require('express-jwt-permissions')({permissionsProperty: 'roles'}),
    UserService = require('./UserService'),
    GroupService = require('./GroupService'),
    MemberListService = require('./MemberListService'),
    Promise = require('promise');

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
            email:'appUser',
            username: 'appUser',
            password: 'pwd',
            roles: ['user']
        }
    ];

    let userService = new UserService(),
        groupService = new GroupService(),
        memberListService = new MemberListService();

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
                let matchedUser = users.find(user => user.email === req.user.email);
                if (matchedUser) {
                    res.setHeader(JWT_RESPONSE_HEADER, createToken(matchedUser));
                    guard.check(guardedRoles)(req, res, next);
                } else {
                    res.status(500).send(`email-address ${req.email} not found`);
                }
            });
        };
    }

    function signIn(req, res) {
        let matchedUser = users.find(user =>
           user.email === req.query.email &&
            user.password === req.query.password
        );
        if (matchedUser) {
            res.setHeader(JWT_RESPONSE_HEADER, createToken(matchedUser));
            //Temp
            let user = userService.add(matchedUser),
                group = groupService.add({name: 'Private'});
            Promise.all([user, group]).then(values=> {
                    console.log(values);
                    memberListService.add({
                        email: values[0].email,
                        active: true,
                        groupId: values[1].id
                    });
                }
            );
            //end
            res.status(200).send();
        } else {
            res.status(401).send('email and/or password wrong');
        }
    }

    function createToken(user) {
        let signedInUser = Object.assign({}, user);
        delete signedInUser.password;
        return jwt.sign(signedInUser, SECRET);
    }
})();

module.exports = authService;