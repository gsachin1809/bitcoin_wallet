/*
 |  File contains the controller for root of the application
 |
 |
 */
 angular.module('pms.controller')
 .controller('AppController',function($scope,$timeout,$state,AdminLogin,locker){
   console.log("app controller loaded");

   if(!locker.has('auth_user')){
     $state.go('login');
   }

   $scope.logout = function(){
     if(locker.has('auth_user')){
       locker.forget('auth_user');
       $state.go('login');
     }
   }
   $scope.wallet = function(){
     if(locker.has('auth_user')){
       $state.go('app.wallet');
     }else{
       $state.go('login');
     }
   }

   $scope.sendbitcoin = function(){
     if(locker.has('auth_user')){
       $state.go('app.sendbitcoin');
     }else{
       $state.go('login');
     }
   }
   $scope.dashboard = function(){
     if(locker.has('auth_user')){
       $state.go('app.dashboard');

     }else{
       $state.go('login');
     }
   }




 });
