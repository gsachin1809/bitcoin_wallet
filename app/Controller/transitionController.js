var transitionModule = require(__dirname + '/../module/transition.js')

module.exports 		= 		{

  'update' : function(req, res){
        var data = req.body;
        console.log(data);
        transitionModule.update(data).then(function(response){
          console.log(response);
          res.send(response);
        },function(error) {
          console.log(error);
          res.send(error);
        });
    },



}
