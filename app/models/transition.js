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
  transition.associate = function(models){
    transition.belongsTo(models.user,{foreignKey:'sender_public_key', targetKey:'public_key','as':'sender_id', constraints: false});
    transition.belongsTo(models.user,{foreignKey:'receiver_public_key', targetKey:'public_key','as':'receiver_id', constraints: false});
  }
  return transition;
};
