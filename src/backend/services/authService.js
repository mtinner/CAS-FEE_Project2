'use strict';

let expressJwt = require('express-jwt'),
  jwt = require('jsonwebtoken'),
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
    return middleware;

    function middleware(req, res, next) {
      expressJwt({secret: SECRET})(req, res, injectedNext);
      function injectedNext() {
        guard.check(guardedRoles)(req, res, next);
      }
    }
  }

  function signIn(username, password) {
    let matchedUsers = users.filter(user =>
      user.username === username &&
      user.password === password
    );
    if (matchedUsers && matchedUsers.length > 0) {
      let signedInUser = Object.assign({}, matchedUsers[0]);
      delete signedInUser.password;
      return jwt.sign(signedInUser, SECRET);
    }
    return null;
  }
})();

module.exports = authService;