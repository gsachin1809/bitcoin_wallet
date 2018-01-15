/*
 |  File contains the controller for root of the application
 |
 |
 */
 angular.module('pms.controller')
 .controller('SignUpController',function($scope,$timeout,$state,AdminLogin,locker){
   $scope.error         = '';
   $scope.success       = '';
   $scope.dashboard_url = '';
   $scope.login = {
     'phonenumber' : '',
     'password'    : '',
   };  


   $scope.clear_login_details =  function(){
     console.log("clear called");
     $scope.login.phonenumber = '';
     $scope.login.password    = '';
   };


   $scope.onKeyPress = function($event) {
     console.log("onKeyPress");
       if ($event.keyCode == 13) {
        $scope.admin_login();
      }
   };

   $scope.admin_login   =   function(){
     $scope.error  =   '';
     $scope.success  =   '';

     if($scope.login.phonenumber.length <= 0 || $scope.login.phonenumber == ''){
       $scope.error  =   'Phone Number should not be empty.';
       return;
     } else if($scope.login.phonenumber.length != 10){
       $scope.error  =   'Phone Number should have 10 digit.';
       return;
     } else if(isNaN($scope.login.phonenumber)){
       $scope.error  =   'Phone Number should only contains digit.';
       return;
     }

     if($scope.login.password.length == 0){
       $scope.error  =   'Password should not be empty';
       return;
     }

    //  if($scope.login.password.length <= 6){
    //    $scope.error  =   'Password should be at least 6 charater';
    //    return;
    //  }

     AdminLogin.resource().login($scope.login,function(data){
       console.log("adminLogin response "+data);
       $scope.success = "Successfully Authenticated";
       locker.put('auth_user',data.user);
       $state.go('app.pred.revenue_analysis.revenue');
     },function(errors){
       console.log("eroor in ");
       var data = errors.data.errors;
       if(data.password){
         $scope.error = data.password;
       }else if(data.user_not_found){
         $scope.error = data.user_not_found;
       }

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
