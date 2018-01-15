angular.module('pms.service')

.factory('SendBitCoin',function($resource,$log,$http,Base,locker,$state){
  var factory   =   {}

  factory.resource    =   function(){
    var url   =   Base.home_url+'/bitcoin/send';
    return  $resource(url, {},{
        'send': { method:'POST',params:{}},
    });
  }
  
  return factory;

});
