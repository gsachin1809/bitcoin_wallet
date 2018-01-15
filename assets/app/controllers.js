/*
 |  File contains the controller for root of the application
 |
 |
 */
 angular.module('pms.controller')
 .controller('AppController',["$scope", "$timeout", "$state", "AdminLogin", "locker", function($scope,$timeout,$state,AdminLogin,locker){
   console.log("app controller loaded");
   $scope.logout = function(){
     if(locker.has('auth_user')){
       locker.forget('auth_user');
       $state.go('login');
     }
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




 }]);

/*
 |  File contains the controller for root of the application
 |
 |
 */
 angular.module('pms.controller')
 // .controller('RootController',function($scope){
.controller('DashboardController',["$scope", "$rootScope", "$state", "$timeout", "locker", "AdminLogin", "User", function($scope,$rootScope,$state,$timeout,locker,AdminLogin,User){
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
 }]);

/*
 |  File contains the controller for root of the application
 |
 |
 */
 angular.module('pms.controller')
 .controller('LoginController',["$scope", "$timeout", "$state", "User", "locker", function($scope,$timeout,$state,User,locker){
   $scope.error         = '';
   $scope.success       = '';
   $scope.dashboard_url = '';
   $scope.login = {
     'email' : '',
     'password'    : '',
   };

   $scope.onKeyPress = function($event) {
     console.log("onKeyPress");
       if ($event.keyCode == 13) {
        $scope.admin_login();
      }
   };

   $scope.admin_login   =   function(){
     console.log("admin login called");
     // $state.go('app.dashboard');

     $scope.error  =   '';
     $scope.success  =   '';

     if($scope.login.email.length <= 0 || $scope.login.email == ''){
       $scope.error  =   'Email should not be empty.';
       return;
     }
     if($scope.login.password.length == 0){
       $scope.error  =   'Password should not be empty';
       return;
     }

     if($scope.login.password.length <= 6){
       $scope.error  =   'Password should be at least 6 charater';
       return;
     }

     User.login().login($scope.login,function(data){
       console.log("adminLogin response ");
       console.log(data);
       if(data.code == '200'){
         console.log("success full reutnr ");
         $scope.success = "Successfully Authenticated";
         locker.put('auth_user',data.message);
         $state.go('app.dashboard');
       }else{
         console.log("return false");
         $scope.error = data.message;

       }
  
     },function(errors){
       console.log("eroor in ");
       var data = errors.data.errors;


     });

  }

  $scope.signup = function(){
    $state.go('signup');
  }

 }]);
















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

/*
 |  File contains the controller for root of the application
 |
 |
 */
 angular.module('pms.controller')
 // .controller('RootController',function($scope){
.controller('RootController',["$scope", "$rootScope", "$state", "$timeout", "locker", "AdminLogin", function($scope,$rootScope,$state,$timeout,locker,AdminLogin){
  console.log("this is Root controller");
 }]);

/*
 |  File contains the controller for root of the application
 |
 |
 */
 angular.module('pms.controller')
 // .controller('RootController',function($scope){
.controller('SendBitCoinController',["$scope", "$rootScope", "$state", "$timeout", "locker", "AdminLogin", "SendBitCoin", function($scope,$rootScope,$state,$timeout,locker,AdminLogin,SendBitCoin){
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

 }]);

/*
 |  File contains the controller for root of the application
 |
 |
 */
 angular.module('pms.controller')
 .controller('SignUpController',["$scope", "$timeout", "$state", "User", "locker", function($scope,$timeout,$state,User,locker){
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

 }]);
















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

/*
 |  File contains the controller for root of the application
 |
 |
 */
 angular.module('pms.controller')
 // .controller('RootController',function($scope){
.controller('WalletController',["$scope", "$rootScope", "$state", "$timeout", "locker", "AdminLogin", "Wallet", function($scope,$rootScope,$state,$timeout,locker,AdminLogin,Wallet){
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

 }]);
