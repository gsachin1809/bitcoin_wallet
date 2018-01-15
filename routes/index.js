var express = require('express');
var router = express.Router();

var UserController  = require(__dirname + '/../app/Controller/userController.js');
var transitionController  = require(__dirname + '/../app/Controller/transitionController.js');
var WalletController  = require(__dirname + '/../app/Controller/walletController.js');

//signup for the new user
router.post('/user/create',UserController.store);
router.post('/user/show',UserController.show);
router.post('/user/login',UserController.login);

//sendbitconi
router.post('/bitcoin/send',transitionController.update);


//wallet
router.post('/wallet/show',WalletController.index);



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
