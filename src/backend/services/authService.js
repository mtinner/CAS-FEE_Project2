'use strict';

let expressJwt = require('express-jwt'),
  jwt = require('jsonwebtoken');

let authService = (function () {
  const SECRET = 'c4ntT0uchTh1s';

  return {
    protect: protect,
    createToken: createToken
  };

  function protect(roles){
    return expressJwt({secret: SECRET})
  }

  function createToken(content){
    return jwt.sign(content, SECRET)
  }
})();

module.exports = authService;