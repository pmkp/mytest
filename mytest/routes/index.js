var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login.ejs' });
});
router.get('/join', function(req, res, next) {
  res.render('join', { title: 'join.ejs' });
});
router.get('/reservation', function(req, res, next) {
  res.render('reservation', { title: 'reservation.ejs' });
});
router.get('/bullet', function(req, res, next) {
  res.render('bullet', { title: 'bullet.ejs' });
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'register.ejs' });
});
router.get('/evaluate', function(req, res, next) {
  res.render('evaluate', { title: 'evaluate.ejs' });
});
module.exports = router;
