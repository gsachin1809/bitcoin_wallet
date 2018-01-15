angular.module('pms.service')

.factory('Wallet',function($resource,$log,$http,Base,locker,$state){
  var factory   =   {}

  factory.resource    =   function(){
    var url   =   Base.home_url+'/wallet/show';
    return  $resource(url, {},{
        'wallet': { method:'POST',params:{}},
    });
  }  

  return factory;

});
