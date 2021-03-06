var Q             =    require('q');
var WebUser       =    require(__dirname +'/../models').user;
var Balance       =    require(__dirname +'/../models').balance;
var Transition       =    require(__dirname +'/../models').transition;
var passwordHash  = require('password-hash');
// Create a token generator with the default settings:
var randtoken     = require('rand-token');
// var randtoken     = require('bcrypt');

module.exports 		= 		{

  'store' : function(data){

        var defer     =     Q.defer();
        var result    =     {}; //Object to return the result
        if(typeof data.first_name == 'undefined' || data.first_name.length == 0){
            result.code       =     400; //For Bad Request
            result.message    =     'First should not be empty.'
            defer.reject(result);
        }
        if(typeof data.last_name == 'undefined' || data.last_name.length == 0){
            result.code       =     400; //For Bad Request
            result.message    =     'last should not be empty.'
            defer.reject(result);
        }
        if(typeof data.phone_number == 'undefined' || data.phone_number.length == 0){
            result.code       =     400; //For Bad Request
            result.message    =     'phone Number should not be empty.'
            defer.reject(result);
        }

        if(typeof data.email == 'undefined' || data.email.length == 0){
            result.code       =     400; //For Bad Request
            result.message    =     'Email should not be empty.'
            defer.reject(result);
        }
        console.log("pass till 31");

        // //If No Error while validatin
        if(typeof result.code == 'undefined'){
            console.log("executing quer");
            WebUser.findOne({
              where : {
                email : data.email
              }
            }).then(webuser => {
                  console.log("retun data");
                  console.log(webuser);
                  if(webuser == null){
                    var hashedPassword  = passwordHash.generate(data.password);
                    var token           = randtoken.generate(64);
                    console.log("pass till 47");
                    WebUser.create({
                      'first_name'      : data.first_name,
                      'last_name'       : data.last_name,
                      'email'           : data.email,
                      'phone_number'    : data.phone_number,
                      'gender'          : data.gender,
                      'password'        : hashedPassword,
                      'public_key'       : token

                    }).then(function(data){
                      Balance.create({
                        'user_email' : data.email,
                        'amount'      : 100
                      }).then( data =>{
                        result.code          =     200;
                        result.message       =     data;
                        defer.resolve(result);
                      }).catch(function(error){
                        console.log(error);
                        result.code          =     500;
                        result.message       =     "Failed to add in balance table.";
                        defer.reject(result);
                      });


                    }).catch(function(error){
                      console.log(error);
                      result.code          =     500;
                      result.message       =     "Failed to add User.";
                      defer.reject(result);
                    });

                  } else {
                    result.code          =     404;
                    result.message       =     " Email is already registered ";
                    defer.reject(result);
                  }

            }).catch(error => {
                  console.log(error);
                  result.code          =     500;
                  result.message       =     "Something went wrong";
                  defer.reject(result);
            });

        }else{
          console.log("error 82");
          result.code          =     500;
          result.message       =     "Something went wrong";
          defer.reject(result);
        }

        return defer.promise;

    },
  'login' : function(data){

    // var myPlaintextPassword = 'password123';
    // bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // // Store hash in your password DB.
    //     console.log(hash);
    //     // bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    //     // // res == true
    //     //   console.log(res);
    //     // });
    // });
      console.log("-----");
      console.log(data);
      console.log("-----");

        var defer     =     Q.defer();
        var result    =     {}; //Object to return the result

        if(typeof data.email == 'undefined' || data.email.length == 0){
            result.code       =     400; //For Bad Request
            result.message    =     'Email should not be empty.'
            defer.reject(result);
        }
        if(typeof data.password == 'undefined' || data.password.length == 0){
            result.code       =     400; //For Bad Request
            result.message    =     'Password should not be empty.'
            defer.reject(result);
        }


        // //If No Error while validatin
        if(typeof result.code == 'undefined'){
            console.log("executing quer");
            WebUser.findOne({
              where : {
                email : data.email
              }
            }).then(webuser => {
                  console.log("retun data");
                  // console.log(webuser);
                  if(webuser != null){

                    // console.log(passwordHash.verify('password123',hashedPassword_2));
                    if(passwordHash.verify(data.password,webuser.password)){
                    // if(true){
                      result.code          =     200;
                      result.message       =    webuser;
                      defer.resolve(result);
                    }else{
                      result.code          =     404;
                      result.message       =     "password incorrect ";
                      defer.reject(result);
                    }

                  } else {
                    result.code          =     404;
                    result.message       =     " User not registered ";
                    defer.reject(result);

                  }

            }).catch(error => {
                  console.log(error);
                  result.code          =     500;
                  result.message       =     "Something went wrong";
                  defer.reject(result);
            });

        }else{
          console.log("error 82");
          result.code          =     500;
          result.message       =     "Something went wrong";
          defer.reject(result);
        }

        return defer.promise;

    },
  'show' : function(data){

        var defer     =     Q.defer();
        var result    =     {}; //Object to return the result

        if(typeof data.email == 'undefined' || data.email.length == 0){
            result.code       =     400; //For Bad Request
            result.message    =     'Email should not be empty.'
            defer.reject(result);
        }

        // //If No Error while validatin
        if(typeof result.code == 'undefined'){
            console.log("executing quer");
            WebUser.findOne({
              where : {
                email : data.email
              },
              'include':[
                {'model':Balance,'as':'Balance'},
              ]
            }).then(webuser => {
                  console.log("retun data");
                  console.log(webuser);
                  if(webuser != null){
                      result.code          =     200;
                      result.message       =    webuser;
                      defer.resolve(result);
                    }else{
                      result.code          =     404;
                      result.message       =     "User not found ";
                      defer.reject(result);
                    }
            }).catch(error => {
                  console.log(error);
                  result.code          =     500;
                  result.message       =     "Something went wrong";
                  defer.reject(result);
            });

        }else{
          console.log("error 82");
          result.code          =     500;
          result.message       =     "Something went wrong";
          defer.reject(result);
        }

        return defer.promise;

    },


}
