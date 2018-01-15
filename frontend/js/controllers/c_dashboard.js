/*
 |  File contains the controller for root of the application
 |
 |
 */
 angular.module('pms.controller')
 // .controller('RootController',function($scope){
.controller('DashboardController',function($scope,$rootScope,$state,$timeout,locker,AdminLogin,User){
  console.log("this is DashboardController controller");

  $scope.auth_user = locker.get('auth_user');

    $scope.init = function(){
      $scope.auth_user = locker.get('auth_user');

      User.dashboard().show($scope.auth_user,function(data){
        console.log("adminLogin response "+data);
        console.log(data);
        $scope.user_information = data.message;
      },function(errors){
        console.log("eroor in ");
        $scope.error = errors.data.errors;
      });

    }
 });
