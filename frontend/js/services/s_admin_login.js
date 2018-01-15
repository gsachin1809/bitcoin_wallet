angular.module('pms.service')

.factory('AdminLogin',function($resource,$log,$http,Base,locker,$state){
  var factory   =   {}
  
  factory.resource    =   function(){
    var url   =   Base.home_url+'/api_v1/admin/login';
    return  $resource(url, {},{
        'login': { method:'POST',params:{}},
    });
  }

  factory.checklogin = function(){
    var login = locker.get('auth_user');
    if(typeof login == undefined || typeof login == 'undefined'){
      return false;
    }
    return true;
  }

  factory.user_name = function(){
    var login = locker.get('auth_user');
    var user_name = login.first_name+" "+login.last_name;
    return user_name;
  }

  factory.logout = function(){
    console.log('call logout');
    if(locker.has('auth_user')){
      locker.forget('auth_user');
    }

    $state.go('login');
    // var logout = locker.forget('auth_user');
    //
    // var url   =   Base.home_url+'/api_v1/admin/logout';
    // return  $resource(url, {},{
    //     'logout': { method:'GET',params:{}},
    // });

    // return logout;
  }
  return factory;

});
