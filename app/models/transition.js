'use strict';
module.exports = (sequelize, DataTypes) => {
  var transition = sequelize.define('transition', {
    unique_id: DataTypes.STRING,
    sender_public_key: DataTypes.STRING,
    receiver_public_key : DataTypes.STRING,
    amount: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return transition;
};
