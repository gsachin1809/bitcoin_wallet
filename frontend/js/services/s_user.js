/*
 |  File contains the factory for utility
 |
 |
 */
 angular.module('pms.service')
 .factory('User',function($q,Resources,locker,$rootScope){

   var factory  =   {};

   factory.authenticate   =   function(phonenumber,password){
     var defer  =   $q.defer();
     Resources.authentication().auth({},{
       'phonenumber':phonenumber,
       'password':password
     },function(data){
       defer.resolve(data);
     },function(error){
       defer.reject(error);
     });
     return defer.promise;
   }

   factory.save_auth_token  =   function(token){
     locker.put('token',token);
     locker.put('is_expired',false);
   }

   factory.is_logged_in   =   function(){
     if(locker.get('is_expired',true)){
       return false;
     } else {
       var token  =   locker.get('token',null);
       if(token == null){
         return false;
       }
       return true;
     }
   }

   factory.get_logged_in_user   =   function(){
     if(!factory.is_logged_in()){
       return null;
     }
     return   locker.get('current_user',null);
   }

   factory.logout   =   function(){
     locker.forget('active_organization',null);
     locker.forget('token',null);
     locker.forget('is_expired',null);
     locker.forget('current_user',null);
     $rootScope.$broadcast('user_logged_out',{});
   }

   factory.inValidateUser   =   function(){
     var defer  =   $q.defer();
     if(!factory.is_logged_in()){
       $rootScope.$broadcast('user_logged_out',{});
       return;
     }

      Resources.token().get({
        'token':locker.get('token',null)
      },function(data){
        if(data.user != undefined){
          locker.put('current_user',data.user);
          defer.resolve(data);
        } else {
          $rootScope.$broadcast('user_logged_out',{});
          defer.reject(data);
        }
      },function(error){
        console.log(error);
        var _error =  error.data;
        if(_error.errors != undefined){
            var _err  =   _error.errors[0];
            // console.log(_err);
            if(_err.token_not_found != undefined || _err.token_expired != undefined){
              factory.logout();
              $rootScope.$broadcast('user_logged_out',{});
            }
        }
        defer.reject(error);
      });
      return defer.promise;
   }

   factory.getSystemAdmin   =   function(page){
     var defer  =   $q.defer();
     Resources.user().get({
       'type':2,
       'page':page
     },function(data){
       defer.resolve(data);
     },function(error){
       defer.reject(error);
     });
     return defer.promise;
   }

   factory.addAdminUser   =   function(phonenumber,email,password){
     var defer  =   $q.defer();

      Resources.user().add({
        'phonenumber':phonenumber,
        'email':email,
        'password':password,
        'type':2
      },function(data){
          defer.resolve(data);
      },function(error){
        defer.reject(error);
      });
      return defer.promise;
   }

   factory.updateUser   =   function(user_id,user){
     var defer  =   $q.defer();

      Resources.user().update({'user_id':user_id},user,function(data){
          defer.resolve(data);
      },function(error){
        defer.reject(error);
      });
      return defer.promise;
   }

   factory.deleteUser   =   function(user_id){
     var defer  =   $q.defer();

      Resources.user().delete({
        'user_id':user_id,
      },function(data){
          defer.resolve(data);
      },function(error){
          defer.reject(error);
      });
      return defer.promise;
   }

   factory.getUser   =   function(user_id){
     var defer  =   $q.defer();
     Resources.user().show({
       'user_id':user_id,
     },{},function(data){
       defer.resolve(data);
     },function(error){
       defer.reject(error);
     });
     return defer.promise;
   }

   factory.getUserOrg   =   function(user_id,page,search_query){
     var defer  =   $q.defer();
     Resources.user_org(user_id).get({
       'page':page,
       'search':search_query
     },function(data){
       defer.resolve(data);
     },function(error){
       defer.reject(error);
     });
     return defer.promise;
   }

   return factory;
 });
