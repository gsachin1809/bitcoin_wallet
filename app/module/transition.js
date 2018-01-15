var Q             =    require('q');
var WebUser       =    require(__dirname +'/../models').user;
var Balance       =    require(__dirname +'/../models').balance;
var Transition       =    require(__dirname +'/../models').transition;
var passwordHash  = require('password-hash');
// Create a token generator with the default settings:
var randtoken     = require('rand-token');

module.exports 		= 		{

  'update' : function(data){

        var defer     =     Q.defer();
        var result    =     {}; //Object to return the result
        if(typeof data.public_key == 'undefined' || data.public_key.length == 0){
            result.code       =     400; //For Bad Request
            result.message    =     'Public key should not be empty.'
            defer.reject(result);
        }
        if(typeof data.amount == 'undefined' || data.amount.length == 0){
            result.code       =     400; //For Bad Request
            result.message    =     'Amount should not be empty.'
            defer.reject(result);
        }

        console.log("pass till 24");

        // //If No Error while validatin
        console.log(result);
        if(typeof result.code == 'undefined'){
            console.log("executing quer");
            Balance.findOne({
              where : {
                user_email : data.login_user
              }
            }).then(balance_user_data => {
                  console.log("retun data");
                  console.log(balance_user_data);
                  if(balance_user_data != null){
                    if(parseInt(balance_user_data.amount)  < parseInt(data.amount)){
                      result.code          =     500;
                      result.message       =     "User dont have that much bitcoin.";
                      defer.reject(result);
                    }else{
                      //check weather the receiver_user exit or not
                      WebUser.findOne({
                        where : {
                          public_key : data.public_key
                        }
                      }).then(receiver_user => {
                        if(receiver_user != null){
                          //if receiver_user exit dudect the amount from the login user
                          var left_balance = parseInt(balance_user_data.amount) - parseInt(data.amount);

                          balance_user_data.amount = left_balance;
                          balance_user_data.save().then(function(response){
                            // send that money to mention user
                            Balance.findOne({
                              where : {
                                user_email : receiver_user.email
                              }
                            }).then( add_coin => {
                                //add the coin to the recipent user
                                add_coin.amount = parseInt(add_coin.amount) + parseInt(data.amount);
                                add_coin.save().then( added_coin => {
                                  //add the transition  in the table
                                    var token           = randtoken.generate(16);
                                  Transition.create({
                                    'unique_id'           : token,
                                    'sender_public_key'   : data.sender_public_key,
                                    'receiver_public_key' : receiver_user.public_key,
                                    'amount'              : parseInt(data.amount)

                                  }).then( transition_added =>{
                                    result.code          =     200;
                                    result.message       =     'Coin has been send';
                                    defer.resolve(result);
                                  }).catch(function(error){
                                    console.log(error);
                                    result.code          =     500;
                                    result.message       =     "Failed to update the transition table.";
                                    defer.reject(result);
                                  });

                                }).catch(function(error){
                                  console.log(error);
                                  result.code          =     500;
                                  result.message       =     "Failed to add Coin to User.";
                                  defer.reject(result);
                                });
                            }).catch(function(error){
                              console.log(error);
                              result.code          =     500;
                              result.message       =     "User not found in balance table.";
                              defer.reject(result);
                            });


                          }).catch(function(error){
                            console.log(error);
                            result.code          =     500;
                            result.message       =     "Failed to add User.";
                            defer.reject(result);
                          });

                        }else{
                          result.code          =     500;
                          result.message       =     "Recevie User not existing.";
                          defer.reject(result);
                        }
                      }).catch(error => {
                            console.log(error);
                            result.code          =     500;
                            result.message       =     "Something went wrong";
                            defer.reject(result);
                      });

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

    }


}
