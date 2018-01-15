'use strict';
module.exports = (sequelize, DataTypes) => {
  var balance = sequelize.define('balance', {
    user_email: DataTypes.STRING,
    amount: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return balance;
};