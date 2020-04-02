var express = require('express');
var router = express.Router();

/* SHOW landing PAGE */
router.get('/', function(req, res, next) {
    res.render('index');
});
/* show signin page */
router.get('/signin', function(req, res, next) {
    res.render('signin');
  });
/* show signup page */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

module.exports = router;