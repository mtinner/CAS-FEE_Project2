'use strict';

let express = require('express'),
  router = express.Router(),
  expressJwt = require('express-jwt'),
  jwt = require('jsonwebtoken');

router.get('/token', function (req, res) {
  var token = jwt.sign('myData', 'secret1');
  res.status(200).send({token: token});
});

router.get('/test',
  expressJwt({secret: 'secret1'}),
  function (req, res) {
    res.status(200).send(req.user);
  });

module.exports = router;