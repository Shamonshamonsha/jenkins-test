var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.cookie('mycookie','my',{ maxAge: 900000, httpOnly: true });
  req.session.simple ='test';
  res.send('respond with a resource');
});

module.exports = router;
