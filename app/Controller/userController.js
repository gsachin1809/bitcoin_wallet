var UserModule = require(__dirname + '/../module/user.js')

module.exports 		= 		{

  'store' : function(req, res){
        var data = req.body;
        console.log(data);
        UserModule.store(data).then(function(response){
          console.log(response);
          res.send(response);
        },function(error) {
          console.log(error);
          res.send(error);
        });
    },
  'login' : function(req, res){
        var data = req.body;
        console.log(data);
        UserModule.login(data).then(function(response){
          console.log(response);
          res.send(response);
        },function(error) {
          console.log(error);
          res.send(error);
        });
    },



}
