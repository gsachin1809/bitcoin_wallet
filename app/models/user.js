'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    public_key: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  user.associate = function(models){
    user.belongsTo(models.balance,{foreignKey:'email', targetKey:'user_email','as':'Balance', constraints: false});

  }
  return user;
};
