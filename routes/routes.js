var express = require('express');
var router = express.Router();
var authController = require('../src/controller/authController.js').getInstance();
var userController = require('../src/controller/userController.js').getInstance();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', authController.login);
router.get('/user/:id', userController.get);

module.exports = router;
