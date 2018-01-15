/*
 |  File contains the controller for root of the application
 |
 |
 */
 angular.module('pms.controller')
 .controller('AppController',function($scope,$timeout,$state,AdminLogin,locker){
   console.log("app controller loaded");
   $scope.logout = function(){
     $state.go('login');
   }
   $scope.wallet = function(){
     $state.go('app.wallet');
   }

   $scope.sendbitcoin = function(){
     $state.go('app.sendbitcoin');
   }
   $scope.dashboard = function(){
     $state.go('app.dashboard');
   }




 });
