'use strict';
module.exports = (sequelize, DataTypes) => {
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
      AddressId: DataTypes.INTEGER,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  User.associate = function(models) {
    User.hasOne(models.Address, {
      foreignKey: 'id',
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
