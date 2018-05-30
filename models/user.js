'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.TEXT,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    lastLoginDate: DataTypes.DATE,
  }, {});
  User.associate = function(models) {
    User.hasOne(models.Address, {
      foreignKey: 'addressId',
    });

    User.belongsToMany(models.Band, {
      through: 'UsersBands',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    User.belongsToMany(models.Venue, {
      through: 'UsersVenues',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return User;
};
