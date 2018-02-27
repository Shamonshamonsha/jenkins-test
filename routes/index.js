var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let response = 'ok from web service';

  console.log(req.cookies.mycookie);

  console.log("origin",req.headers.origin);

  console.log("Session",req.session.simple);
  res.json({ "speech": response, "displayText": response });
});


router.post('/test',function(req,res){
  console.log(req.body);
  res.send('ok changed');
})

module.exports = router;
