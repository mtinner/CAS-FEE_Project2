'use strict';

let express = require('express'),
  router = express.Router(),
  authService = require('../services/authService');

router.get('/token', function (req, res) {
  res.status(200).send(authService.createToken({
      username: 'tobi',
      roles: [
        'user',
        'power-user',
        'admin'
      ]
    }
  ));
});

router.get('/test',
  authService.protect(),
  function (req, res) {
    res.status(200).send(req.user);
  });

module.exports = router;