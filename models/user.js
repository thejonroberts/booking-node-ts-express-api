'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.TEXT,
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      lastLoginDate: DataTypes.DATE,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  User.associate = function(models) {
    User.hasOne(models.address, {
      foreignKey: 'addressId',
    });
  };

  // User.associate = function(models) {
  //   User.hasMany(models.order, {
  //     foreignKey: 'customerUserId'
  //   });
  // };

  return User;
};
