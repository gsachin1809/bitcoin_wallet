/*
 |  File contents the app defination and route defination
 |
 |  @author gsachin1809@gmail.com
 */
  
 angular.module('pms.controller',[]);
 angular.module('pms.service',[]);
 angular.module('pms.directive',[]);
 angular.module('pms.filter',[]);


 angular.module('pms',[
   'pms.controller',
   'pms.service',
   'pms.directive',
   'pms.filter',
   'pms.templates',
   'angular-locker',
   'ngResource',
   'ui.router'
   // 'pms_config',
   // 'ui.bootstrap'
 ]);

/*
 |  File Config.js contents the configuration related to
 |  Application
 |
 */

angular.module('pms')
.config(["$stateProvider", "$urlRouterProvider", "lockerProvider", function($stateProvider, $urlRouterProvider,lockerProvider){

  //Defalult config for locker
  lockerProvider.defaults({
      driver: 'local',
      namespace: 'pms',
      separator: '.',
      eventsEnabled: true,
      extend: {}
  });

  $stateProvider.state('login',{
    url:'/login',
    'views':{
      'root_view':{
        templateUrl:'login.html',
        controller:'LoginController'
      }
    }
  });
  $stateProvider.state('signup',{
    url:'/signup',
    'views':{
      'root_view':{
        templateUrl:'signup.html',
        controller:'SignUpController'
      }
    }
  });
  $stateProvider.state('app',{
    url:'/app',
    'views':{
      'root_view':{
        templateUrl:'app.html',
        controller:'AppController'
      }
    }
  });


    $stateProvider.state('app.dashboard',{
      url:'/dashboard',
      'views':{
        'app-view':{
          templateUrl:'dashboard.html',
          controller : 'DashboardController'
        }
      }
    });
    $stateProvider.state('app.wallet',{
      url:'/wallet',
      'views':{
        'app-view':{
          templateUrl:'wallet.html',
          controller : 'WalletController'
        }
      }
    });
    $stateProvider.state('app.sendbitcoin',{
      url:'/sendbitcoin',
      'views':{
        'app-view':{
          templateUrl:'sendbitcoin.html',
          controller : 'SendBitCoinController'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
}]);
