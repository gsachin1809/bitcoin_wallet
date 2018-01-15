/*
 |--------------------------------------------
 |  digits.js Digits Service
 |-------------------------------------------
 |
 |  @author:  Anil Kumawat<ashokanil@hirarky.com>
 |  @date:  2016-09-24
 |  @description: Contains defination to interact with digits.
 */
 angular.module('pms.filter')
  .filter('zeroifNaN',function(){

    return function(amount){
      if(isNaN(amount)){
        amount = 0;
      }

      return  amount.toFixed(2);
    }
      // return NumToWord;

});
