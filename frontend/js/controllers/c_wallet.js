/*
 |  File contains the controller for root of the application
 |
 |
 */
 angular.module('pms.controller')
 // .controller('RootController',function($scope){
.controller('WalletController',function($scope,$rootScope,$state,$timeout,locker,AdminLogin,Wallet){
  console.log("this is Root controller");

  $scope.auth_user = locker.get('auth_user');  

  $scope.init = function(){
    var auth_user = locker.get('auth_user');
    console.log(auth_user);
    Wallet.resource().wallet(auth_user,function(data){
      console.log("wallet response ");
      console.log(data);
      $scope.wallet_data = data.message;
      // if(data.code == '200'){
      //   console.log("success full reutnr ");
      //   $scope.success = "Successfully Authenticated";
      //   locker.put('auth_user',data.message);
      //   $state.go('app.dashboard');
      // }else{
      //   console.log("return false");
      //   $scope.error = data.message;
      //
      // }

    },function(errors){
      console.log("eroor in ");
      var data = errors.data.errors;


    });
  }

  // $scope.init();

 });
