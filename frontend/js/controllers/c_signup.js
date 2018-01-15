/*
 |  File contains the controller for root of the application
 |
 |
 */
 angular.module('pms.controller')
 .controller('SignUpController',function($scope,$timeout,$state,User,locker){
   $scope.error         = '';
   $scope.success       = '';
   $scope.user = {
     'first_name' : '',
     'last_name' : '',
     'gender' : 'male',
     'phone_number' : '',
     'email' : '',
     'password' : '',
     'conf_password' : ''
   };

   $scope.registerUser   =   function(){
     $scope.error  =   '';
     $scope.success  =   '';
     console.log("function called");
     if($scope.user.first_name.length <= 0 ){
       $scope.error  =   'First Name should not be empty.';
       return;
     }
     if($scope.user.last_name.length <= 0 ){
       $scope.error  =   'last Name should not be empty.';
       return;
     }
     if($scope.user.email.length <= 0 ){
       $scope.error  =   'Email should not be empty.';
       return;
     }
     if($scope.user.gender.length <= 0 ){
       $scope.error  =   'Gender should not be empty.';
       return;
     }
     if($scope.user.password.length <= 0 ){
       $scope.error  =   'Password should not be empty.';
       return;
     }
     if($scope.user.password.length <= 6 ){
       $scope.error  =   'Password should be of 6 digit.';
       return;
     }
     if($scope.user.conf_password.length <= 0 ){
       $scope.error  =   'confirm Password should not be empty.';
       return;
     }

     if($scope.user.phone_number.length <= 0 || $scope.user.phone_number == ''){
       $scope.error  =   'Phone Number should not be empty.';
       return;
     } else if($scope.user.phone_number.length != 10){
       $scope.error  =   'Phone Number should have 10 digit.';
       return;
     } else if(isNaN($scope.user.phone_number)){
       $scope.error  =   'Phone Number should only contains digit.';
       return;
     }
     if($scope.user.conf_password != $scope.user.password){
       $scope.error  =   'Password not match.';
       return;
     }

    //  if($scope.login.password.length <= 6){
    //    $scope.error  =   'Password should be at least 6 charater';
    //    return;
    //  }

     User.resource().login($scope.user,function(data){
       console.log("adminLogin response "+data);
       $scope.success = "Successfully Added";
       $timeout(function () {
           $state.go('login');
      }, 2000);
     },function(errors){
       console.log("eroor in ");
       $scope.error = errors.data.errors;


     });

  }
  $scope.backToLogin = function(){
    $state.go('login');
  }

 });
















 //
 //
 // .controller('LoginController',function($scope,$rootScope,$state,$timeout,Util,User){
 //  $scope.$state    =  $state;
 //
 //   $scope.phonenumber  =   '';
 //   $scope.password  =   '';
 //   $scope.is_otp    =    false;
 //
 //   $scope.error  =   '';
 //   $scope.phonenumber_error  =   '';
 //   $scope.password_error  =   '';
 //
 //   $scope.auth_prog   =   false;
 //
 //   $scope.authenticate  =   function(){
 //    //  console.log(1111);
 //     $scope.error  =   '';
 //     $scope.phonenumber_error  =   '';
 //     $scope.password_error  =   '';
 //
 //     if($scope.phonenumber.length == 0){
 //       $scope.phonenumber_error   =   'Phone Number is empty.';
 //       return;
 //     }
 //
 //     if(!Util.validate_phonenumber($scope.phonenumber)){
 //       $scope.phonenumber_error   =   'Invalid Phone Number.';
 //       return;
 //     }
 //     if(!$scope.is_otp){
 //       if($scope.password.length == 0){
 //         $scope.password_error   =   'Password is empty.';
 //         return;
 //       }
 //     }
 //
 //     $scope.auth_prog   =   true;
 //
 //     User.authenticate('+91'+$scope.phonenumber,$scope.password).then(function(data){
 //       $scope.auth_prog   =   false;
 //       if(data.token != undefined){
 //         User.save_auth_token(data.token);
 //         $rootScope.$broadcast('user_logged_in',{});
 //          $state.go('app.organization_list');
 //        //  $state.go('app.dashboard');
 //       } else {
 //         $scope.error  =   'Something went wrong!';
 //       }
 //       console.log(data);
 //     },function(error){
 //       $scope.auth_prog   =   false;
 //       console.log(error);
 //       var err  =   error.data
 //       if(err.errors != undefined){
 //          var errors  =   err.errors[0];
 //          console.log(errors);
 //          if(errors.not_found != undefined){
 //            $scope.error  =   errors.not_found;
 //          } else if(errors.auth_failed != undefined){
 //            $scope.error  =   errors.auth_failed;
 //          } else {
 //              $scope.error  =   'Something went wrong!';
 //          }
 //       }
 //     });
 //   }
 //
 //
 //   $scope.init =  function(){
 //
 //   }
 //
 //   $scope.init();
 // });
