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
