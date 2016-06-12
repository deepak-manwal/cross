var express = require('express');
var router = express.Router();
var authController = require('../src/controller/authController.js').getInstance();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', authController.login);

module.exports = router;
