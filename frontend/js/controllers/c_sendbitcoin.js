/*
 |  File contains the controller for root of the application
 |
 |
 */
 angular.module('pms.controller')
 // .controller('RootController',function($scope){
.controller('SendBitCoinController',function($scope,$rootScope,$state,$timeout,locker,AdminLogin,SendBitCoin){
  console.log("this is SendBitCoinController controller");

    $scope.send = {
      'sender_public_address' : '',
      'confirm_sender_public_address' : '',
      'amount' : ''
    };
    $scope.sendCoin   =   function(){
      console.log("this is send coin function");
      $scope.error  =   '';
      $scope.success  =   '';
      $scope.auth_user = locker.get('auth_user');

      console.log("function called");
      if($scope.send.sender_public_address.length <= 0 ){
        $scope.error  =   'Public address should not be empty.';
        return;
      }
      if($scope.send.confirm_sender_public_address.length <= 0 ){
        $scope.error  =   'Confirm public address should not be empty.';
        return;
      }
      if($scope.send.amount <= 0 ){
        $scope.error  =   'Amount should not be less than zero.';
        return;
      }
      if($scope.send.sender_public_address != $scope.send.confirm_sender_public_address ){
        $scope.error  =   'Address mis-match.';
        return;
      }
      $scope.send.public_key = $scope.send.sender_public_address;
      $scope.send.login_user = $scope.auth_user.email;
      $scope.send.login_user_public_key = $scope.auth_user.public_key;
      SendBitCoin.resource().send($scope.send,function(data){
        console.log("adminLogin response "+data);
        console.log(data);
        if(data.code == 200){
          $scope.send = {
            'sender_public_address' : '',
            'confirm_sender_public_address' : '',
            'amount' : ''
          };
          $scope.success = data.message;
        }else{
          $scope.error = data.message;
        }
       //  $timeout(function () {
       //      $state.go('login');
       // }, 2000);
      },function(errors){
        console.log("eroor in ");
        $scope.error = errors.data.errors;


      });

   }

 });
