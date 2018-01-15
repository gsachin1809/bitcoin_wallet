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
