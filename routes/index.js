var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let response = 'ok from web service';

  console.log(req.cookies.mycookie);

  console.log("origin",req.headers.origin);
  res.json({ "speech": response, "displayText": response });
});


router.post('/test',function(req,res){

  res.send('ok');
})

module.exports = router;
