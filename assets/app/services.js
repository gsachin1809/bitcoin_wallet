angular.module('pms.service')

.factory('AdminLogin',["$resource", "$log", "$http", "Base", "locker", "$state", function($resource,$log,$http,Base,locker,$state){
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

}]);

angular.module('pms.service')

.factory('Base',function(){
  var app_url          =   '';
  var home_url         =   '';
  var admin_login_url  =   '';
  var admin_logout_url =   '';
  if(location.hostname == '127.0.0.1'){
    app_url            =   'http://127.0.0.1:8000/ajax';
    home_url           =   'http://127.0.0.1:8000';
    admin_login_url    =   'http://127.0.0.1:8000/api_v1/admin/login';
    admin_logout_url   =   'http://127.0.0.1:8000/api_v1/admin/logout';
  } else {
    // app_url            =   'http://127.0.0.1:8000/ajax';
    app_url            = 'http://'+location.hostname+'/ajax';
    home_url           = 'http://'+location.hostname+'';
    // home_url           =  'http://127.0.0.1:8000';
    admin_login_url    = 'http://'+location.hostname+'/ajax/admin/login';
    admin_logout_url   = 'http://'+location.hostname+'/ajax/admin/logout';
  }
  return {
    'app_url'          : app_url,
    'home_url'         : home_url,
    'admin_login_url'  : admin_login_url,
    'admin_logout_url' : admin_logout_url
  };
});

angular.module('pms.service')

.factory('SendBitCoin',["$resource", "$log", "$http", "Base", "locker", "$state", function($resource,$log,$http,Base,locker,$state){
  var factory   =   {}

  factory.resource    =   function(){
    var url   =   Base.home_url+'/bitcoin/send';
    return  $resource(url, {},{
        'send': { method:'POST',params:{}},
    });
  }
  
  return factory;

}]);

angular.module('pms.service')

.factory('User',["$resource", "$log", "$http", "Base", "locker", "$state", function($resource,$log,$http,Base,locker,$state){
  var factory   =   {}

  factory.resource    =   function(){
    var url   =   Base.home_url+'/user/create';
    return  $resource(url, {},{
        'login': { method:'POST',params:{}},
    });
  }   
  factory.dashboard    =   function(){
    var url   =   Base.home_url+'/user/show';
    return  $resource(url, {},{
        'show': { method:'POST',params:{}},
    });
  }
  factory.login    =   function(){
    var url   =   Base.home_url+'/user/login';
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

}]);

angular.module('pms.service')

.factory('Wallet',["$resource", "$log", "$http", "Base", "locker", "$state", function($resource,$log,$http,Base,locker,$state){
  var factory   =   {}

  factory.resource    =   function(){
    var url   =   Base.home_url+'/wallet/show';
    return  $resource(url, {},{
        'wallet': { method:'POST',params:{}},
    });
  }  

  return factory;

}]);
