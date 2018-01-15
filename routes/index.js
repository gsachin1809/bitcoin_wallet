var express = require('express');
var router = express.Router();

var UserController  = require(__dirname + '/../app/Controller/userController.js');
var transitionController  = require(__dirname + '/../app/Controller/transitionController.js');

//signup for the new user
router.post('/user/create',UserController.store);

//sendbitconi
router.post('/bitcoin/send',transitionController.update);


//balance left
router.post('/wallet/update',UserController.store);



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
