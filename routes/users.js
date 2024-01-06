var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cool', function(res, res, next){
  res.send('Im cool to meet you my brother')
});

module.exports = router;
